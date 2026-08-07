// ══════════════════════════════════════════════════════════════
// EXTRATOR.JS — Motor de regras para extração de transcrições
// Preenche campos da máscara a partir de texto livre do Gemini
// NUNCA infere — só extrai o que está explícito na transcrição
// ══════════════════════════════════════════════════════════════

// ── Utilitários ───────────────────────────────────────────────

// Normalizar texto: minúsculas, sem acentos, sem pontuação dupla
function exNorm(txt) {
  return txt.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s\d,.:;\/\-]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

// Detectar negação próxima a um termo
// Retorna true se "não", "nega", "sem", "nunca" aparecer antes do termo (até 6 palavras)
function exNegado(frase, termo) {
  var neg = ['nao', 'nega', 'sem', 'nunca', 'jamais', 'ausente', 'ausencia'];
  var palavras = frase.split(' ');
  var idx = palavras.findIndex(function(p) { return p.indexOf(termo) !== -1; });
  if (idx === -1) return false;
  var janela = palavras.slice(Math.max(0, idx - 6), idx);
  return janela.some(function(p) { return neg.indexOf(p) !== -1; });
}

// Detectar se é contexto familiar (mãe, pai, avó, etc.)
function exFamiliar(frase) {
  var parentes = ['mae', 'pai', 'avo', 'ava', 'irmao', 'irma', 'tio', 'tia',
                  'primo', 'prima', 'filho', 'filha', 'avo', 'bisavo',
                  'familiar', 'familia', 'parente'];
  return parentes.some(function(p) { return frase.indexOf(p) !== -1; });
}

// Encontrar valor numérico próximo a um padrão
function exNumero(texto, padroes) {
  for (var i = 0; i < padroes.length; i++) {
    var m = texto.match(padroes[i]);
    if (m) return m[1] || m[0];
  }
  return null;
}

// ── Extratores específicos ────────────────────────────────────

function exPeso(texto) {
  var n = exNorm(texto);
  var m = n.match(/(\d{2,3})\s*kg/) ||
          n.match(/peso[:\s]+(\d{2,3})/) ||
          n.match(/peso\s+de\s+(\d{2,3})/);
  return m ? m[1] + ' kg' : null;
}

function exAltura(texto) {
  var n = exNorm(texto);
  var m = n.match(/(\d[.,]\d{2})\s*m(?:etro)?s?/) ||
          n.match(/altura[:\s]+(\d[.,]\d{2})/) ||
          n.match(/(\d{3})\s*cm/) ||
          n.match(/altura[:\s]+(\d{3})/);
  if (m) {
    var val = m[1];
    if (val.length === 3 && !val.includes(',') && !val.includes('.')) {
      return (parseInt(val) / 100).toFixed(2).replace('.', ',') + ' m';
    }
    return val.replace('.', ',') + ' m';
  }
  return null;
}

function exPA(texto) {
  var n = exNorm(texto);
  var m = n.match(/(\d{2,3})\s*[x\/por]\s*(\d{2,3})\s*(?:mmhg)?/) ||
          n.match(/pressao[^.]*?(\d{2,3})\s*[x\/]\s*(\d{2,3})/);
  return m ? m[1] + '/' + m[2] + ' mmHg' : null;
}

function exSono(texto) {
  var n = exNorm(texto);
  var resultados = [];

  var horas = n.match(/durm[oa]?\s+(\d+)\s*h/) ||
              n.match(/(\d+)\s*h(?:oras?)?\s+de\s+sono/) ||
              n.match(/sono\s+de\s+(\d+)\s*h/);
  if (horas) resultados.push(horas[1] + 'h de sono');

  if (n.match(/insonia|dificuldade.*dormir|nao.*consigo.*dormir/))
    resultados.push('Insônia');
  if (n.match(/sono.*nao.*reparador|acord.*cansad|sono.*ruim/))
    resultados.push('Sono não reparador');
  if (n.match(/\bsono\s+(?:bom|otimo|regular|tranquilo)\b/))
    resultados.push('Sono regular');

  return resultados.length ? resultados.join('; ') : null;
}

