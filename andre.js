// ══════════════════════════════════════════════════════════════
// RELATÓRIO DE ENFERMAGEM — aba nativa da extensão
// Chama Claude API para gerar os 5 blocos do Nilo
// ══════════════════════════════════════════════════════════════

var ppAba   = "tele";
var ppState = { tipo:"", medicos:[], exame:"", medTri:[] };
var TIPOS   = ["Eletiva","Espontânea","Programa Pinguim","Saúde Mental","Atestado de Atividade Física"];
var MEDICAS = ["Dra. Ana","Dra. Letícia","Dra. Bia","Dra. Rosi"];

// ── System prompt das instruções do André ────────────────────

// ── Montar campos ────────────────────────────────────────────
function ppVal(id) { var e = document.getElementById(id); return e ? e.value.trim() : ""; }

function ppMontarComando() {
  if (ppAba === "tele") {
    var meds = ppState.medicos.length ? ppState.medicos.join(", ") : "(não informado)";
    return "Paciente: " + (ppVal("t_paciente") || "(não informado)") + "\n"
      + "Tipo de teleconsulta: " + (ppState.tipo || "(não informado)") + "\n"
      + "Gerar tarefa para: " + meds + "\n"
      + "Exame anexado (sim/não): " + (ppState.exame || "(não informado)") + "\n"
      + "Observações: " + (ppVal("t_obs") || "(não informado)") + "\n\n"
      + "Transcrição:\n" + (ppVal("t_transc") || "(não informada)");
  } else {
    var medsT = ppState.medTri && ppState.medTri.length ? ppState.medTri.join(", ") : "(não informado)";
    return "[TRIAGEM]\n"
      + "Paciente: " + (ppVal("r_paciente") || "(não informado)") + "\n"
      + "Gerar tarefa para: " + medsT + "\n"
      + "Observações: " + (ppVal("r_obs") || "(não informado)") + "\n\n"
      + "Conteúdo do ticket do Zendesk:\n" + (ppVal("r_zendesk") || "(não informado)");
  }
}

// ── Chips ─────────────────────────────────────────────────────
function ppBuildChips() {
  // Tipos de teleconsulta (seleção única)
  var ct = document.getElementById("chips-tipo");
  if (ct) {
    ct.innerHTML = "";
    TIPOS.forEach(function(t) {
      var b = document.createElement("button");
      b.className = "pp-chip" + (ppState.tipo === t ? " active" : "");
      b.textContent = t;
      b.addEventListener("click", function() {
        ppState.tipo = ppState.tipo === t ? "" : t;
        ppBuildChips();
      });
      ct.appendChild(b);
    });
  }
  // Médicas teleconsulta (seleção múltipla)
  var cm = document.getElementById("chips-med-tele");
  if (cm) {
    cm.innerHTML = "";
    MEDICAS.forEach(function(m) {
      var b = document.createElement("button");
      b.className = "pp-chip" + (ppState.medicos.indexOf(m) !== -1 ? " active" : "");
      b.textContent = m;
      b.addEventListener("click", function() {
        var idx = ppState.medicos.indexOf(m);
        if (idx === -1) ppState.medicos.push(m);
        else ppState.medicos.splice(idx, 1);
        ppBuildChips();
      });
      cm.appendChild(b);
    });
  }
  // Exame (seleção única)
  var ce = document.getElementById("chips-exame");
  if (ce) {
    ce.innerHTML = "";
    ["Sim","Não"].forEach(function(v) {
      var b = document.createElement("button");
      b.className = "pp-chip" + (ppState.exame === v ? " active" : "");
      b.textContent = v;
      b.addEventListener("click", function() {
        ppState.exame = ppState.exame === v ? "" : v;
        ppBuildChips();
      });
      ce.appendChild(b);
    });
  }
  // Médicas triagem (seleção múltipla)
  var cmt = document.getElementById("chips-med-tri");
  if (cmt) {
    if (!ppState.medTri) ppState.medTri = [];
    cmt.innerHTML = "";
    MEDICAS.forEach(function(m) {
      var b = document.createElement("button");
      b.className = "pp-chip" + (ppState.medTri.indexOf(m) !== -1 ? " active" : "");
      b.textContent = m;
      b.addEventListener("click", function() {
        var idx = ppState.medTri.indexOf(m);
        if (idx === -1) ppState.medTri.push(m);
        else ppState.medTri.splice(idx, 1);
        ppBuildChips();
      });
      cmt.appendChild(b);
    });
  }
}

