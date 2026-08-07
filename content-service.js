// ══════════════════════════════════════════════════════════════
// CONTENT-SERVICE.JS — Serviço centralizado de conteúdo
// Etapa 1: carrega arquivos locais (content/)
// Etapa 2: carregará remotamente com fallback local
// ══════════════════════════════════════════════════════════════

var ContentService = (function() {

  // URL base — vazio na Etapa 1 (local), GitHub raw na Etapa 2
  var BASE_URL = '';  // ex: 'https://raw.githubusercontent.com/org/repo/main/'
  var CACHE_TTL = 3600000; // 1 hora em ms

  var _cache = {};
  var _loaded = false;
  var _content = {};

  // ── Carregamento local (Etapa 1) ──────────────────────────
  function _carregarLocal(arquivo, callback) {
    fetch(chrome.runtime.getURL('content/' + arquivo))
      .then(function(r) { return r.json(); })
      .then(function(data) { callback(null, data); })
      .catch(function(e) { callback(e.message || 'Erro ao carregar ' + arquivo); });
  }

  // ── Carregamento remoto com fallback local (Etapa 2) ──────
  // Substituir esta função quando BASE_URL estiver configurado
  function _carregarArquivo(arquivo, callback) {
    if (!BASE_URL) {
      _carregarLocal(arquivo, callback);
      return;
    }
    // Verificar cache
    var cached = _cache[arquivo];
    if (cached && (Date.now() - cached.ts) < CACHE_TTL) {
      callback(null, cached.data);
      return;
    }
    // Tentar remoto
    fetch(BASE_URL + 'content/' + arquivo)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        _cache[arquivo] = { data: data, ts: Date.now() };
        callback(null, data);
      })
      .catch(function() {
        // Fallback local se remoto falhar
        console.warn('[ContentService] Remoto indisponível — usando local:', arquivo);
        _carregarLocal(arquivo, callback);
      });
  }

  // ── Inicializar: carregar todos os arquivos ────────────────
  function init(onReady) {
    if (_loaded) { if (onReady) onReady(_content); return; }

    var arquivos = ['versao.json', 'links.json', 'telefones.json', 'fluxos.json', 'orientacoes.json', 'ciap.json'];
    var pendentes = arquivos.length;
    var erros = [];

    arquivos.forEach(function(arq) {
      _carregarArquivo(arq, function(err, data) {
        if (err) {
          erros.push(arq + ': ' + err);
        } else {
          var chave = arq.replace('.json', '');
          _content[chave] = data;
        }
        pendentes--;
        if (pendentes === 0) {
          _loaded = true;
          if (erros.length) console.warn('[ContentService] Erros ao carregar:', erros);
          console.log('[ContentService] Pronto. Versão:', (_content.versao && _content.versao.versao) || '?');
          if (onReady) onReady(_content);
        }
      });
    });
  }

  // ── API pública ────────────────────────────────────────────
  return {
    init: init,

    // Versão atual do conteúdo
    versao: function() {
      return (_content.versao && _content.versao.versao) || '1.0.0';
    },

    // Links organizados
    links: function() { return _content.links || {}; },

    // Link específico por categoria e chave
    getLink: function(categoria, chave) {
      var links = _content.links || {};
      return (links[categoria] && links[categoria][chave]) || null;
    },

    // Telefones de emergência
    telefones: function() { return _content.telefones || []; },

    // Fluxos operacionais
    fluxos: function() { return _content.fluxos || []; },

    // Regras de orientação para o extrator
    orientacoes: function() { return (_content.orientacoes && _content.orientacoes.regras) || []; },

    // Tabela CIAP
    ciap: function() { return _content.ciap || []; },

    // CIAPs aplicáveis dado um array de condições e tipo de atendimento
    ciapParaCondicoes: function(condicoes, tipo) {
      var tabela = _content.ciap || [];
      var resultado = [];
      // CIAP fixo por tipo de atendimento
      tabela.forEach(function(item) {
        if (item.condicao === 'eletiva' && (tipo === 'Eletiva' || tipo === 'Programa Pinguim')) {
          resultado.push(item.codigo + ' — ' + item.descricao);
        } else if (item.condicao === 'espontanea' && tipo === 'Espontânea') {
          resultado.push(item.codigo + ' — ' + item.descricao);
        }
      });
      // CIAP por condição detectada
      var condsLower = condicoes.map(function(c) { return c.toLowerCase(); });
      tabela.forEach(function(item) {
        if (!item.tags) return;
        var bate = item.tags.some(function(tag) {
          return condsLower.some(function(c) { return c.indexOf(tag.toLowerCase()) !== -1; });
        });
        if (bate) resultado.push(item.codigo + ' — ' + item.descricao);
      });
      return resultado.length ? resultado : ['(definir CIAP conforme queixa)'];
    },

    // Orientações aplicáveis dado dados do extrator
    orientacoesParaDados: function(dados) {
      var regras = (_content.orientacoes && _content.orientacoes.regras) || [];
      var resultado = [];
      regras.forEach(function(regra) {
        var campo = dados[regra.campo] || '';
        var bate = regra.tags.some(function(tag) {
          return campo.toLowerCase().indexOf(tag.toLowerCase()) !== -1;
        });
        if (bate) resultado.push(regra.texto);
      });
      if (resultado.length === 0) resultado.push('Orientações individualizadas conforme demanda da consulta — completar.');
      return resultado;
    },

    // Recarregar forçado (para atualizar conteúdo sem reinstalar)
    recarregar: function(onReady) {
      _loaded = false;
      _cache = {};
      _content = {};
      init(onReady);
    }
  };
})();