function exHidratacao(texto) {
  var n = exNorm(texto);
  if (n.match(/bebo?\s+pouca\s+agua|nao.*bebo?\s+(?:muita\s+)?agua|hidratacao.*insuficiente|pouco.*liquido/))
    return 'Insuficiente';
  if (n.match(/bebo?\s+(?:muita|bastante|boa)\s+agua|hidratacao.*adequada|[2-3]\s*l(?:itros)?\s*(?:de\s*agua)?(?:\s*por\s*dia)?/))
    return 'Adequada (≥2L/dia)';
  return null;
}

function exTabagismo(texto) {
  var n = exNorm(texto);
  if (n.match(/nao\s+fum|nunca\s+fum|nao\s+e\s+fumante/)) return 'Não fumante';
  if (n.match(/ex.?fumante|parei\s+de\s+fum|fumei\s+por/)) {
    var m = n.match(/fumei\s+por\s+(\d+)|parei\s+h[aá]\s+(\d+)/);
    return 'Ex-fumante' + (m ? ' (' + (m[1]||m[2]) + ' anos)' : '');
  }
  if (n.match(/fumante|fumo|cigarro|tabaco/)) {
    var qtd = n.match(/(\d+)\s*cigarro/);
    return 'Fumante' + (qtd ? ' (' + qtd[1] + ' cigarros/dia)' : '');
  }
  return null;
}

function exAlcool(texto) {
  var n = exNorm(texto);
  if (n.match(/nao\s+bebo|nao\s+consumo\s+alcool|nao\s+usa?\s+alcool/)) return 'Não';
  if (n.match(/socialmente|ocasionalmente|final\s+de\s+semana|eventualmente/)) return 'Ocasional';
  if (n.match(/frequentemente|todo\s+dia|diariamente|bebo\s+(?:muito|bastante)/)) return 'Frequente';
  if (n.match(/\bcerveja\b|\bvinho\b|\bcachaca\b|\bwhiskey\b|\bbebida\b/)) return 'Sim (especificar)';
  return null;
}

function exAtividadeFisica(texto) {
  var n = exNorm(texto);
  if (n.match(/sedentari|nao\s+pratic|nao\s+faz.*exerc/)) return 'Sedentário';
  if (n.match(/(?:3|4|5|6|7)\s*(?:vezes|x)\s*(?:por\s*)?semana/)) return 'Regular';
  if (n.match(/academia|corrida|caminhada|natacao|pilates|yoga|crossfit|musculacao|exercicio/)) {
    var freq = n.match(/(\d)\s*x\s*(?:por\s*)?semana/);
    return freq ? 'Regular (' + freq[1] + 'x/semana)' : 'Regular';
  }
  if (n.match(/ocasionalmente|as\s+vezes.*exerc|exerc.*as\s+vezes/)) return 'Ocasional';
  return null;
}

function exDiurese(texto) {
  var n = exNorm(texto);
  if (n.match(/diurese.*normal|urina.*normal|xixi.*normal|sem.*alterac.*urin/)) return 'Sem alterações';
  if (n.match(/ardencia.*urin|dor.*urin|queimacao.*urin/)) return 'Alterada — ardência ao urinar';
  if (n.match(/urina.*escura|urina.*turva/)) return 'Alterada — urina escura/turva';
  if (n.match(/urina.*frequente|urinando.*muito|poliuria/)) return 'Alterada — frequência aumentada';
  return null;
}

function exEvacuacao(texto) {
  var n = exNorm(texto);
  if (n.match(/evacuac.*normal|intestino.*normal|fezes.*normal|sem.*constipac/)) return 'Sem alterações';
  if (n.match(/constipac|intestino.*preso|prisao\s+de\s+ventre|nao.*evacu/)) return 'Prisão de ventre';
  if (n.match(/diarreia|fezes\s+moles|intestino\s+(?:solto|acelerado)/)) return 'Diarreia';
  return null;
}