// ── Tabs ──────────────────────────────────────────────────────
function ppShow(aba) {
  ppAba = aba;
  // Controlar visibilidade via style.display — sem depender de classes CSS externas
  var paneTele = document.getElementById("pane-tele");
  var paneTri  = document.getElementById("pane-tri");
  if (paneTele) paneTele.style.display = aba === "tele" ? "flex" : "none";
  if (paneTri)  paneTri.style.display  = aba === "tri"  ? "flex" : "none";
  // Estilo dos botões de tab interno
  var tabTele = document.getElementById("tab-tele");
  var tabTri  = document.getElementById("tab-tri");
  if (tabTele) {
    tabTele.style.background   = aba === "tele" ? "#fff" : "transparent";
    tabTele.style.color        = aba === "tele" ? "#0F3D3E" : "#8FB4B1";
    tabTele.style.borderBottom = aba === "tele" ? "2px solid #158A7B" : "2px solid transparent";
  }
  if (tabTri) {
    tabTri.style.background   = aba === "tri" ? "#fff" : "transparent";
    tabTri.style.color        = aba === "tri" ? "#0F3D3E" : "#8FB4B1";
    tabTri.style.borderBottom = aba === "tri" ? "2px solid #158A7B" : "2px solid transparent";
  }
  ppEsconderResultado();
}

// ── Resultado ─────────────────────────────────────────────────
function ppEsconderResultado() {
  var r = document.getElementById("pp-resultado");
  if (r) r.style.display = "none";
}

