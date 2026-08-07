// ══════════════════════════════════════════════════════════════
// DRIVE.JS — Importação de transcrição do Google Drive
// Para ativar Drive real: trocar CLIENT_ID e DRIVE_MOCK = false
// ══════════════════════════════════════════════════════════════

var DRIVE_MOCK  = false; // false quando Client ID estiver configurado
var DRIVE_STATE = null; // cache do token em memória (sessão)
var MEET_RECORDINGS_ID = '1Utq0ZHrnb2teCmqVVq4j4eLPlT0pmgKf'; // pasta Meet Recordings

// ── Fetch com renovação automática de token ───────────────────
// Intercepta 401, renova token e repete uma vez automaticamente
function driveFetch(url, token, callback) {
  fetch(url, { headers: { Authorization: 'Bearer ' + token } })
  .then(function(r) { return r.json().then(function(data) { return { status: r.status, data: data }; }); })
  .then(function(res) {
    if (res.status === 401) {
      // Token expirou — remover cache e pedir novo silenciosamente
      console.log('[Drive] Token expirado (401) — renovando...');
      DRIVE_STATE = null;
      chrome.identity.removeCachedAuthToken({ token: token }, function() {
        chrome.storage.local.remove('driveToken', function() {
          chrome.identity.getAuthToken({ interactive: false }, function(newToken) {
            if (chrome.runtime.lastError || !newToken) {
              // Sem token silencioso — pedir interativo
              chrome.identity.getAuthToken({ interactive: true }, function(newToken2) {
                if (chrome.runtime.lastError || !newToken2) {
                  callback('Sessão expirada. Reconecte a conta.');
                  return;
                }
                DRIVE_STATE = { token: newToken2, email: DRIVE_STATE ? DRIVE_STATE.email : '', nome: DRIVE_STATE ? DRIVE_STATE.nome : '' };
                chrome.storage.local.set({ driveToken: newToken2 });
                // Repetir chamada com novo token
                fetch(url, { headers: { Authorization: 'Bearer ' + newToken2 } })
                .then(function(r2) { return r2.json(); })
                .then(function(data2) { callback(null, data2); })
                .catch(function(e) { callback(e.message); });
              });
              return;
            }
            DRIVE_STATE = { token: newToken, email: DRIVE_STATE ? DRIVE_STATE.email : '', nome: DRIVE_STATE ? DRIVE_STATE.nome : '' };
            chrome.storage.local.set({ driveToken: newToken });
            // Repetir chamada com novo token
            fetch(url, { headers: { Authorization: 'Bearer ' + newToken } })
            .then(function(r2) { return r2.json(); })
            .then(function(data2) { callback(null, data2); })
            .catch(function(e) { callback(e.message); });
          });
        });
      });
      return;
    }
    callback(null, res.data);
  })
  .catch(function(e) { callback(e.message || 'Erro de rede'); });
}

// ── Perfil da enfermeira vinculada ────────────────────────────
function driveGetPerfil(callback) {
  chrome.storage.local.get(['driveEmail', 'driveNome', 'drivePastaId', 'drivePastaNome'], function(r) {
    callback(r.driveEmail ? r : null);
  });
}

function driveSalvarPerfil(email, nome, pastaId, pastaNome, callback) {
  chrome.storage.local.set({
    driveEmail: email,
    driveNome: nome,
    drivePastaId: pastaId || null,
    drivePastaNome: pastaNome || null
  }, callback);
}

function driveDesconectar(callback) {
  chrome.storage.local.remove(['driveEmail','driveNome','drivePastaId','drivePastaNome'], function() {
    if (!DRIVE_MOCK && chrome.identity && chrome.identity.clearAllCachedAuthTokens) {
      chrome.identity.clearAllCachedAuthTokens(callback || function(){});
    } else {
      if (callback) callback();
    }
  });
}