function exCondicoesPessoais(texto) {
  var n = exNorm(texto);
  var condicoes = [];
  var mapa = {
    'Hipertensão': ['hipertensao', 'pressao alta', 'has '],
    'Diabetes': ['diabetes', 'diabetico', 'glicemia alta', 'dm2', 'dm1'],
    'Asma': ['asma', 'asmatico'],
    'Rinite': ['rinite'],
    'Gastrite': ['gastrite'],
    'Refluxo': ['refluxo', 'gerd'],
    'Depressão': ['depressao', 'depressivo'],
    'Ansiedade': ['ansiedade', 'ansioso', 'transtorno ansioso'],
    'Hipotireoidismo': ['hipotireoidismo', 'tireoide'],
    'Enxaqueca': ['enxaqueca', 'migrânea', 'migranea'],
    'Síndrome do pânico': ['sindrome.*panico', 'panico'],
    'TDAH': ['tdah'],
  };

  var frases = n.split(/[.;]/);
  frases.forEach(function(frase) {
    if (exFamiliar(frase)) return;
    Object.keys(mapa).forEach(function(cond) {
      var termos = mapa[cond];
      var encontrou = termos.some(function(t) {
        return new RegExp(t).test(frase);
      });
      if (encontrou && !exNegado(frase, termos[0])) {
        if (condicoes.indexOf(cond) === -1) condicoes.push(cond);
      }
    });
  });
  return condicoes;
}

function exAntecedentesFamiliares(texto) {
  var n = exNorm(texto);
  var familiais = [];
  var mapa = {
    'Hipertensão': ['hipertensao', 'pressao alta'],
    'Diabetes': ['diabetes'],
    'Câncer': ['cancer', 'tumor', 'neoplasia'],
    'Doença cardíaca': ['infarto', 'cardiaco', 'coracao', 'avc'],
    'Depressão': ['depressao'],
  };

  var frases = n.split(/[.;]/);
  frases.forEach(function(frase) {
    if (!exFamiliar(frase)) return;
    Object.keys(mapa).forEach(function(cond) {
      var termos = mapa[cond];
      var encontrou = termos.some(function(t) {
        return new RegExp(t).test(frase);
      });
      if (encontrou && !exNegado(frase, termos[0])) {
        // Tentar identificar qual familiar
        var parente = '';
        var matchParente = frase.match(/\b(mae|pai|avo|ava|irmao|irma|tio|tia)\b/);
        if (matchParente) {
          var nomes = { mae:'Mãe', pai:'Pai', avo:'Avô', ava:'Avó',
                        irmao:'Irmão', irma:'Irmã', tio:'Tio', tia:'Tia' };
          parente = ' (' + (nomes[matchParente[1]] || matchParente[1]) + ')';
        }
        var item = cond + parente;
        if (familiais.indexOf(item) === -1) familiais.push(item);
      }
    });
  });
  return familiais;
}

function exMedicacoes(texto) {
  var n = exNorm(texto);
  var meds = [];
  // Padrões comuns de medicação
  var padroesMed = [
    /uso\s+([\w\s]+?)\s+(?:para|mg|comprimido)/gi,
    /tomo\s+([\w\s]+?)\s+(?:para|mg|comprimido|diariamente)/gi,
    /medicamento[:\s]+([\w\s,]+)/gi,
  ];
  // Lista de medicamentos comuns para detectar diretamente
  var medicosConhecidos = [
    'metformina', 'losartana', 'enalapril', 'atenolol', 'omeprazol',
    'levotiroxina', 'sertralina', 'fluoxetina', 'clonazepam', 'rivotril',
    'ritalina', 'concerta', 'escitalopram', 'amoxicilina', 'dipirona',
    'paracetamol', 'ibuprofeno', 'anticoncepcional'
  ];
  medicosConhecidos.forEach(function(med) {
    if (n.indexOf(med) !== -1) {
      var frase = n.split(/[.;]/).find(function(f) { return f.indexOf(med) !== -1; }) || '';
      if (!exNegado(frase, med)) meds.push(med.charAt(0).toUpperCase() + med.slice(1));
    }
  });
  return meds;
}