function ppMostrarResultado(texto) {
  var r = document.getElementById("pp-resultado");
  var pre = document.getElementById("pp-resultado-texto");
  if (r) r.style.display = "block";
  if (pre) pre.textContent = texto;
  // Rolar para o resultado
  if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ppMostrarErro(msg) {
  var r = document.getElementById("pp-resultado");
  var pre = document.getElementById("pp-resultado-texto");
  if (r) { r.style.display = "block"; r.style.borderColor = "#dc2626"; }
  if (pre) pre.textContent = "Erro: " + msg;
}

// ── Gerar evolução (local — sem API) ────────────────────────
function ppGerar() {
  var btn = document.getElementById("pp-gerar");

  // Validação mínima
  if (ppAba === "tele" && !ppVal("t_paciente") && !ppVal("t_transc")) {
    ppMostrarErro("Preencha o nome do paciente ou cole a transcrição.");
    return;
  }
  if (ppAba === "tri" && !ppVal("r_zendesk")) {
    ppMostrarErro("Cole o conteúdo do ticket do Zendesk.");
    return;
  }

  if (btn) { btn.textContent = "⏳ Montando..."; btn.disabled = true; }

  // Montar texto da evolução a partir dos campos
  var texto = ppMontarEvolucao();

  setTimeout(function() {
    if (btn) { btn.textContent = "Gerar evolução"; btn.disabled = false; }
    ppMostrarResultado(texto);
  }, 300);
}

function ppMontarEvolucao() {
  function getCampo(id) {
    var el = document.getElementById(id);
    return el && el.value.trim() ? el.value.trim() : null;
  }

  // ── Orientações por regras ────────────────────────────────────
  function gerarOrientacoes(dados) {
    var ori = [];
    var h  = (dados.hidratacao || '').toLowerCase();
    var a  = (dados.atividadeFisica || '').toLowerCase();
    var t  = (dados.tabagismo || '').toLowerCase();
    var al = (dados.alcool || '').toLowerCase();
    var ev = (dados.evacuacao || '').toLowerCase();
    var so = (dados.sono || '').toLowerCase();
    var cc = dados.condicoesPessoais.join(' ').toLowerCase();

    if (h.indexOf('insuficiente') !== -1)
      ori.push('Aumentar ingestão hídrica (meta: ≥2L/dia).');
    if (a.indexOf('sedent') !== -1)
      ori.push('Incentivar prática de atividade física regular (≥150min/semana).');
    if (t && t.indexOf('não') === -1 && t.indexOf('nao') === -1 && t.indexOf('ex') === -1)
      ori.push('Orientar cessação do tabagismo. Disponibilizar suporte se necessário.');
    if (al.indexOf('frequente') !== -1)
      ori.push('Orientar redução do consumo de álcool e riscos associados.');
    if (ev.indexOf('pris') !== -1)
      ori.push('Incentivar dieta rica em fibras, hidratação adequada e atividade física.');
    if (so.indexOf('insônia') !== -1 || so.indexOf('insonia') !== -1 || so.indexOf('não reparador') !== -1)
      ori.push('Orientar higiene do sono: horários regulares, reduzir telas antes de dormir.');
    if (cc.indexOf('gastrite') !== -1)
      ori.push('Gastrite: evitar jejum prolongado, alimentos irritativos, álcool e AINE sem prescrição.');
    if (cc.indexOf('ansiedade') !== -1 || cc.indexOf('depressão') !== -1 || cc.indexOf('depressao') !== -1)
      ori.push('Reforçar acompanhamento com saúde mental. Pipo disponibiliza suporte psicológico.');
    if (cc.indexOf('hipertensão') !== -1 || cc.indexOf('hipertensao') !== -1)
      ori.push('Reforçar adesão ao tratamento anti-hipertensivo, dieta hipossódica e monitoramento de PA.');
    if (cc.indexOf('diabetes') !== -1)
      ori.push('Reforçar controle glicêmico, adesão medicamentosa e dieta com baixo índice glicêmico.');
    if (ori.length === 0)
      ori.push('Orientações individualizadas conforme demanda da consulta — completar.');
    return ori;
  }

  // ── CIAP — múltiplos permitidos ───────────────────────────────
  function gerarCIAP(dados, tipo) {
    var ciaps = [];
    var cc = dados.condicoesPessoais.join(' ').toLowerCase();
    if (tipo === 'Eletiva' || tipo === 'Programa Pinguim')
      ciaps.push('A98 — Prevenção/rastreamento (check-up)');
    else if (tipo === 'Espontânea')
      ciaps.push('(definir conforme queixa principal)');
    if (cc.indexOf('hipertensão') !== -1 || cc.indexOf('hipertensao') !== -1)
      ciaps.push('K86 — Hipertensão sem complicações');
    if (cc.indexOf('diabetes') !== -1)
      ciaps.push('T90 — Diabetes mellitus');
    if (cc.indexOf('ansiedade') !== -1) ciaps.push('P74 — Ansiedade');
    if (cc.indexOf('depressão') !== -1 || cc.indexOf('depressao') !== -1) ciaps.push('P76 — Depressão');
    if (cc.indexOf('gastrite') !== -1)  ciaps.push('D86 — Gastrite/duodenite');
    if (cc.indexOf('rinite') !== -1)    ciaps.push('R97 — Rinite alérgica');
    if (cc.indexOf('enxaqueca') !== -1) ciaps.push('N89 — Enxaqueca');
    if (cc.indexOf('insônia') !== -1 || cc.indexOf('insonia') !== -1) ciaps.push('P06 — Distúrbio do sono');
    return ciaps.length ? ciaps : ['(definir CIAP conforme queixa)'];
  }

  // ── Resumo clínico para a médica ──────────────────────────────
  function gerarResumoCli(pac, meds, dados, obs, tipo) {
    var partes = [];
    if (tipo === 'Eletiva') partes.push('check-up geral');
    if (dados.condicoesPessoais.length) partes.push(dados.condicoesPessoais.join(', ').toLowerCase());
    if (obs) partes.push(obs.toLowerCase());
    partes.push('(completar conforme consulta)');
    return meds + ': ' + partes.join(', ') + '.';
  }

  // ═══════════════════════════════════════════════════════════════
  if (ppAba === 'tele') {
    var pac   = ppVal('t_paciente') || '(não informado)';
    var tipo  = ppState.tipo || '(não informado)';
    var meds  = ppState.medicos && ppState.medicos.length ? ppState.medicos.join(', ') : '(não informado)';
    var exame = ppState.exame || 'Não';
    var obs   = ppVal('t_obs') || '';

    var dados = {
      condicoesPessoais:   (getCampo('t_condicoes') || '').split(',').map(function(s){return s.trim();}).filter(Boolean),
      antecedenteFamiliar: getCampo('t_ant_familiar') || '(preencher)',
      medicacoes:          getCampo('t_medicacoes')   || '(preencher)',
      alergias:            getCampo('t_alergias')      || '(preencher)',
      sono:                getCampo('t_sono')          || '(preencher)',
      hidratacao:          getCampo('t_hidratacao')    || '(preencher)',
      tabagismo:           getCampo('t_tabagismo')     || '(preencher)',
      alcool:              getCampo('t_alcool')        || '(preencher)',
      atividadeFisica:     getCampo('t_atividade')     || '(preencher)',
      diurese:             getCampo('t_diurese')       || '(preencher)',
      evacuacao:           getCampo('t_evacuacao')     || '(preencher)',
      pesoAltura:          getCampo('t_peso_altura')   || '(preencher)',
      pa:                  getCampo('t_pa')            || '',
    };

    var isEletiva = (tipo === 'Eletiva' || tipo === 'Programa Pinguim');
    var L = [];
    var n = 1; // numerador de seções
    var sec = function(titulo) { L.push(''); L.push(n + '. ' + titulo); L.push(''); n++; };

    // Cabeçalho
    L.push('Teleconsulta de Enfermagem — ' + tipo);
    L.push('Paciente: ' + pac.toUpperCase());
    L.push('Data: ' + new Date().toLocaleDateString('pt-BR'));
    L.push('Enfermeira: (preencher)');

    // 1. Motivo
    sec('Motivo da Teleconsulta');
    L.push('Queixa principal: ' + (obs || '(preencher)'));
    if (!isEletiva) {
      L.push('Início dos sintomas: ');
      L.push('Evolução: ');
    }

    // 2. Pessoa com útero (eletiva) / HMA (espontânea)
    if (isEletiva) {
      sec('Pessoa com útero — Antecedentes Reprodutivos');
      L.push('[  ] Não se aplica');
      L.push('DUM: ');
      L.push('Contraceptivo: ');
      L.push('CCO (mês/ano e resultado): ');
      L.push('Gestações: __ Partos: __ Abortos: __');
      L.push('Planeja engravidar: [  ] Sim  [  ] Não');
    } else {
      sec('Histórico Médico Atual (HMA)');
      L.push('Sintomas associados: ');
      L.push('Fatores que pioram ou aliviam: ');
      L.push('Já usou medicação para este problema: [  ] Sim  [  ] Não');
    }

    // 3. Condições pré-existentes
    sec('Condições Pré-existentes');
    L.push('Doenças crônicas: ' + (dados.condicoesPessoais.length ? dados.condicoesPessoais.join(', ') : '(preencher)'));
    L.push('Medicações de uso contínuo: ' + dados.medicacoes);
    L.push('Alergias: ' + dados.alergias);

    // 4. Antecedentes pessoais e familiares
    sec('Antecedentes Pessoais e Familiares');
    L.push('Internações/cirurgias/traumas: (preencher)');
    L.push('Histórico familiar: ' + dados.antecedenteFamiliar);
    if (!isEletiva) L.push('DUM (pessoas com útero): ');

    // 5. Saúde sexual (eletiva)
    if (isEletiva) {
      sec('Saúde Sexual e Reprodutiva');
      L.push('Parceiro(a) fixo(a): [  ] Sim  [  ] Não');
      L.push('Aceita exames para ISTs: [  ] Sim  [  ] Não');
    }

    // 6. Hábitos e estilo de vida
    sec('Hábitos e Estilo de Vida');
    L.push('Alimentação: (preencher)');
    L.push('Hidratação: ' + dados.hidratacao);
    L.push('Álcool: ' + dados.alcool);
    L.push('Tabagismo: ' + dados.tabagismo);
    L.push('Atividade física: ' + dados.atividadeFisica);

    // 7. Sono
    sec('Sono');
    L.push('Sono: ' + dados.sono);
    L.push('Hora de dormir/acordar: ');

    // 8. Funções fisiológicas
    sec('Funções Fisiológicas');
    L.push('Diurese: ' + dados.diurese);
    L.push('Evacuação: ' + dados.evacuacao);

    // 9. Últimos exames (eletiva)
    if (isEletiva) {
      sec('Últimos Exames de Rotina');
      L.push('(tipo de exame e data — ex: hemograma, nov/2024)');
      L.push('Usuário TOP: [  ] Sim  [  ] Não');
    }

    // 10. Peso e altura
    sec('Peso e Altura');
    L.push('Peso/Altura: ' + dados.pesoAltura);
    if (dados.pa) L.push('PA: ' + dados.pa);

    // 11. Orientações
    sec('Orientações');
    gerarOrientacoes(dados).forEach(function(o) { L.push('• ' + o); });

    // 12. CIAP
    sec('CIAP');
    gerarCIAP(dados, tipo).forEach(function(c) { L.push('• ' + c); });

    // 13. Resumo para a médica (separado da tarefa)
    sec('Resumo para a Médica');
    L.push(gerarResumoCli(pac, meds, dados, obs, tipo));

    // Rodapé operacional
    L.push('');
    L.push('─────────────────────────────────────');
    L.push('Tarefa gerada para: ' + meds);
    if (exame === 'Sim') L.push('Exames: Equipe anexou exame(s) no prontuário Nilo.');
    L.push('Usuário TOP: Não');

    return L.join('\n');

  // ── Triagem ──────────────────────────────────────────────────
  } else {
    var pac  = ppVal('r_paciente') || '(não informado)';
    var meds = ppState.medTri && ppState.medTri.length ? ppState.medTri.join(', ') : '(não informado)';
    var obs  = ppVal('r_obs') || '';
    var zen  = ppVal('r_zendesk') || '(não informado)';
    var L = [];
    L.push('Triagem de Enfermagem');
    L.push('Paciente: ' + pac.toUpperCase());
    L.push('Data: ' + new Date().toLocaleDateString('pt-BR'));
    L.push('');
    L.push('Conteúdo do ticket:');
    L.push(zen);
    if (meds !== '(não informado)') { L.push(''); L.push('Tarefa gerada para: ' + meds); }
    if (obs) L.push('Observações: ' + obs);
    return L.join('\n');
  }
}


// ── Copiar resultado ──────────────────────────────────────────
function ppCopiarNilo() {
  var pre = document.getElementById("pp-resultado-texto");
  if (!pre) return;
  var txt = pre.textContent;
  var btn = document.getElementById("pp-copiar-nilo");
  function onOk() {
    if (btn) {
      btn.textContent = "✓ Copiado! Cole no Nilo";
      btn.className = "pp-btn ok";
      setTimeout(function() { btn.textContent = "Copiar para o Nilo"; btn.className = "pp-btn"; }, 2500);
    }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(onOk).catch(function() {
      var ta = document.createElement("textarea");
      ta.value = txt; ta.style.cssText = "position:fixed;top:-999px;left:-999px";
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta); onOk();
    });
  } else {
    var ta = document.createElement("textarea");
    ta.value = txt; ta.style.cssText = "position:fixed;top:-999px;left:-999px";
    document.body.appendChild(ta); ta.focus(); ta.select();
    document.execCommand("copy"); document.body.removeChild(ta); onOk();
  }
}