// ── Autenticar e retornar token + info do usuário ─────────────
function driveAuth(callback) {
  if (DRIVE_MOCK) {
    callback(null, 'mock-token', { email: 'leticia@piposaude.com.br', name: 'Letícia' });
    return;
  }

  // 1. Checar cache em memória (mesma sessão do painel)
  if (DRIVE_STATE && DRIVE_STATE.token) {
    callback(null, DRIVE_STATE.token, { email: DRIVE_STATE.email || '', name: DRIVE_STATE.nome || '' });
    return;
  }

  // 2. Checar token salvo no storage (persiste entre aberturas do painel)
  chrome.storage.local.get(['driveToken'], function(r) {
    if (r.driveToken) {
      DRIVE_STATE = { token: r.driveToken, email: '', nome: '' };
      // Verificar se token ainda é válido silenciosamente
      chrome.identity.getAuthToken({ interactive: false }, function(freshToken) {
        if (freshToken && !chrome.runtime.lastError) {
          DRIVE_STATE.token = freshToken;
          chrome.storage.local.set({ driveToken: freshToken });
          callback(null, freshToken, { email: DRIVE_STATE.email, name: DRIVE_STATE.nome });
        } else {
          // Token expirou — pedir novo interativo
          _driveLoginInterativo(callback);
        }
      });
      return;
    }
    // 3. Sem token salvo — fazer login interativo
    _driveLoginInterativo(callback);
  });
}

function _driveLoginInterativo(callback) {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError || !token) {
      var err = chrome.runtime.lastError;
      var msg = (err && (err.message || JSON.stringify(err))) || 'Token não recebido';
      callback(msg);
      return;
    }
    chrome.storage.local.set({ driveToken: token });
    _driveFinalizarAuth(token, callback);
  });
}


function _driveFinalizarAuth(token, callback) {
  // Buscar perfil e salvar na sessão
  fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(function(r) { return r.json(); })
  .then(function(info) {
    if (info.error) {
      // Token inválido — remover cache e pedir novo interativo
      chrome.identity.removeCachedAuthToken({ token: token }, function() {
        DRIVE_STATE = null;
        chrome.identity.getAuthToken({ interactive: true }, function(token2) {
          if (chrome.runtime.lastError || !token2) {
            callback('Erro de autenticação');
            return;
          }
          DRIVE_STATE = { token: token2, email: '', nome: '' };
          callback(null, token2, { email: '', name: '' });
        });
      });
      return;
    }
    // Salvar na sessão — não pede login de novo até fechar a extensão
    var nome = info.name || '';
    var email = info.email || '';
    // Extrair primeiro nome do nome completo
    var primeiroNome = nome.split(' ')[0] || email.split('@')[0] || '';
    primeiroNome = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
    DRIVE_STATE = { token: token, email: email, nome: primeiroNome };
    // Salvar nome e email no storage para uso pelo app.js
    chrome.storage.local.set({ driveNome: primeiroNome, driveEmail: email });
    console.log('[Drive] Autenticado como:', email, '| Nome:', primeiroNome);
    callback(null, token, { email: email, name: primeiroNome });
  })
  .catch(function() {
    // userinfo falhou mas tem token — usar assim mesmo
    DRIVE_STATE = { token: token, email: '', nome: '' };
    callback(null, token, { email: '', name: '' });
  });
}


function driveSalvarPerfil(email, nome, pastaId, pastaNome, callback) {
  chrome.storage.local.set({
    driveEmail: email,
    driveNome: nome,
    drivePastaId: pastaId || null,
    drivePastaNome: pastaNome || null
  }, callback);
}

function driveDesconectar(callback) {
  chrome.storage.local.remove(['driveEmail','driveNome','drivePastaId','drivePastaNome'], function() {
    if (!DRIVE_MOCK && chrome.identity && chrome.identity.clearAllCachedAuthTokens) {
      chrome.identity.clearAllCachedAuthTokens(callback || function(){});
    } else {
      if (callback) callback();
    }
  });
}

// ── Autenticar e retornar token + info do usuário ─────────────
function driveAuth(callback) {
  if (DRIVE_MOCK) {
    callback(null, 'mock-token', { email: 'leticia@piposaude.com.br', name: 'Letícia' });
    return;
  }
  // Sempre pedir token interativo — garante escopos corretos
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError || !token) {
      var err = chrome.runtime.lastError;
      var msg = (err && (err.message || err.error || JSON.stringify(err))) || 'Token não recebido';
      console.error('[Drive] Auth error:', err);
      callback(msg);
      return;
    }
    console.log('[Drive] Token obtido:', token.substring(0, 20) + '...');
    // Verificar se token tem acesso ao Drive via userinfo
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(function(r) { return r.json(); })
    .then(function(info) {
      console.log('[Drive] Userinfo:', info.email || JSON.stringify(info));
      if (info.error) {
        // Token inválido — remover do cache e tentar de novo
        chrome.identity.removeCachedAuthToken({ token: token }, function() {
          console.log('[Drive] Token removido do cache, tentando novamente...');
          chrome.identity.getAuthToken({ interactive: true }, function(token2) {
            if (chrome.runtime.lastError || !token2) {
              callback('Falha na segunda tentativa de autenticação');
              return;
            }
            console.log('[Drive] Novo token:', token2.substring(0, 20) + '...');
            var perfil = { email: '', name: '' };
            callback(null, token2, perfil);
          });
        });
        return;
      }
      var perfil = { email: info.email || '', name: info.name || '' };
      callback(null, token, perfil);
    })
    .catch(function(e) {
      // Se userinfo falhar, continuar com token mesmo assim
      console.warn('[Drive] Userinfo falhou, continuando:', e.message);
      callback(null, token, { email: '', name: '' });
    });
  });
}