function exAlergias(texto) {
  var n = exNorm(texto);
  var alergias = [];
  var frases = n.split(/[.;]/);
  frases.forEach(function(frase) {
    if (frase.indexOf('alergi') !== -1 || frase.indexOf('intolerancia') !== -1) {
      if (!exNegado(frase, 'alergi')) {
        // Extrair ao que é alérgico
        var m = frase.match(/alergi[a-z]+\s+a\s+([\w\s]+)/);
        if (m) alergias.push(m[1].trim());
        else if (frase.indexOf('medicament') !== -1) alergias.push('Medicamentosa');
        else if (frase.indexOf('aliment') !== -1) alergias.push('Alimentar');
        else if (frase.indexOf('respira') !== -1 || frase.indexOf('poeira') !== -1) alergias.push('Respiratória');
      }
    }
  });
  return alergias;
}

function exMotivoConsulta(texto) {
  var n = exNorm(texto);
  // Primeira linha significativa geralmente é o motivo
  var linhas = texto.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l.length > 10; });
  // Procurar padrões de motivo
  for (var i = 0; i < Math.min(linhas.length, 10); i++) {
    var l = exNorm(linhas[i]);
    if (l.match(/motivo|consulta|queixa|veio para|gostaria de|preciso de|solicita/)) {
      return linhas[i].replace(/^(motivo|queixa|consulta)[:\s]*/i, '').trim();
    }
  }
  // Se não encontrar padrão, usar primeira linha com conteúdo clínico
  return linhas[0] || null;
}

// ── Função principal: extrai tudo e retorna objeto ─────────────
function ppExtrairTranscricao(textoTranscricao) {
  if (!textoTranscricao || !textoTranscricao.trim()) return null;

  var resultado = {
    motivo:              exMotivoConsulta(textoTranscricao),
    peso:                exPeso(textoTranscricao),
    altura:              exAltura(textoTranscricao),
    pa:                  exPA(textoTranscricao),
    sono:                exSono(textoTranscricao),
    hidratacao:          exHidratacao(textoTranscricao),
    tabagismo:           exTabagismo(textoTranscricao),
    alcool:              exAlcool(textoTranscricao),
    atividadeFisica:     exAtividadeFisica(textoTranscricao),
    diurese:             exDiurese(textoTranscricao),
    evacuacao:           exEvacuacao(textoTranscricao),
    condicoesPessoais:   exCondicoesPessoais(textoTranscricao),
    antecedenteFamiliar: exAntecedentesFamiliares(textoTranscricao),
    medicacoes:          exMedicacoes(textoTranscricao),
    alergias:            exAlergias(textoTranscricao),
  };

  // Log para revisão
  console.log('[Extrator] Resultado:', JSON.stringify(resultado, null, 2));
  return resultado;
}

// ── Preencher campos da máscara com destaque amarelo ──────────
function ppPreencherMascara(dados) {
  if (!dados) return;

  function setField(id, valor) {
    var el = document.getElementById(id);
    if (!el || !valor) return;
    el.value = valor;
    el.style.background = '#fffbdd'; // amarelo suave = extraído automaticamente
    el.title = 'Preenchido automaticamente — revisar';
  }

  setField('t_peso_altura', [dados.peso, dados.altura].filter(Boolean).join(' | '));
  setField('t_pa', dados.pa);
  setField('t_sono', dados.sono);
  setField('t_hidratacao', dados.hidratacao);
  setField('t_tabagismo', dados.tabagismo);
  setField('t_alcool', dados.alcool);
  setField('t_atividade', dados.atividadeFisica);
  setField('t_diurese', dados.diurese);
  setField('t_evacuacao', dados.evacuacao);

  if (dados.condicoesPessoais && dados.condicoesPessoais.length) {
    setField('t_condicoes', dados.condicoesPessoais.join(', '));
  }
  if (dados.antecedenteFamiliar && dados.antecedenteFamiliar.length) {
    setField('t_ant_familiar', dados.antecedenteFamiliar.join(', '));
  }
  if (dados.medicacoes && dados.medicacoes.length) {
    setField('t_medicacoes', dados.medicacoes.join(', '));
  }
  if (dados.alergias && dados.alergias.length) {
    setField('t_alergias', dados.alergias.join(', '));
  }

  // Contar campos preenchidos
  var total = Object.values(dados).filter(function(v) {
    return v && (typeof v === 'string' ? v.trim() : v.length > 0);
  }).length;

  return total;
}