// ── Limpar ────────────────────────────────────────────────────
function ppLimpar() {
  ppState = { tipo:"", medicos:[], exame:"", medTri:[] };
  ["t_paciente","t_obs","t_transc","r_paciente","r_obs","r_zendesk"].forEach(function(id) {
    var e = document.getElementById(id); if (e) e.value = "";
  });
  ppBuildChips();
  ppEsconderResultado();
}

// ── Listeners de input ────────────────────────────────────────
function ppInitListeners() {
  var pairs = [
    ["tab-tele",            function() { ppShow("tele"); }],
    ["tab-tri",             function() { ppShow("tri");  }],
    ["pp-gerar",            ppGerar],
    ["pp-copiar-nilo",      ppCopiarNilo],
    ["pp-limpar",           ppLimpar],
    ["btn-acesso-rapido",   ppToggleAcessoRapido],
    ["btn-importar-drive",  ppImportarDrive],
    ["btn-drive-config",    ppAbrirDriveConfig],
    ["ar-busca",            null]  // busca tem listener próprio abaixo
  ];
  pairs.forEach(function(pair) {
    if (!pair[1]) return; // listener null = tratado separado
    var el = document.getElementById(pair[0]);
    if (el && !el.dataset.ppBound) {
      el.addEventListener("click", pair[1]);
      el.dataset.ppBound = "1";
    }
  });
  // Busca do acesso rápido
  var busca = document.getElementById("ar-busca");
  if (busca && !busca.dataset.ppBound) {
    busca.addEventListener("input", ppBuscarAcesso);
    busca.dataset.ppBound = "1";
  }
}