function driveSalvarPerfil(email, nome, pastaId, pastaNome, callback) {
  chrome.storage.local.set({
    driveEmail: email,
    driveNome: nome,
    drivePastaId: pastaId || null,
    drivePastaNome: pastaNome || null
  }, callback);
}

function driveDesconectar(callback) {
  chrome.storage.local.remove(['driveEmail','driveNome','drivePastaId','drivePastaNome'], function() {
    if (!DRIVE_MOCK && chrome.identity && chrome.identity.clearAllCachedAuthTokens) {
      chrome.identity.clearAllCachedAuthTokens(callback || function(){});
    } else {
      if (callback) callback();
    }
  });
}

// ── Autenticar e retornar token + info do usuário ─────────────
function driveAuth(callback) {
  if (DRIVE_MOCK) {
    callback(null, 'mock-token', { email: 'leticia@piposaude.com.br', name: 'Letícia' });
    return;
  }
  // Remover token em cache e forçar novo com escopos atualizados
  DRIVE_STATE = null;
  chrome.identity.getAuthToken({ interactive: false }, function(oldToken) {
    if (oldToken) {
      // Invalidar token antigo no Chrome e no Google
      chrome.identity.removeCachedAuthToken({ token: oldToken }, function() {
        fetch('https://accounts.google.com/o/oauth2/revoke?token=' + oldToken).catch(function(){});
        _driveGetNewToken(callback);
      });
    } else {
      _driveGetNewToken(callback);
    }
  });
}

function _driveGetNewToken(callback) {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError || !token) {
      var err = chrome.runtime.lastError;
      var msg = (err && (err.message || err.error || JSON.stringify(err))) || 'Token não recebido';
      console.error('Drive auth error:', err);
      callback(msg);
      return;
    }
    // Buscar perfil do usuário
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(function(r) { return r.json(); })
    .then(function(info) {
      var perfil = { email: info.email || '', name: info.name || '' };
      DRIVE_STATE = { token: token, perfil: perfil };
      callback(null, token, perfil);
    })
    .catch(function() {
      DRIVE_STATE = { token: token, perfil: { email: '', name: '' } };
      callback(null, token, DRIVE_STATE.perfil);
    });
  });
}

