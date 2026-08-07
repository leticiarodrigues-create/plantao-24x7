# Copiloto 24x7 — Extensão Chrome

## Como instalar (modo desenvolvedor)

1. Abra o Chrome e acesse: `chrome://extensions`
2. Ative **"Modo do desenvolvedor"** (canto superior direito)
3. Clique em **"Carregar sem compactação"**
4. Selecione a pasta `copiloto-extensao`
5. O ícone do Copiloto aparece na barra do Chrome

## Como usar

- Em qualquer site (Zendesk, Gmail, Drive…), clique no ícone **Copiloto 24x7**
- O painel abre na lateral direita
- O plantão ativo persiste enquanto o Chrome estiver aberto

## Atualizar após mudanças no index.html

1. Acesse `chrome://extensions`
2. Clique no botão **🔄 atualizar** na extensão

## Estrutura da pasta

```
copiloto-extensao/
├── index.html       ← interface completa (não alterar)
├── manifest.json    ← configuração da extensão
├── background.js    ← abre o painel ao clicar no ícone
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Requisito

Chrome versão 114 ou superior (suporte a sidePanel API).