// ── Acesso Rápido — toggle ────────────────────────────────────
var _arAberto = false;
function ppToggleAcessoRapido() {
  _arAberto = !_arAberto;
  var items = document.getElementById("acesso-rapido-items");
  var seta  = document.getElementById("ar-seta");
  if (items) {
    if (_arAberto) {
      items.style.display = "flex";
      items.style.maxHeight = "2000px";
    } else {
      items.style.maxHeight = "0";
      setTimeout(function() {
        if (!_arAberto) items.style.display = "none";
      }, 400);
    }
  }
  if (seta) seta.style.transform = _arAberto ? "rotate(180deg)" : "";
  // Limpar busca ao fechar
  if (!_arAberto) {
    var b = document.getElementById("ar-busca");
    if (b) { b.value = ""; ppBuscarAcesso(); }
  }
}

function ppBuscarAcesso() {
  var q = (document.getElementById("ar-busca").value || "").toLowerCase().trim();
  var items = document.querySelectorAll(".ar-item");
  var grupos = document.querySelectorAll(".ar-grupo");
  items.forEach(function(el) {
    var label = (el.getAttribute("data-label") || "").toLowerCase();
    el.style.display = (!q || label.indexOf(q) !== -1) ? "" : "none";
  });
  // Esconder grupo se todos os items estiverem ocultos
  grupos.forEach(function(g) {
    var visiveis = g.querySelectorAll('.ar-item:not([style*="none"])');
    g.style.display = visiveis.length === 0 ? "none" : "";
  });
}