// ── Buscar documentos por nome (na pasta vinculada se existir) ─
function driveBuscar(token, nome, pastaId, callback) {
  if (DRIVE_MOCK) {
    setTimeout(function() {
      callback(null, [
        { id: 'mock-t1', name: nome + ' — Transcrição — 24/09/2025 14:20', modifiedTime: '2025-09-24T14:20:00Z' },
        { id: 'mock-t2', name: nome + ' — Transcrição — 23/09/2025 09:10', modifiedTime: '2025-09-23T09:10:00Z' },
      ]);
    }, 600);
    return;
  }

  var primeiraPalavra = nome.trim().split(' ')[0].replace(/'/g, "\'");

  // Busca EXCLUSIVA por "Transcrição" — nunca retorna Anotações do Gemini
  // Busca por nome do paciente E "Transcri" no título
  var q = "name contains '" + primeiraPalavra + "'" +
          " and name contains 'Transcri'" +
          " and trashed=false";
  if (pastaId) q += " and '" + pastaId + "' in parents";

  console.log('[Drive] Buscando transcrição:', primeiraPalavra);

  var url = 'https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(q) +
            '&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=10';

  driveFetch(url, token, function(err, data) {
    if (err) { callback(err); return; }
    if (data.error) {
      console.error('[Drive] Erro API:', data.error.message);
      callback(data.error.message);
      return;
    }
    var arquivos = data.files || [];
    console.log('[Drive] Transcrições encontradas:', arquivos.length);
    if (arquivos.length === 0) {
      // Busca ampla: só "Transcri" na pasta, sem filtrar por nome
      var q2 = "name contains 'Transcri' and trashed=false";
      if (pastaId) q2 += " and '" + pastaId + "' in parents";
      var url2 = 'https://www.googleapis.com/drive/v3/files?q=' + encodeURIComponent(q2) +
                 '&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=10';
      driveFetch(url2, token, function(err2, data2) {
        if (err2) { callback(null, []); return; }
        console.log('[Drive] Busca ampla:', (data2.files || []).length, 'resultados');
        callback(null, data2.files || []);
      });
      return;
    }
    callback(null, arquivos);
  });
}


// ── Ler conteúdo de um Google Docs ───────────────────────────
function driveLer(token, docId, callback) {
  if (DRIVE_MOCK) {
    setTimeout(function() {
      callback(null,
        '[TRANSCRIÇÃO SIMULADA]\n\n' +
        'Letícia: Bom dia! Como você está?\n' +
        'Paciente: Bom dia. Estou bem, obrigada.\n' +
        'Letícia: Vamos começar. Qual é o motivo da sua consulta hoje?\n' +
        'Paciente: Quero fazer um check-up geral. Tenho hipertensão e quero verificar os exames.\n' +
        'Letícia: Você toma alguma medicação?\n' +
        'Paciente: Sim, losartana 50mg uma vez ao dia.\n' +
        'Letícia: Pratica atividade física?\n' +
        'Paciente: Não, sou sedentária.\n' +
        'Letícia: E como está o sono?\n' +
        'Paciente: Durmo mal, tenho insônia.'
      );
    }, 400);
    return;
  }

  // Exportar como texto puro — captura o conteúdo real da transcrição
  // incluindo tabs/seções que não aparecem no body.content da API do Docs
  // Exportar como texto puro — captura transcrição completa
  var urlExport = 'https://www.googleapis.com/drive/v3/files/' + docId + '/export?mimeType=text/plain';
  fetch(urlExport, { headers: { Authorization: 'Bearer ' + token } })
  .then(function(r) {
    if (r.status === 401) {
      // Token expirado durante leitura — renovar e tentar de novo
      DRIVE_STATE = null;
      chrome.identity.removeCachedAuthToken({ token: token }, function() {
        chrome.identity.getAuthToken({ interactive: false }, function(newToken) {
          var t2 = newToken || token;
          fetch(urlExport, { headers: { Authorization: 'Bearer ' + t2 } })
          .then(function(r2) { return r2.text(); })
          .then(function(txt) { callback(null, txt.trim()); })
          .catch(function(e) { callback(e.message); });
        });
      });
      return null;
    }
    if (!r.ok) {
      // Fallback: API do Docs
      return fetch('https://docs.googleapis.com/v1/documents/' + docId, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(function(r2) { return r2.json(); })
      .then(function(doc) {
        var texto = '';
        (doc.body && doc.body.content || []).forEach(function(el) {
          if (el.paragraph) {
            (el.paragraph.elements || []).forEach(function(pe) {
              if (pe.textRun) texto += pe.textRun.content;
            });
          }
        });
        return texto.trim();
      });
    }
    return r.text();
  })
  .then(function(texto) {
    if (!texto) return; // já tratado no 401
    if (texto.trim().length < 50) {
      callback('Documento parece vazio. Verifique se a transcrição foi gerada.');
      return;
    }
    console.log('[Drive] Transcrição lida:', texto.length, 'chars');
    callback(null, texto.trim());
  })
  .catch(function(e) {
    console.error('[Drive] Erro ao ler:', e.message);
    callback(e.message || 'Erro ao ler documento');
  });
}


// ── Listar subpastas de uma pasta ─────────────────────────────
function driveListarPastas(token, pastaId, callback) {
  if (DRIVE_MOCK) {
    callback(null, [
      { id: 'pasta-1', name: 'Transcrições Gemini' },
      { id: 'pasta-2', name: 'Consultas 2025' },
    ]);
    return;
  }
  var parent = pastaId || 'root';
  var q = encodeURIComponent("'" + parent + "' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false");
  fetch('https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id,name)&orderBy=name&pageSize=20', {
    headers: { Authorization: 'Bearer ' + token }
  })
  .then(function(r) { return r.json(); })
  .then(function(data) { callback(null, data.files || []); })
  .catch(function(e) { callback(e.message || 'Erro ao listar pastas'); });
}