// ── Importação do Drive ───────────────────────────────────────
function ppAbrirDriveVista(vista) {
  var busca  = document.getElementById('drive-vista-busca');
  var config = document.getElementById('drive-vista-config');
  if (busca)  busca.style.display  = vista === 'busca'  ? 'flex' : 'none';
  if (config) config.style.display = vista === 'config' ? 'flex' : 'none';
}

function ppDriveAtualizarConfig() {
  driveGetPerfil(function(perfil) {
    var info    = document.getElementById('drive-config-info');
    var btnCon  = document.getElementById('btn-drive-conectar');
    var btnDes  = document.getElementById('btn-drive-desconectar');
    var pastaW  = document.getElementById('drive-pasta-wrap');
    if (perfil) {
      if (info)   info.textContent = '✓ Conectado como ' + perfil.driveEmail;
      if (btnCon) btnCon.style.display = 'none';
      if (btnDes) btnDes.style.display = 'block';
      if (pastaW) pastaW.style.display = 'block';
      // Mostrar pasta escolhida
      var pl = document.getElementById('drive-pastas-lista');
      if (pl) pl.innerHTML = perfil.drivePastaNome
        ? '<div style="padding:7px 10px;background:#F2F7F6;border-radius:6px;font-size:12px;color:#0F3D3E">📁 ' + perfil.drivePastaNome + '</div>'
        : '<div style="font-size:12px;color:#a0a09c">Nenhuma pasta escolhida — buscará em todo o Drive</div>';
    } else {
      if (info)   info.textContent = 'Nenhuma conta conectada.';
      if (btnCon) btnCon.style.display = 'block';
      if (btnDes) btnDes.style.display = 'none';
      if (pastaW) pastaW.style.display = 'none';
    }
  });
}

function ppImportarDrive() {
  var nome = ppVal('t_paciente');
  if (!nome) {
    notif('Digite o nome do paciente primeiro');
    document.getElementById('t_paciente').focus();
    return;
  }
  var modal = document.getElementById('m-drive');
  if (!modal) return;
  ppAbrirDriveVista('busca');
  modal.style.display = 'flex';

  // Mostrar conta conectada no badge
  driveGetPerfil(function(perfil) {
    var badge = document.getElementById('drive-conta-badge');
    if (badge) badge.textContent = perfil ? ('🔗 ' + perfil.driveEmail) : '⚠ Conta não vinculada — clique em ⚙ Conta';
  });

  var lista  = document.getElementById('drive-lista');
  var status = document.getElementById('drive-status');
  lista.innerHTML = '';
  status.textContent = 'Buscando "' + nome + '" no Drive...';

  driveAuth(function(err, token) {
    if (err) {
      status.textContent = 'Erro: ' + err;
      return;
    }
    // Salvar perfil se ainda não salvo
    driveGetPerfil(function(perfil) {
      var pastaId = perfil ? perfil.drivePastaId : null;
      driveBuscar(token, nome, pastaId, function(err2, docs) {
        if (err2) { status.textContent = 'Erro na busca: ' + err2; return; }
        if (!docs || !docs.length) {
          status.textContent = 'Nenhum documento encontrado para "' + nome + '"';
          return;
        }
        status.textContent = docs.length + ' documento(s) encontrado(s):';
        docs.forEach(function(doc) {
          var btn = document.createElement('button');
          var data = doc.modifiedTime
            ? new Date(doc.modifiedTime).toLocaleString('pt-BR', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})
            : '';
          btn.style.cssText = 'width:100%;padding:10px 12px;border-radius:8px;border:1px solid #D6E3E3;background:#fff;text-align:left;cursor:pointer;font-size:12px';
          btn.innerHTML = '<div style="font-weight:600;color:#12302F">' + doc.name + '</div>' +
                          (data ? '<div style="color:#a0a09c;font-size:11px;margin-top:2px">' + data + '</div>' : '');
          btn.addEventListener('click', function() { ppSelecionarDoc(token, doc.id, doc.name); });
          lista.appendChild(btn);
        });
      });
    });
  });
}

function ppSelecionarDoc(token, docId, docNome) {
  var status = document.getElementById('drive-status');
  status.textContent = 'Carregando "' + docNome + '"...';
  document.getElementById('drive-lista').innerHTML = '';
  driveLer(token, docId, function(err, texto) {
    document.getElementById('m-drive').style.display = 'none';
    if (err) { notif('Erro ao ler: ' + err); return; }
    var ta = document.getElementById('t_transc');
    if (ta) ta.value = texto;
    notif('Transcrição importada ✓');
    // Rodar motor de extração automaticamente
    if (typeof ppExtrairTranscricao === 'function') {
      var dados = ppExtrairTranscricao(texto);
      if (dados) {
        var camposDiv = document.getElementById('campos-extrator');
        var total = ppPreencherMascara(dados);
        if (camposDiv && total > 0) {
          camposDiv.style.display = 'flex';
          notif(total + ' campo(s) extraídos automaticamente 🟡');
        }
      }
    }
  });
}

// ── Config de conta Drive ──────────────────────────────────────
function ppAbrirDriveConfig() {
  ppAbrirDriveVista('config');
  ppDriveAtualizarConfig();
}

function ppDriveConectar() {
  var btn = document.getElementById('btn-drive-conectar');
  if (btn) btn.textContent = 'Conectando...';
  driveAuth(function(err, token, perfil) {
    if (err) {
      notif('Erro: ' + err);
      if (btn) btn.textContent = 'Conectar conta Google';
      return;
    }
    driveSalvarPerfil(perfil.email, perfil.name, null, null, function() {
      ppDriveAtualizarConfig();
      notif('Conta conectada: ' + perfil.email);
    });
  });
}

function ppDriveDesconectar() {
  driveDesconectar(function() {
    ppDriveAtualizarConfig();
    notif('Conta desconectada');
  });
}

// ── Init (chamado quando aba é aberta) ────────────────────────
function ppInit() {
  ppBuildChips();
  ppEsconderResultado();
  ppInitListeners();
}
