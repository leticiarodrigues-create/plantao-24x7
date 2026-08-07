
// ══════════════════════════════════════════════════════════════
// LINKS_DOCS — mapeamento central de documentos oficiais
// Para atualizar um link: basta trocar aqui. Não alterar mais nada.
// ══════════════════════════════════════════════════════════════
const LINKS_DOCS = {
  // ── Protocolos clínicos ────────────────────────────────────
  saude_mental:         'https://docs.google.com/document/d/12MGiY30ua9ARF5O5M3IcWvIm1HOZHqxygKuoXkJTQ6g/edit',
  sindrome_gripal:      'https://docs.google.com/document/d/1R6PTWOsvHT7vIkgwYex5YtPhUz4wAfpJ7WK2gNlpU88/edit',
  trans:                'https://docs.google.com/document/d/1Jzii78VmeRAKYzoV155JLtB7oFKxk-cL3z4Jzba9iHQ/edit',
  checkup_adulto:       'https://docs.google.com/document/d/1r6idZTQo1Rk-J4geBHR9RrzOdYQV5tYcgYDQAxOw7iA/edit',
  checkup_menor18:      'https://docs.google.com/document/d/19GLKTqnDdTR1EKbqm3YRpcrqpl5Q_J9oBe_ejno2ALk/edit',
  pinguim_1tri:         'https://docs.google.com/document/d/1nYcrc8Qh83hpP7iARSMEmjp4Mb6piSYxF64PJFsFlrI/edit',
  pinguim_2tri:         'https://docs.google.com/document/d/16En9j30IqgVaT9xbLw0F1DoypT_CPgzVIIIW2TCy0s8/edit',
  pinguim_3tri:         'https://docs.google.com/document/d/1PtMUx8To2IiHy0BI0g8YRiAYO5TUffCZbpuYJxCsgRA/edit',
  pinguim_posparto:     'https://docs.google.com/document/d/1WzOTO5ilDWkAcqtTtDxpzUBhKmZ4k-_qlWR9xhNxUgQ/edit',
  busca_ativa:          'https://docs.google.com/document/d/1AZyHWeGVxrUhq9jWv7BNYpLIkIZHUN9mHwIoJ9cgG8I/edit',
  nova_variola:         'https://docs.google.com/document/d/1sadZ_LwrHjxppIlfx2hDBslk0mK7-2TkqWjKwSPKpW0/edit',
  // ── Manuais operacionais ───────────────────────────────────
  interconsulta:        'https://docs.google.com/document/d/1OuEIdcda8ilVjz4qO4_L4iwkLJzjREtYx0kZzgzL0WE/edit',
  manual_pinguim:       'https://docs.google.com/document/d/1EFNMl8B3GQSj1TqaTNweb2eLVy61jjIkNAGjGF65zZk/edit',
  manual_busca_ativa:   'https://docs.google.com/document/d/1PEDSZEAWzCFA8JWS8y_9vjS9Nkjl41CN9G0e2nzKgcQ/edit',
  desconto_isencao:     'https://docs.google.com/document/d/1Q8mGlzDaQA6yv_ADDO3WV81ukXz2nBL0WmCAJVbJYpQ/edit',
  renovacao_receita:    'https://docs.google.com/document/d/11LAv3qxOC34upPyaFhDSOwf7jME5uHQiWojw8qSjlOE/edit',
  // ── Materiais de apoio ─────────────────────────────────────
  plano_parto:          'https://docs.google.com/spreadsheets/d/1v9SUbL4J1-9OhF3Ks_E_FaKcHp0NU30jZTD7oUXtg2g/edit',
  mascaras_prontuario:  'https://docs.google.com/spreadsheets/d/1hL6i-UizBeWl0JJ7JfRdbKyFgpTJotQ4YAzzi9kII5U/edit',
  material_nilo:        'https://docs.google.com/document/d/1dnfS4a_Nm_MGZyBpNMbuMYIpGnmrAny02CpNF-dNDOg/edit',
  playbook_nilo:        'https://www.notion.so/piposaude/Playbook-Nilo-Sa-de-52e9905f4d44427eb21582bee4d69552',
  declaracao_atend:     'https://docs.google.com/document/d/1KnKVfQhYj6PgurHDOapXVacBtZLLXzksQMpu_J9knfc/edit',
  templates_droz:       'https://docs.google.com/document/d/1n8GotrQ1y_SnIBI2b3DXTz9LZvdRnXIjACKCS7JAvhQ/edit',
  meses_coloridos:      'https://docs.google.com/document/d/1J8ZTsEYZVy1MhLPewc3HuIicSrk0ypFyMlzRr7C9AVs/edit',
  niveis_complexidade:  'https://docs.google.com/document/d/1tpOALRcFz3e-a-9QWQSe-2J95YfJvQxJMOGEllGAMR8/edit',
};

const BASE = {
  protocolos: [
    {id:'febre',titulo:'Febre',cat:'clinico',tags:['febre','temperatura','febril'],
     resumo:'Avaliar tempo de evolução, temperatura e sintomas associados.',
     perguntas:['Quando começou? Qual a temperatura?','Há outros sintomas (tosse, manchas, dor)?','Tomou medicação?'],
     ori:(n,e)=>`${n}, entendo o desconforto — fico feliz que você nos acionou.\n\nEnquanto acompanho seu caso, algumas medidas que ajudam:\n• Hidratação constante ao longo do dia\n• Repouso — evite esforço físico\n• Para a febre: paracetamol 500mg ou dipirona 500mg a cada 6h\n\nFique atento: febre ≥39°C sem melhora, manchas no corpo ou dor de cabeça intensa → me avisa.`,
     dirs:[{t:'enf15',l:'Enf. 15min',m:'Febre isolada <72h'},{t:'med15',l:'Med. 15min',m:'Febre com sintomas / prescrição'}],
     alarmes:['Febre ≥39°C sem melhora → PS','Febre >72h → PS','Manchas + febre → suspeita dengue → PS']},

    {id:'dengue',titulo:'Dengue (suspeita)',cat:'clinico',tags:['dengue','manchas','dor no corpo','dor atrás dos olhos','corpo doendo'],
     drive:null,
     resumo:'Tríade: febre + dor no corpo + dor atrás dos olhos. NUNCA ibuprofeno ou aspirina.',
     perguntas:['Tem febre? Há quanto tempo?','Manchas vermelhas no corpo?','Dor atrás dos olhos?','Tontura ou fraqueza?'],
     ori:(n,e)=>`${n}, fico feliz que você nos acionou — os sintomas que você descreveu precisam de atenção especial e vou acompanhar de perto.\n\nOs sintomas precisam de atenção.\n\n• Hidratação é FUNDAMENTAL — 1 copo de líquido a cada hora\n• Repouso absoluto\n• APENAS paracetamol ou dipirona\n• NUNCA ibuprofeno, aspirina ou diclofenaco\n\nPS imediato se: manchas + febre >72h, tontura intensa, dor forte na barriga, vômitos frequentes, sangramento.`,
     dirs:[{t:'enf15',l:'Enf. 15min',m:'<72h sem sinais de alarme'},{t:'med15',l:'Med. 15min',m:'Confirmação / atestado'}],
     alarmes:['Febre >72h → PS','Sangramento → PS','Tontura intensa + dengue → PS'],
     drive:LINKS_DOCS.sindrome_gripal,urg:true},

    {id:'vomito',titulo:'Vômitos / Náusea',cat:'clinico',tags:['vomito','vômito','nausea','náusea','enjoo'],
     resumo:'Avaliar febre, dor abdominal e capacidade de hidratação.',
     perguntas:['Tem febre?','Dor na barriga de 0 a 10?','Consegue beber líquidos?'],
     ori:(n,e)=>`${n}, entendo que estar assim é muito difícil. Vou te ajudar agora.\n\n• Pequenos goles frequentes — água ou soro oral\n• Evite alimentos gordurosos e crus\n• Prefira arroz, banana, batata cozida\n• Repouso\n\nSe febre, dor forte na barriga ou não conseguir beber → PS.`,
     dirs:[{t:'enf15',l:'Enf. 15min',m:'Leve, sem febre, consegue beber'},{t:'med15',l:'Med. 15min',m:'Atestado ou piora'}],
     alarmes:['Não consegue beber → PS','Febre + vômito → PS','<1 ano ou >60 anos → PS']},

    {id:'diarreia',titulo:'Diarreia',cat:'clinico',tags:['diarreia','fezes','evacuação'],
     drive:LINKS_DOCS.sindrome_gripal,
     resumo:'Avaliar hidratação, sangue nas fezes e febre.',
     perguntas:['Tem febre?','Sangue ou muco nas fezes?','Tontura ou fraqueza?','Quantas evacuações ao dia?'],
     ori:(n,e)=>`${n}, vamos resolver isso. Medidas importantes agora:\n\n• Hidratação constante — água, soro oral, água de coco\n• Alimentos leves: arroz, banana, maçã, batata\n• Evite leite e gorduras\n• Repouso\n\nFique atento: febre, sangue nas fezes, tontura → PS.`,
     dirs:[{t:'enf15',l:'Enf. 15min',m:'Leve, sem febre'},{t:'med15',l:'Med. 15min',m:'Moderado ou atestado'}],
     alarmes:['Febre + diarreia → PS','Sangue nas fezes → PS','Desidratação → PS']},

    {id:'dorcabeca',titulo:'Dor de cabeça',cat:'clinico',tags:['dor de cabeça','cefaleia','enxaqueca'],
     drive:LINKS_DOCS.sindrome_gripal,
     resumo:'Avaliar intensidade, febre e sinais neurológicos.',
     perguntas:['Intensidade de 0 a 10?','Tem febre?','Alteração visual ou tontura?'],
     ori:(n,e)=>`${n}, vamos aliviar isso juntos. Medidas que costumam ajudar:\n\n• Repouso em local calmo e escuro\n• Hidratação\n• Paracetamol 500mg ou dipirona se necessário\n• Evite telas e luz forte\n\nSe dor 8-10, febre ou alteração visual → PS.`,
     dirs:[{t:'med15',l:'Med. 15min',m:'Pode precisar de prescrição'}],
     alarmes:['Dor 8-10 → PS','Febre + cefaleia intensa → PS','Rigidez de nuca → PS urgente']},

    {id:'dorcostas',titulo:'Dor nas costas / lombar',cat:'clinico',tags:['costas','lombar','coluna','dor nas costas'],
     drive:null,
     resumo:'Avaliar trauma, irradiação para pernas, febre e fatores de risco.',
     perguntas:['Intensidade de 0 a 10?','Após esforço ou trauma?','Irradia para pernas?','Tem febre?'],
     ori:(n,e)=>`${n}, entendo o quanto a dor nas costas limita o dia a dia. Vou te orientar para aliviar agora.\n\n• Repouso — evite esforços\n• Compressas quentes no local\n• Posição de alívio: deitado de lado com joelhos dobrados\n• Se tomou dipirona há menos de 6h, aguarde o intervalo\n\nFique atento: irradiação para pernas com formigamento, febre, trauma → avaliação presencial.`,
     dirs:[{t:'enf15',l:'Enf. 15min',m:'Aguda <7 dias sem trauma'},{t:'enf30',l:'Enf. 30min',m:'Crônica ou eletiva'},{t:'med15',l:'Med. 15min',m:'Atestado ou prescrição'}],
     alarmes:['Irradiação + formigamento → PS','Febre + lombar → PS (pielonefrite?)','Perda de força nas pernas → PS urgente','HIV sem TARV + lombar → PS hoje']},

    {id:'itu',titulo:'Infecção urinária (ITU)',cat:'clinico',tags:['itu','infecção urinaria','ardencia','xixi dor','urinar'],
     drive:null,
     resumo:'ITU não complicada vai direto para médico — precisa de antibiótico.',
     perguntas:['Tem febre?','Dor lombar?','Sangue na urina?'],
     ori:(n,e)=>`${n}, entendo o desconforto — esse tipo de situação não pode esperar. Vou encaminhar você para avaliação médica agora, porque ITU precisa de antibiótico.\n\nEnquanto aguarda:\n• Beba bastante água\n• Evite segurar a urina`,
     dirs:[{t:'med15',l:'Med. 15min',m:'ITU precisa de antibiótico'}],
     alarmes:['Febre + ITU → PS (pielonefrite)','Dor lombar + ITU → PS','Sangue na urina → PS']},

    {id:'ansiedade',titulo:'Ansiedade / Crise de pânico',cat:'clinico',tags:['ansiedade','pânico','crise ansiedade','ansioso'],
     drive:null,
     drive:LINKS_DOCS.saude_mental,
     resumo:'Acolher primeiro. Verificar falta de ar. Nunca deixar sozinho em crise.',
     perguntas:['Está em crise agora?','Tem falta de ar?','Alguém com você?'],
     ori:(n,e)=>`${n}, estou aqui com você. Respira — você está seguro(a) e não está sozinho(a).\n\nRespire comigo: inspire pelo nariz 4 tempos → segure 4 → solte pela boca 4. Repita.\n\nVou encaminhar para teleconsulta agora.`,
     dirs:[{t:'enf30',l:'Enf. 30min',m:'Acolhimento + direcionamento'}],
     alarmes:['Falta de ar intensa → PS','Pensamentos de se machucar → CVV 188 + acionar chefia']},

    {id:'sm',titulo:'Saúde mental / Depressão',cat:'clinico',tags:['depressão','triste','saúde mental','chorando'],
     resumo:'Acolher com cuidado. Sempre perguntar sobre pensamentos de se machucar.',
     perguntas:['O que está sentindo?','Faz acompanhamento?','Pensamentos de se machucar?'],
     ori:(n,e)=>`${n}, fico muito feliz que você nos acionou. Pedir ajuda é um ato enorme de coragem — você fez certo.\n\nVou encaminhar para teleconsulta agora. Estamos aqui por você.`,
     dirs:[{t:'enf30',l:'Enf. 30min',m:'Acolhimento + rede psiquiatra'}],
     alarmes:['Ideação suicida → PS psiquiátrico + CVV 188 + acionar chefia AGORA']},

    {id:'ideacao',titulo:'Ideação suicida',cat:'clinico',tags:['suicídio','me machucar','quero morrer','não quero mais viver'],
     drive:LINKS_DOCS.saude_mental,
     resumo:'URGENTE. Não deixar sozinho. Acionar chefia imediatamente.',urg:true,
     perguntas:['Está pensando agora?','Está planejando algo?','Está sozinho(a)?'],
     ori:(n,e)=>`${n}, aqui é a enfermeira ${e} da Pipo.\n\nEstou aqui com você. Isso é sério e você merece cuidado agora.\n\nLigue para o CVV: 188 — disponível 24h. Não vai embora ainda.`,
     dirs:[],
     alarmes:['ACIONAR CHEFIA AGORA','PS PSIQUIÁTRICO','CVV: 188']},

    {id:'intox',titulo:'Intoxicação',cat:'clinico',tags:['intoxicação','remédio errado','veneno','produto de limpeza'],
     drive:LINKS_DOCS.saude_mental,
     resumo:'URGENTE. CIATox 0800 722 6001 + PS imediato.',urg:true,
     perguntas:['O que foi ingerido?','Quanto? Há quanto tempo?','Sintomas agora?'],
     ori:(n,e)=>`${n}, aqui é a enfermeira ${e} da Pipo.\n\nPS AGORA. Ligue: CIATox 0800 722 6001 (24h gratuito) e vá ao PS. Guarde a embalagem.`,
     dirs:[],
     alarmes:['LIGAR CIATOX: 0800 722 6001','PS IMEDIATO']},

    {id:'animal',titulo:'Animal peçonhento',cat:'clinico',tags:['cobra','aranha','escorpião','picada','animal peçonhento'],
     drive:null,
     resumo:'URGENTE. PS imediato para soro antiveneno. NÃO fazer torniquete.',urg:true,
     perguntas:['Qual animal?','Onde foi picado?','Há quanto tempo?','Sintomas?'],
     ori:(n,e)=>`${n}, aqui é a enfermeira ${e} da Pipo.\n\nPS IMEDIATO — precisa de soro antiveneno.\n\n• Mantenha a área abaixo do coração\n• NÃO faça torniquete, corte ou sucção\n• CIATox: 0800 722 6001`,
     dirs:[],
     alarmes:['PS IMEDIATO','NÃO torniquete ou corte','CIATox: 0800 722 6001']},

    {id:'receita',titulo:'Renovação de receita',cat:'operacional',tags:['receita','renovar','remédio acabou'],
     drive:null,
     resumo:'Verificar qual medicamento e se tem receita anterior.',
     perguntas:['Qual medicamento precisa renovar?','Há quanto tempo usa esse medicamento?','Tem a receita anterior em mãos?','Está com algum sintoma agora?'],
     ori:(n,e)=>`Entendido. Vou encaminhar para teleconsulta médica para renovação da receita.\\n\\nPara agilizar, tenha em mãos:\\n• A receita anterior (se tiver)\\n• Nome completo do medicamento e dosagem\\n\\nO médico vai avaliar e emitir a nova prescrição. Link abaixo.`,
     dirs:[{t:'med15',l:'Med. 15min',m:'Renovação de receita'}],
     alarmes:[]},

    {id:'atestado',titulo:'Atestado médico',cat:'operacional',tags:['atestado','afastamento','declaração'],
     drive:LINKS_DOCS.renovacao_receita,
     resumo:'Encaminhar direto para médico.',
     perguntas:['Você está com algum sintoma agora?','Qual o motivo do afastamento?','Quando começou?','Quantos dias de afastamento precisa?'],
     ori:(n,e)=>`Com base no que você me contou, vou encaminhar para uma teleconsulta médica agora.\\n\\nO médico vai avaliar sua situação e, se indicado, emitir o atestado com o período adequado.\\n\\nEstou enviando o link abaixo. Qualquer dúvida, estou aqui.`,
     dirs:[{t:'med15',l:'Med. 15min',m:'Atestado médico'}],
     alarmes:[]},

    {id:'bloqueio',titulo:'Bloqueio / cobertura de plano',cat:'operacional',tags:['bloqueio','plano bloqueado','carteirinha','cobertura'],
     drive:LINKS_DOCS.declaracao_atend,
     resumo:'Verificar no Backoffice. Urgência clínica muda completamente a conduta.',
     perguntas:['Qual o plano?','Tem urgência clínica agora?'],
     ori:(n,e)=>`Entendi sua situação. Vou verificar junto ao Backoffice o que está acontecendo com seu plano.\\n\\nAlgumas causas comuns: mensalidade em atraso, dados cadastrais desatualizados, contrato em análise.\\n\\nEnquanto verifico, se você tiver urgência clínica agora, vá ao PS — o hospital é obrigado a atender e resolvemos o plano em paralelo.`,
     dirs:[],
     alarmes:['Bloqueio + urgência clínica → PS + acionar chefia','Internação negada urgente → acionar chefia AGORA']},

    {id:'rede_consulta',titulo:'Busca de rede — consultas e terapias',cat:'operacional',tags:['rede','médico','terapeuta','especialista','credenciado','consulta','psicólogo','endocrinologista','hospital','clínica','clinica','conveniado','aceita meu plano','aceitar meu plano','plano aceita','qual hospital','qual médico','encontrar médico','procurar médico','indicar médico'],
     drive:null,
     resumo:'Top 1 motivo de atendimento (58,6% dos tickets). Confirmar operadora, especialidade e região antes de buscar.',
     perguntas:['Qual é a sua operadora?','Qual especialidade ou tipo de atendimento precisa?','Em qual cidade ou bairro?','É urgente ou pode ser eletivo?'],
     ori:(n,e)=>`Ótimo! Com essas informações vou buscar para você.\\n\\nVocê pode verificar a rede credenciada diretamente pelo app ou site da sua operadora — fica mais rápido.\\n\\nSe precisar de ajuda para navegar no sistema, me conta e busco junto com você.`,
     dirs:[],
     templates:['encontrou','naoEncontrou'],
     alarmes:['Se urgência clínica → não esperar busca de rede, orientar PS']},

    {id:'rede_exame',titulo:'Busca de rede — exames e laboratórios',cat:'operacional',tags:['exame','laboratório','lab','exame de sangue','ressonância','tomografia','ultrassom'],
     drive:null,
     resumo:'Confirmar operadora, tipo de exame e região. Exames especializados têm rede mais restrita.',
     perguntas:['Qual operadora?','Qual exame foi solicitado?','Qual região?','Tem pedido médico em mãos?'],
     ori:(n,e)=>`${n}, vou te ajudar a encontrar um laboratório credenciado. Preciso de duas informações:\\n\\n→ Qual é a sua operadora?\\n→ Qual exame e em qual cidade?\n\nVou buscar laboratórios credenciados para você. Pode me confirmar sua operadora e o tipo de exame?`,
     dirs:[],
     alarmes:['Exames de alto custo (PET-scan, RNM) podem precisar de autorização prévia — verificar']},

    {id:'autorizacao',titulo:'Autorização de procedimento',cat:'operacional',tags:['autorização','guia','cirurgia','procedimento','aprovar','negar'],
     drive:null,
     resumo:'Alta complexidade. Coletar dados antes de contatar operadora. Urgências: acionar médico do time.',
     perguntas:['Qual procedimento será realizado?','Em qual hospital/clínica?','Já tem data agendada?','Já existe guia em análise no app da operadora?'],
     ori:(n,e)=>`Para que eu possa verificar junto à operadora, preciso de algumas informações:\n\n👉 Nome do procedimento\n👉 Nome do prestador\n👉 Número da guia de autorização (se tiver)\n👉 Print do app do plano com status (se tiver)\n\nAguardo para continuar!`,
     dirs:[],
     alarmes:['Urgência: acionar médico do time imediatamente','Por lei, hospital não pode negar em emergência — operadora tem 8h para autorizar','Guia negada: acionar time de saúde, orientar NIP na ANS']},

    {id:'reembolso',titulo:'Reembolso',cat:'operacional',tags:['reembolso','fora da rede','particular','ressarcimento'],
     drive:null,
     resumo:'Membro usou prestador fora da rede e quer ressarcimento. Verificar se o plano tem cobertura por reembolso.',
     perguntas:['Qual operadora e plano?','Qual procedimento/consulta foi realizado?','Tem nota fiscal e recibo?'],
     ori:(n,e)=>`Entendi. Para solicitar o reembolso, você vai precisar de:\\n\\n• Nota fiscal ou recibo do atendimento\\n• Prontuário ou relatório médico\\n• Pedido médico (se for exame)\\n• Formulário de reembolso da operadora (disponível no app ou site)\\n\\nO prazo de análise é de 30 dias. Vou te indicar onde enviar.`,
     dirs:[],
     alarmes:['Nem todos os planos têm reembolso — verificar tipo do plano no Backoffice antes de orientar']},

    {id:'cobertura',titulo:'Dúvida de cobertura',cat:'operacional',tags:['cobertura','cobre','plano cobre','procedimento coberto','carência'],
     drive:null,
     resumo:'Verificar se o plano cobre determinado procedimento, consulta ou terapia.',
     perguntas:['Qual operadora e plano?','Qual procedimento ou consulta quer verificar?','Já tem pedido médico?'],
     ori:(n,e)=>`${n}, vou verificar a cobertura do seu plano para isso. Pode me confirmar sua operadora e o que precisa cobrir?\n\nVou verificar a cobertura do seu plano para isso. Pode me confirmar sua operadora e o que precisa cobrir?`,
     dirs:[],
     alarmes:['Carência: para urgências máximo 24h por lei. Para procedimentos eletivos verificar contrato.','Rol ANS: procedimentos no rol não podem ser negados pela operadora']},

        {id:'internacao',titulo:'Internação / autorização',cat:'operacional',tags:['internação','cirurgia','autorização','leito'],
     drive:null,
     resumo:'Ligar para o paciente primeiro. Verificar se é eletiva ou urgente.',
     perguntas:['Onde está agora (hospital, casa, UPA)?','Está estável clinicamente?','A cirurgia é urgente ou eletiva?','O plano já formalizou a negativa?','Tem código TUSS ou número da guia?'],
     ori:(n,e)=>`${n}, entendo o quanto essa situação é angustiante — você não está sozinho(a). Estou verificando agora e te retorno em instantes.`,
     dirs:[],
     alarmes:['Cirurgia urgente negada → acionar chefia AGORA','Nunca decidir sobre internação só com info do RH']}
  ],
     drive:null,

  cofen: [
    {nome:'Paracetamol 500mg',ind:'Febre e dor leve',dose:'500mg a cada 6h',nivel:'v'},
    {nome:'Dipirona 500mg',ind:'Febre e dor',dose:'500mg a cada 6h',nivel:'v',obs:'Evitar em dengue'},
    {nome:'Ibuprofeno 400mg',ind:'Dor e inflamação',dose:'400mg a cada 8h',nivel:'a',obs:'NUNCA em dengue ou gestação'},
    {nome:'Escopolamina 10mg',ind:'Cólica abdominal / dismenorreia',dose:'10mg a cada 8h',nivel:'v'},
    {nome:'Metoclopramida 10mg',ind:'Vômito e náusea',dose:'10mg a cada 8h',nivel:'v'},
    {nome:'Soro de reidratação oral',ind:'Desidratação leve',dose:'200ml após cada evacuação',nivel:'v'},
    {nome:'Loratadina 10mg',ind:'Rinite e urticária leve',dose:'10mg 1x ao dia',nivel:'v'},
    {nome:'Cetirizina 10mg',ind:'Rinite e urticária',dose:'10mg 1x ao dia',nivel:'v'},
    {nome:'Nitrofurantoína 100mg',ind:'ITU — 1ª linha',dose:'100mg a cada 6h por 7 dias',nivel:'r',obs:'Encaminhar para médico'},
    {nome:'Sulfametoxazol+Trimetoprim',ind:'ITU — 1ª linha',dose:'800+160mg a cada 12h por 3 dias',nivel:'r',obs:'Encaminhar para médico'},
    {nome:'Fluconazol 150mg',ind:'Candidíase vaginal',dose:'Dose única 150mg',nivel:'r',obs:'Confirmar diagnóstico com médico'},
    {nome:'Diclofenaco 50mg',ind:'Dor e dismenorreia',dose:'50mg a cada 8h com alimento',nivel:'a',obs:'NUNCA em dengue'},
    {nome:'Ondansetrona 4mg',ind:'Vômito persistente',dose:'4mg a cada 8h',nivel:'a'}
  ],

  operadoras: [
    { nome:'SulAmérica', rede:'https://portal.sulamericaseguros.com.br/home.htm', tele:true,
      tele_desc:'App SulAmérica → Menu Telemedicina → Pronto Atendimento 24h',
      tels:[
        {l:'Central (cap)',     n:'4004-5900'},
        {l:'Central (0800)',    n:'0800-970-0500'},
        {l:'SAC',               n:'0800-722-0303'}
      ]},
    { nome:'Bradesco Saúde', rede:'https://www.bradescoseguros.com.br/clientes/produtos/plano-saude/consulta-de-rede-referenciada', tele:true,
      tele_desc:'App Saúde Digital Bradesco → Teleconsulta 24h',
      tels:[
        {l:'Central (cap)',     n:'4004-2700'},
        {l:'Central (0800)',    n:'0800-701-2700'},
        {l:'SAC',               n:'0800-722-0110'}
      ]},
    { nome:'Amil', rede:'https://www.amil.com.br/portal/web/servicos/saude/rede-credenciada/amil/busca-avancada', tele:true,
      tele_desc:'App Amil Clientes → Telemedicina Amil 24h',
      tels:[
        {l:'Central (cap)',     n:'3004-1000'},
        {l:'Central (0800)',    n:'0800-706-2363'}
      ]},
    { nome:'Seguros Unimed', rede:'https://www.unimed.coop.br/web/guest/atendimento/rede-credenciada', tele:true,
      tele_desc:'Super App Seguros Unimed → Telemedicina 24h',
      tels:[
        {l:'Central',           n:'0800-722-4848'}
      ]},
    { nome:'Hapvida / NDI', rede:'https://www.hapvida.com.br/pls/webhap/webnewredecredenciada.selecionarede', tele:false,
      tels:[
        {l:'Central',           n:'0800-280-9130'},
        {l:'Autorização',       n:'0800-280-9110'}
      ]},
    { nome:'Care Plus', rede:'https://www8.careplus.com.br/portal/portal/modulos/rede/pesquisaRedeCP.aspx', tele:false,
      tels:[
        {l:'Central',           n:'0800-013-2992'}
      ]},
    { nome:'Porto Seguro Saúde', rede:'https://www.portoseguro.com.br/porto-seguro-saude/rede-referenciada', tele:false,
      tels:[
        {l:'Central',           n:'0800-722-4090'},
        {l:'Emergências',       n:'0800-726-4090'}
      ]},
    { nome:'Omint', rede:'https://www.omint.com.br/atendimento/rede-credenciada', tele:false,
      tels:[
        {l:'Central',           n:'0800-772-2282'}
      ]},
    { nome:'Cassi (Banco do Brasil)', rede:'https://www.cassi.com.br/beneficiarios/rede-credenciada/', tele:false,
      tels:[
        {l:'Central',           n:'0800-722-2774'}
      ]},
    { nome:'Mediservice / Junto', rede:'https://www.mediservice.com.br/credenciado/', tele:false,
      tels:[
        {l:'Central',           n:'0800-014-4040'}
      ]},
    { nome:'Prevent Senior', rede:'https://www.preventsenior.com.br/para-voce/rede-credenciada/', tele:false,
      tels:[
        {l:'Central',           n:'0800-744-2755'}
      ]},
    { nome:'Golden Cross', rede:'https://www.goldencross.com.br/rede-credenciada/', tele:false,
      tels:[
        {l:'Central',           n:'0800-021-4001'}
      ]},
    { nome:'Sompo Saúde', rede:'https://www.somposeguros.com.br/rede-credenciada', tele:false,
      tels:[
        {l:'Central',           n:'0800-771-4200'}
      ]},
    { nome:'Allianz Saúde', rede:'https://portalcredenciado.allianz.com.br/portal/', tele:false,
      tels:[
        {l:'Central',           n:'0800-723-1300'}
      ]}
  ],

  telefones: [
    {nome:'CEATOX',num:'0800-0148110',desc:'Intoxicação por medicamento não prescrito pela Pipo'},
    {nome:'CIATox Nacional',num:'0800 722 6001',desc:'Intoxicação e animais peçonhentos — 24h — qualquer estado'},
    {nome:'CVV',num:'188',desc:'Crise de saúde mental / ideação suicida'},
    {nome:'ABRAMGE',link:'https://atendimentoabramge.com.br/#/home/service-locations',desc:'Rede nacional de emergência'}
  ],

  fluxos: [
    {nome:'Como o membro aciona',desc:'Membro envia "pipourgencia" no WhatsApp do Pipo Cuida → bot coleta contexto → Squadcast aciona o enfermeiro.'},
    {nome:'Squadcast',desc:'Na ligação: digitar 1. No app: clicar Acknowledged. Link do ticket aparece → abrir no Zendesk → atender → marcar resolvido.'},
    {nome:'Registro no Nilo',desc:'Todo atendimento clínico → registrar no Nilo. Tópico: Atendimento 24x7. Primeira pessoa. Caso administrativo → só no Zendesk.'},
    {nome:'Acionar chefia',desc:'WhatsApp → aguardar 10min → ligar → sem resposta → WhatsApp de urgência.'},
    {nome:'WhatsApp de urgência — quando usar',desc:'Bloqueio urgente, internação travada, médico não responde em 10min. NÃO usar para casos rotineiros.'},
    {nome:'Passagem de plantão',desc:'Revisar todos os tickets abertos, sinalizar para colega e Aline os acionamentos do Squadcast.'}
  ],


  redeCredenciada: {
    overview: 'Rede Credenciada é o Top 1 motivo de atendimento — 58,6% de todos os tickets. O membro quer encontrar prestadores que aceitam o plano sem pagar do bolso.',
    especialidades: ['Exames/Labs','Psicologia','Endocrinologia','Psiquiatria','Dermatologia','Ginecologia','Oftalmologia','Nutrição','Fisioterapia'],
    fluxo: [
      'Confirmar: operadora, nome do plano, especialidade, região, presencial ou online?',
      'Buscar no site da operadora filtrando por especialidade e região',
      'Se encontrar: enviar nome, endereço, telefone e orientar agendamento',
      'Se NÃO encontrar: verificar se tem reembolso, sugerir teleconsulta, escalar para médico do time se complexo'
    ],
    templates: {
      encontrou: `Olá, [NOME]!\n\nEncontrei algumas opções de [ESPECIALIDADE] na rede [OPERADORA] para a sua região:\n\n- [Prestador 1] | [Endereço] | Tel: [telefone]\n- [Prestador 2] | [Endereço] | Tel: [telefone]\n\nPara agendar, basta entrar em contato com o prestador e informar o número da sua carteirinha.\n\nQualquer dúvida, estamos aqui!\nTime Pipo Cuida`,
      naoEncontrou: `Olá, [NOME]!\n\nRealizei a busca na rede [OPERADORA] para [ESPECIALIDADE] na sua região e infelizmente a disponibilidade está limitada.\n\nAlgumas alternativas:\n1. Atendimento online: seu plano cobre teleconsultas para essa especialidade\n2. Regiões próximas: posso buscar em cidades vizinhas\n\nMe conta qual faz mais sentido!\nTime Pipo Cuida`,
      ps: `Olá, [NOME]! Espero que esteja bem.\n\nSegue indicação de Pronto Socorro credenciado na rede [OPERADORA]:\n\n- [Hospital] | [Endereço] | Tel: [telefone] | 24 horas\n\nAo chegar, apresente sua carteirinha.\n\nImportante: em emergências, os hospitais são obrigados a atender independente do plano. Se piorar no caminho, ligue 192 (SAMU).\n\nTime Pipo Cuida`
    },
    glossario: {
      'Rede credenciada': 'Prestadores com contrato ativo com a operadora. Usar a rede evita pagamento do bolso.',
      'Coparticipação': 'Valor que o beneficiário paga a cada uso do plano, mesmo na rede. Varia conforme o plano.',
      'Reembolso': 'Quando o membro usa prestador fora da rede e solicita ressarcimento. Geralmente parcial.',
      'Carência': 'Período após adesão em que algumas coberturas não estão disponíveis. Para urgências: máximo 24h por lei.',
      'Titular/Dependente': 'Titular é o funcionário. Dependente é quem ele incluiu (cônjuge, filhos). Mesma rede.',
      'GC (Gestão de Caso)': 'Acompanhamento próximo de membros com condições crônicas. Tickets GC são gerados proativamente.'
    }
  },

  autorizacao: {
    overview: 'Autorização de Procedimento: 1,5% dos tickets mas alta complexidade. Envolve cirurgias, exames de alto custo e situações urgentes.',
    tipos: ['Autorização de cirurgia','Autorização de exames (RNM, biópsia, etc.)','Cobertura odontológica','Cobertura de procedimentos diversos'],
    prazosANS: {
      'Consultas e exames simples': '7 dias úteis',
      'Cirurgias eletivas': '21 dias úteis',
      'Urgência / emergência': '8 horas'
    },
    coleta: 'Qual cirurgia/exame? Em qual hospital/clínica? Já tem data? Já tem guia em análise no app?',
    statusGuia: {
      'Não recepcionada': 'Guia não localizada. Orientar membro a contatar médico/hospital para verificar envio.',
      'Em andamento': 'Em análise dentro do prazo. Eletiva: até 21 dias úteis. Não há como priorizar salvo emergência.',
      'Pendente': 'Documentação pendente (laudo, relatório). Orientar contato com médico/hospital para envio urgente.',
      'Aprovada parcialmente': 'Alguns itens aprovados. Orientar contato com hospital para verificar se pode prosseguir.',
      'Aprovada': 'Aprovação integral. Orientar contato com hospital para verificar detalhes.',
      'Negada': 'Negativa total. Acionar time de saúde, orientar contato com hospital, verificar NIP/ouvidoria.'
    },
    urgencia: 'Em emergências: acionar médico do time imediatamente. Por lei, hospital não pode negar. Operadora tem 8h para autorizar.',
    templates: {
      acolhimento: `Para que eu possa verificar junto à operadora sobre o processo de autorização, preciso de algumas informações:\n\n👉 Nome do procedimento\n👉 Nome do prestador (local do procedimento)\n👉 Número do protocolo ou guia de autorização (se tiver)\n👉 Print do app do plano com status do pedido (se tiver)\n\nAguardo para dar continuidade!`,
      urgencia: `Olá, [NOME]! Recebi sua mensagem e estou tratando com prioridade máxima.\n\nJá estou verificando junto à [OPERADORA] para resolver isso o mais rápido possível. Te retorno em instantes.\n\nImportante: em caso de emergência, o hospital é obrigado a atender mesmo sem autorização prévia. Não espere a autorização se a situação for grave.\n\nTime Pipo Cuida`
    },
    glossario: {
      'Código TUSS': 'Código numérico que identifica cada procedimento. A operadora usa para processar a autorização.',
      'Guia de autorização': 'Documento enviado pelo hospital/clínica à operadora solicitando aprovação.',
      'ANS': 'Agência Nacional de Saúde Suplementar. Define prazos máximos e rol de procedimentos obrigatórios.',
      'Rol de procedimentos': 'Lista de procedimentos que todos os planos são obrigados a cobrir.',
      'NIP': 'Notificação de Intermediação Preliminar. Canal da ANS para reclamações contra operadoras.',
      'OPME': 'Órteses, Próteses e Materiais Especiais. Frequentemente têm autorização separada do procedimento.'
    }
  },

  pipoCuida: {
    overview: 'Popo Cuida é a plataforma exclusiva para membros. Acessível por celular ou computador em membro.piposaude.com.br. Disponível 24h para urgências, segunda a sexta 9h-18h para demais assuntos.',
    funcionalidades: [
      'Time de Saúde: enfermeiros e médicos disponíveis 24/7 para urgências',
      'Guias de Saúde: apoio em dúvidas sobre benefícios (horário comercial)',
      'Rede credenciada: busca de prestadores',
      'Telemedicina: teleconsultas por vídeo',
      'Reembolso: orientação e acompanhamento',
      'Coberturas: informações sobre o que o plano cobre',
      'Acesso ao app/site da operadora: orientações de cadastro'
    ],
    acesso: 'membro.piposaude.com.br ou app Pipo Cuida. Autenticação via CPF + confirmação por e-mail/SMS para dados sensíveis.',
    fluxoUrgencia: 'Membro envia "pipourgencia" no WhatsApp → bot coleta contexto → Squadcast aciona o enfermeiro de plantão',
    obs: 'Plataforma disponível apenas para titulares. Dependentes ainda não têm acesso direto.'
  },

  reembolso: {
    overview: 'Reembolso é quando o membro usa prestador fora da rede e solicita ressarcimento à operadora. Geralmente parcial, sujeito à tabela da operadora.',
    quando: 'Membro usou prestador fora da rede (particular ou não credenciado) e quer ser ressarcido.',
    como: [
      'Verificar se o plano do membro tem cobertura por reembolso',
      'Orientar a guardar todas as notas fiscais e recibos',
      'Solicitar à operadora via app, site ou telefone',
      'Prazo de ressarcimento varia por operadora — geralmente 30 dias'
    ],
    obs: 'Nem todos os planos têm reembolso. Verificar o tipo do plano no Backoffice antes de orientar.'
  },

  operadorasDetalhes: {
    SulAmérica: { tel_cap:'4004-5900', tel_out:'0800-970-0500', rede:'sulamericasaude.com.br', tele:'App SulAmérica Saúde → Telemedicina → Pronto Atendimento por Vídeo', tickets_ano:146 },
    Bradesco: { tel_cap:'4004-2700', tel_out:'0800-701-2700', rede:'bradescosaude.com.br', tele:'App Saúde Digital Bradesco → consulta imediata ou agendada', tickets_ano:133 },
    Amil: { tel_cap:'3004-1000', tel_out:'0800-706-2363', rede:'amil.com.br', tele:'App Amil Clientes → Telemedicina Amil → Pronto Atendimento', tickets_ano:60 },
    'Unimed Sorocaba': { tel_cap:'15 3229-1500', tel_out:'0800-771-0500', wpp:'(15) 99772-2423', rede:'unimedsorocaba.coop.br', tickets_ano:33 },
    'Seguros Unimed': { tel_out:'0800-016-6633', rede:'segurosunimed.com.br', tele:'Super App Seguros Unimed → Telemedicina → Pronto Atendimento 24h', tickets_ano:25 },
    'GNDI / Intermédica': { tel_cap:'11 4090-1750', rede:'gndi.com.br', tickets_ano:21 },
    'Unimed Nacional': { tel_out:'0800-942-0011', rede:'unimed.coop.br', tickets_ano:17 },
    'Care Plus': { tel_out:'0800-013-2992', rede:'careplus.com.br', tickets_ano:0 },
    Hapvida: { tel_out:'0800-280-9130', rede:'hapvida.com.br', tickets_ano:0 },
    Omint: { tel_out:'0800-726-4000', wpp:'(11) 99935-1140', rede:'omint.com.br', tickets_ano:0 }
  },

  sugestoes: {
    febre:      [ {ic:'💧', txt:'Orientar hidratação — pelo menos 2L ao dia'}, {ic:'🌡', txt:'Perguntar temperatura exata'}, {ic:'⚠', txt:'Checar sinais de alarme: manchas, dor abdominal, sangramento'} ],
    dengue:     [ {ic:'💧', txt:'Hidratação é prioridade absoluta — 1 copo por hora'}, {ic:'🚫', txt:'NUNCA ibuprofeno, aspirina ou diclofenaco'}, {ic:'⚠', txt:'Perguntar sobre sinais de alarme: tontura, dor abdominal intensa, sangramento'} ],
    vomito:     [ {ic:'💧', txt:'Avaliar capacidade de hidratação — consegue beber?'}, {ic:'🌡', txt:'Checar se há febre associada'}, {ic:'👶', txt:'Atenção redobrada: crianças <1 ano e idosos >60 anos → PS'} ],
    diarreia:   [ {ic:'💧', txt:'Hidratação com soro oral ou água de coco'}, {ic:'🩸', txt:'Perguntar sobre sangue ou muco nas fezes'}, {ic:'😵', txt:'Avaliar sinais de desidratação: tontura, boca seca'} ],
    dorcabeca:  [ {ic:'📊', txt:'Avaliar intensidade na escala 0-10'}, {ic:'🌡', txt:'Checar se há febre'}, {ic:'👁', txt:'Perguntar alteração visual ou rigidez de nuca — PS urgente se presentes'} ],
    dorcostas:  [ {ic:'📊', txt:'Avaliar intensidade 0-10 e se irradia para as pernas'}, {ic:'🌡', txt:'Checar febre — pode indicar pielonefrite'}, {ic:'⚠', txt:'Formigamento ou perda de força nas pernas → PS urgente'} ],
    itu:        [ {ic:'🌡', txt:'Perguntar febre — com febre muda completamente a conduta (PS)'}, {ic:'🩸', txt:'Sangue na urina ou dor lombar intensa → PS'}, {ic:'💊', txt:'ITU não complicada → direto para médico (antibiótico necessário)'} ],
    ansiedade:  [ {ic:'🫁', txt:'Técnica de respiração 4-4-4: inspire 4, segure 4, expire 4'}, {ic:'👤', txt:'Verificar se tem alguém com o paciente'}, {ic:'⚠', txt:'Falta de ar intensa ou pensamentos de se machucar → PS + acionar chefia'} ],
    sm:         [ {ic:'💙', txt:'Acolher antes de qualquer orientação clínica'}, {ic:'❓', txt:'Sempre perguntar sobre pensamentos de se machucar — sem desviar o assunto'}, {ic:'📞', txt:'CVV: 188 — disponível 24h'} ],
    ideacao:    [ {ic:'🚨', txt:'ACIONAR CHEFIA IMEDIATAMENTE'}, {ic:'📞', txt:'CVV 188 — não deixar sozinho'}, {ic:'🏥', txt:'PS psiquiátrico se crise ativa'} ],
    rede_consulta: [ {ic:'🏥', txt:'Confirmar operadora ANTES de buscar rede'}, {ic:'📍', txt:'Pedir cidade/bairro para busca localizada'}, {ic:'💻', txt:'Oferecer teleconsulta se rede limitada na região'} ],
    autorizacao:   [ {ic:'⏱', txt:'Prazo ANS: cirurgia eletiva = 21 dias úteis; urgência = 8 horas'}, {ic:'📋', txt:'Coletar: nome do procedimento, prestador, número da guia'}, {ic:'🚨', txt:'Urgência: hospital NÃO pode negar — acionar chefia se necessário'} ],
    bloqueio:      [ {ic:'💻', txt:'Verificar status no Backoffice antes de responder'}, {ic:'🏥', txt:'Urgência clínica + bloqueio → PS primeiro, resolver plano depois'}, {ic:'📞', txt:'Ligar para operadora se necessário desbloquear urgente'} ]
  },

  links: {
    enf15:'https://calendly.com/d/d6g-j4x-9m8/equipe-de-enfermagem-15-min',
    enf30:'https://calendly.com/d/d55-7c9-p8d/equipe-de-enfermagem-30-min',
    med15:'https://calendly.com/d/cvf6-f7f-4ms/teleconsulta-medica-pipo-saude-1',
    med30:'https://calendly.com/d/cxpv-k4h-8v5/teleconsulta-medica-pipo-saude-2'
  },

  findProt(txt) {
    const t = txt.toLowerCase();
    // ── Interpretação de intenção ──────────────────────────
    // Padrões de linguagem natural mapeados para protocolos
    // antes da pontuação por tags
    var intencoes = [
      // Rede / hospital / médico / "aceita meu plano"
      { re: /hospital|clínica|clinica|upa|pronto.?socorro|onde (posso|eu) (passar|consultar|ir)|aceita.?meu.?plano|plano.?aceita|conveniado|credenciado|rede|qual.?médico|onde.?médico|médico.?perto/, id: 'rede_consulta' },
      // Emergência imediata com localização
      { re: /estou (na|no|em|numa) (upa|ps|pronto.?socorro|emergência|emergencia|hospital)/, id: 'rede_consulta' },
      // Receita / medicamento
      { re: /receita|renovar|remédio.?acabou|prescrição|preciso.?de.?receita/, id: 'receita' },
      // Atestado
      { re: /atestado|afastamento|falta.?trabalho|declaração.?médica/, id: 'atestado' },
      // Autorização / cirurgia
      { re: /autorização|guia|cirurgia.?(marcada|agendada|pendente)|procedimento.?(negado|aprovado|pendente)/, id: 'autorizacao' },
      // Telemedicina / "quero consultar agora"
      { re: /teleconsulta|telemedicina|consulta.?(online|agora|hoje|virtual)|médico.?(online|agora|hoje)|quero.?(consultar|falar.?com.?médico)/, id: 'receita' },
      // Exame
      { re: /exame|resultado.?exame|laborat[oó]rio|pedido.?exame|fazer.?exame/, id: 'rede_exame' },
      // Reembolso — só quando explícito
      { re: /reembolso|ressarcimento|paguei.?particular|fora.?da.?rede.?e.?quero|quero.?reembolso/, id: 'reembolso' },
      // Cobertura / bloqueio
      { re: /meu.?plano.?(não|nao).?(cobre|funciona|passa|aceita)|cobertura|plano.?bloqueado|carteirinha.?(bloqueada|suspensa)/, id: 'bloqueio' },
      // Saúde mental
      { re: /ansiedade|pânico|panico|depressão|depressao|angustia|angústia|estou.?mal.?emocionalmente/, id: 'ansiedade' },
    ];
    // Testar intenções em ordem — primeira que bater retorna o protocolo
    for (var i = 0; i < intencoes.length; i++) {
      if (intencoes[i].re.test(t)) {
        var match = this.protocolos.find(function(p) { return p.id === intencoes[i].id; });
        if (match) return match;
      }
    }
    // Sistema de pontuação: conta quantas tags batem E penaliza falsos positivos
    var melhor = null;
    var melhorScore = 0;
    this.protocolos.forEach(function(p) {
      var score = 0;
      // Cada tag que aparece no texto vale 1 ponto
      p.tags.forEach(function(k) { if (t.includes(k)) score++; });
      if (score === 0) return;
      // Bônus: título do protocolo aparece no texto
      if (t.includes(p.titulo.toLowerCase())) score += 3;
      // Bônus: múltiplas tags do mesmo protocolo indicam contexto mais forte
      if (score >= 2) score += 2;
      // Penalidade: reembolso só vence se "reembolso" ou "ressarcimento" estiver explícito
      if (p.id === 'reembolso' && !t.includes('reembolso') && !t.includes('ressarcimento')) score = 0;
      // Penalidade: cobertura só vence se "cobre" ou "cobertura" estiver explícito
      if (p.id === 'cobertura' && !t.includes('cobertura') && !t.includes('cobre')) score = 0;
      // Boost: busca de rede quando menciona localização + plano + hospital/médico
      if ((p.id === 'rede_consulta' || p.id === 'rede_exame') &&
          (t.includes('rede') || t.includes('hospital') || t.includes('clínica') || t.includes('clinica') ||
           t.includes('credenciado') || t.includes('conveniado') || t.includes('aceita') || t.includes('aceitar'))) {
        score += 3;
      }
      if (score > melhorScore) { melhorScore = score; melhor = p; }
    });
    return melhor;
  },

  search(q) {
    const t = q.toLowerCase();
    const r = [];
    this.protocolos.forEach(p => { if(p.titulo.toLowerCase().includes(t)||p.tags.some(k=>k.includes(t))) r.push({tipo:'Protocolo',titulo:p.titulo,desc:p.resumo,id:p.id}); });
    this.cofen.forEach(c => { if(c.nome.toLowerCase().includes(t)||c.ind.toLowerCase().includes(t)) r.push({tipo:'COFEN 801',titulo:c.nome,desc:c.ind+' · '+c.dose+(c.obs?' · '+c.obs:'')}); });
    this.operadoras.forEach(o => { if(o.nome.toLowerCase().includes(t)) r.push({tipo:'Operadora',titulo:o.nome,desc:'Tel: '+o.tel+(o.tele?' · Telemedicina: '+o.tele_desc:' · Sem telemedicina'),link:o.rede,tel:o.tel}); });
    this.telefones.forEach(t2 => { if(t2.nome.toLowerCase().includes(t)||t2.desc.toLowerCase().includes(t)) r.push({tipo:'Telefone',titulo:t2.nome,desc:t2.desc,num:t2.num,link:t2.link}); });
    this.fluxos.forEach(f => { if(f.nome.toLowerCase().includes(t)||f.desc.toLowerCase().includes(t)) r.push({tipo:'Fluxo',titulo:f.nome,desc:f.desc}); });
    return r.slice(0,15);
  }
};

// ── STORAGE ──────────────────────────────────────────────
// _novoPlantao fora do objeto S — disponível antes de S ser construído
function _novoPlantao(enf, horario) {
  var agora = new Date();
  var dataStr = agora.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' });
  return {
    id: 'p' + Date.now(),
    e: enf,
    h: horario,
    data: dataStr,
    inicio: Date.now(),
    encerradoEm: null,
    a: []
  };
}

const S = {
  KEY: 'cp24x7v4',
  get() {
    try {
      var raw = JSON.parse(localStorage.getItem(this.KEY) || 'null');
      if (!raw) {
        // Tentar migrar formato antigo v3
        var old = JSON.parse(localStorage.getItem('cp24x7v3') || 'null');
        if (old && old.e) {
          var plantao = _novoPlantao(old.e, old.h || '');
          plantao.a = old.a || [];
          if (plantao.a.length > 0) plantao.encerradoEm = Date.now();
          return { plantoes: [plantao], ativo: plantao.id };
        }
        return { plantoes: [], ativo: null };
      }
      return raw;
    } catch(e) { return { plantoes: [], ativo: null }; }
  },
  set(d) { try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch(e) {} },
  clear() { localStorage.removeItem(this.KEY); }
};

// ── STATE ─────────────────────────────────────────────────
let db = S.get();          // banco completo { plantoes[], ativo }
let atendAtivo = null;
let baseCat = 'clinico';

// Helpers — toda a app usa estas funções, nunca acessa db diretamente
function plantaoAtivo() {
  if (!db.ativo) return null;
  return db.plantoes.find(function(p) { return p.id === db.ativo; }) || null;
}
function atendimentos() {
  var p = plantaoAtivo();
  return p ? (p.a || []) : [];
}
function salvar() { S.set(db); }

// Compatibilidade: st aponta para o plantão ativo (usado no código legado)
// Será removido gradualmente
var st = {
  get e() { var p = plantaoAtivo(); return p ? p.e : null; },
  get h() { var p = plantaoAtivo(); return p ? p.h : null; },
  get a() { return atendimentos(); },
  set a(v) { var p = plantaoAtivo(); if (p) p.a = v; }
};

// ── UTILITÁRIOS ───────────────────────────────────────────
function h(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function tempo(ts) {
  if (!ts) return '';
  const d = Math.floor((Date.now() - ts) / 60000);
  if (d < 1) return 'agora';
  if (d < 60) return d + 'min';
  return Math.floor(d/60) + 'h' + (d % 60 > 0 ? String(d % 60).padStart(2,'0') + 'min' : '');
}

function fmtTs(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

function notif(msg) {
  const n = document.getElementById('notif');
  n.textContent = msg;
  n.classList.add('on');
  clearTimeout(n._t);
  n._t = setTimeout(function() { n.classList.remove('on'); }, 2500);
}

function cpTxt(btn, txt, label) {
  copiarTexto(txt, function() {
    const o = btn.textContent;
    btn.textContent = '✓';
    setTimeout(function() { btn.textContent = o; }, 1800);
    notif((label || '') + ' copiado ✓');
  });
}

function cpTxtDireto(txt, msg) {
  // txt pode conter \n literais — decodificar
  const decoded = txt.replace(/\\n/g, '\n');
  copiarTexto(decoded, function() { notif(msg || 'Copiado ✓'); });
}

// Copiar via data-copy attribute — seguro contra aspas no HTML
// Clipboard com fallback para contexto de extensão Chrome
function copiarTexto(txt, onOk, onErr) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(onOk).catch(function() {
      // Fallback: execCommand (funciona mesmo sem foco na extensão)
      try {
        var ta = document.createElement('textarea');
        ta.value = txt;
        ta.style.cssText = 'position:fixed;top:-999px;left:-999px;opacity:0';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        onOk();
      } catch(e) { if (onErr) onErr(e); }
    });
  } else {
    try {
      var ta = document.createElement('textarea');
      ta.value = txt;
      ta.style.cssText = 'position:fixed;top:-999px;left:-999px;opacity:0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      onOk();
    } catch(e) { if (onErr) onErr(e); }
  }
}

function cpData(btn) {
  var raw = btn.getAttribute('data-copy') || '';
  var msg = btn.getAttribute('data-msg') || 'Copiado ✓';
  // Decodificar entidades HTML básicas e quebras de linha
  var txt = raw
    .replace(/&#10;/g, '\n')
    .replace(/&#13;/g, '\r')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  copiarTexto(txt,
    function() {
      var orig = btn.textContent;
      btn.textContent = '✓';
      notif(msg);
      setTimeout(function() { btn.textContent = orig; }, 1800);
    },
    function() { notif('Erro ao copiar — verifique permissão do navegador'); }
  );
}

// Sugestão de melhoria
function enviarSugestao() {
  var tipo = document.getElementById('sug-tipo').value;
  var desc = document.getElementById('sug-desc').value.trim();
  var ctx = document.getElementById('sug-ctx').value.trim();
  if (!tipo) { notif('Selecione o tipo de sugestão'); return; }
  if (!desc) { notif('Descreva a sugestão'); return; }

  // Salvar no localStorage para memória local
  var sug = {
    id: 's' + Date.now(),
    tipo: tipo,
    desc: desc,
    ctx: ctx,
    enf: (plantaoAtivo() && plantaoAtivo().e) || '?',
    ts: Date.now()
  };
  try {
    var sugs = JSON.parse(localStorage.getItem('cp24x7_sugestoes') || '[]');
    sugs.unshift(sug);
    if (sugs.length > 50) sugs = sugs.slice(0, 50);
    localStorage.setItem('cp24x7_sugestoes', JSON.stringify(sugs));
  } catch(e) {}

  // Abrir Slack com mensagem pré-formatada
  var msg = encodeURIComponent(
    '💡 *Sugestão de melhoria — Copiloto 24x7*\n' +
    '*Tipo:* ' + tipo + '\n' +
    '*Sugestão:* ' + desc +
    (ctx ? '\n*Contexto:* ' + ctx : '') +
    '\n*Enviado por:* ' + sug.enf
  );
  window.open('https://piposaude.slack.com/team/leticia.rodrigues', '_blank');

  fecharModal('m-sug');
  document.getElementById('sug-tipo').value = '';
  document.getElementById('sug-desc').value = '';
  document.getElementById('sug-ctx').value = '';
  notif('Sugestão registrada ✓ — abrindo Slack para enviar');
}

// Handler para data-action — evita aspas problemáticas em onclick com variáveis
function dataAction(el) {
  var action = el.getAttribute('data-action');
  var val = el.getAttribute('data-val') || '';
  if (action === 'abrirProtocolo') { abrirProtocolo(val); }
  else if (action === 'filtrarBase') { filtrarBase(val); }
  else if (action === 'verPlantaoArq') { verPlantaoArq(val); }
}

// Ticket: normaliza para URL clicável
function ticketUrl(ticket) {
  if (!ticket) return null;
  ticket = ticket.trim();
  if (/^https?:\/\//.test(ticket)) return ticket;
  // Número puro → URL Zendesk da Pipo
  if (/^\d+$/.test(ticket)) return 'https://piposaude.zendesk.com/agent/tickets/' + ticket;
  return null;
}

// HTML do badge de ticket para usar na passagem e na lista
function ticketBadge(ticket) {
  if (!ticket) return '';
  var url = ticketUrl(ticket);
  var label = /^\d+$/.test(ticket.trim()) ? '#' + ticket.trim() : 'Ver ticket';
  if (url) {
    return '<a href="' + h(url) + '" target="_blank" style="font-size:11px;color:#1d4ed8;text-decoration:none;display:inline-flex;align-items:center;gap:3px;margin-top:3px">🔗 Ticket ' + h(label) + '</a>';
  }
  return '<span style="font-size:11px;color:#6b6b68;margin-top:3px">🔗 ' + h(ticket) + '</span>';
}

// ── ENTRADA ───────────────────────────────────────────────
function entrar() {
  var nome = document.getElementById('inp-nome').value.trim();
  var hor = document.getElementById('inp-horario').value;
  if (!nome) { alert('Digite seu nome.'); return; }
  if (!hor) { alert('Selecione o horário.'); return; }
  // Criar novo plantão
  var novoPlantao = _novoPlantao(nome, hor);
  if (!db.plantoes) db.plantoes = [];
  db.plantoes.unshift(novoPlantao);
  db.ativo = novoPlantao.id;
  salvar();
  iniciarApp();
}

function restaurar() {
  // Restaurar último plantão ativo (mesmo sem encerrar)
  if (db.ativo && plantaoAtivo()) { iniciarApp(); return; }
  // Ou o mais recente
  if (db.plantoes && db.plantoes.length > 0) {
    db.ativo = db.plantoes[0].id;
    salvar();
    iniciarApp();
  }
}

function iniciarApp() {
  var p = plantaoAtivo();
  if (!p) { alert('Erro: nenhum plantão ativo.'); return; }
  document.getElementById('entrada').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  document.getElementById('fab').style.display = 'flex';
  document.getElementById('rodape-suporte').style.display = 'flex';
  iniciarRelogio();

  // Carregar nome da enfermeira do Drive (salvo pelo login Google)
  chrome.storage.local.get(['driveNome', 'driveEmail'], function(r) {
    var nomeEnf = r.driveNome || '';
    // Se não tem nome salvo, extrair do email (leticia@piposaude → Leticia)
    if (!nomeEnf && r.driveEmail) {
      var parteEmail = r.driveEmail.split('@')[0];
      nomeEnf = parteEmail.charAt(0).toUpperCase() + parteEmail.slice(1);
    }
    if (nomeEnf && p.e === 'Plantão') {
      // Atualizar nome do plantão ativo com nome real da enfermeira
      p.e = nomeEnf;
      salvar();
    }
    document.getElementById('tb-info').textContent = p.e ? '(' + p.e + ')' : '';
    ir('plantao');  // garante que o sistema de abas inicializa corretamente
  });
  setInterval(function() {
    if (document.getElementById('t-plantao').classList.contains('on')) renderPlantao();
    verificarSilencio();
  }, 60000);
}

window.addEventListener("load", function() {
  // Entrar direto no app — sem tela inicial
  if (db.ativo && plantaoAtivo()) {
    iniciarApp();
    return;
  }
  // Nenhum plantão ativo: criar automaticamente com nome padrão
  var novoP = _novoPlantao('Plantão', horaAtualFormatada());
  if (!db.plantoes) db.plantoes = [];
  db.plantoes.unshift(novoP);
  db.ativo = novoP.id;
  salvar();
  iniciarApp();
});

function horaAtualFormatada() {
  var h = new Date().getHours();
  if (h >= 20 || h < 7)  return '20:00-07:00';
  if (h >= 7  && h < 18) return '07:00-07:00';
  return '18:00-20:00';
}

// ── RELÓGIO ───────────────────────────────────────────────
function iniciarRelogio() {
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    document.getElementById('tb-clock').textContent = hh + ':' + mm;
    if (st.h) {
      const parts = st.h.split('-');
      if (parts.length >= 2) {
        const fimParts = parts[1].split(':');
        const fh = parseInt(fimParts[0], 10);
        const fm = parseInt(fimParts[1], 10);
        let diff = fh * 60 + fm - now.getHours() * 60 - now.getMinutes();
        if (diff < 0) diff += 1440;
        document.getElementById('tb-aviso').style.display = (diff <= 30 && diff > 0) ? 'inline' : 'none';
      }
    }
  }
  tick();
  setInterval(tick, 30000);
}

function verificarSilencio() {
  var ativos = atendimentos().filter(function(a) { return a.status !== 'enc' && a.etapa === 'agu'; });
  ativos.forEach(function(a) {
    var ultTs = (a.hist && a.hist.length > 0) ? a.hist[a.hist.length - 1].ts : a.ts;
    var min = Math.floor((Date.now() - ultTs) / 60000);
    if (min >= 10 && !a._sil) {
      a._sil = true;
      S.set(st);
      notif('⏱ ' + a.pac + ' não responde há ' + min + 'min');
    }
  });
}

// ── NAVEGAÇÃO ─────────────────────────────────────────────
function ocultarTudo() {
  var ids = ['t-plantao', 't-atend', 't-base', 't-passagem', 't-relatorio'];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.style.display = '';  // limpar inline — deixar CSS decidir
      el.classList.remove('on');
    }
  });
}

function ir(tela) {
  ocultarTudo();
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('on'); });
  var fab = document.getElementById('fab');
  var tabAtiva = document.querySelector('.tab[data-val="' + tela + '"]');
  if (tabAtiva) tabAtiva.classList.add('on');

  if (tela === 'plantao') {
    var el = document.getElementById('t-plantao');
    if (el) el.classList.add('on');
    if (fab) fab.style.display = 'flex';
    renderPlantao();
  } else if (tela === 'base') {
    var el = document.getElementById('t-base');
    if (el) el.classList.add('on');
    if (fab) fab.style.display = 'none';
    renderBase();
  } else if (tela === 'passagem') {
    var el = document.getElementById('t-passagem');
    if (el) el.classList.add('on');
    if (fab) fab.style.display = 'none';
    renderPassagem();
  } else if (tela === 'relatorio') {
    var el = document.getElementById('t-relatorio');
    if (el) el.classList.add('on');
    if (fab) fab.style.display = 'none';
    // ppInit inicializa chips e listeners — seguro chamar sempre
    if (typeof ppInit === 'function') {
      ppInit();
    }
  }
}

function irAtend(id) {
  if (!id) return;
  atendAtivo = id;
  ocultarTudo();
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('on'); });
  var el = document.getElementById('t-atend');
  el.classList.add('on');  // CSS .tela-flex.on { display:flex } faz o trabalho
  document.getElementById('fab').style.display = 'none';
  renderAtend();
}

function voltarPlantao() {
  atendAtivo = null;
  ir('plantao');
}

// ── PLANTÃO ───────────────────────────────────────────────
function renderPlantao() {
  var ativos = atendimentos().filter(function(a) { return a.status !== 'enc'; });
  var body = document.getElementById('plantao-body');
  var out = '';

  // Bloco urgente
  var urg = null;
  for (var i = 0; i < ativos.length; i++) {
    if (ativos[i].urg === 'red') { urg = ativos[i]; break; }
  }
  if (urg) {
    out += '<div class="urgente-bloco" data-action="irAtend" data-val="' + urg.id + '">';
    out += '<div class="ub-label">Ação imediata</div>';
    out += '<div class="ub-acao">' + h(urg.prox || ('Atender ' + urg.pac)) + '</div>';
    out += '<div class="ub-sub">' + h(urg.pac) + ' · ' + h(urg.motivo || '') + ' · ' + tempo(urg.ts) + '</div>';
    out += '</div>';
  }

  if (ativos.length === 0) {
    out += '<div class="vazio">Nenhum atendimento ativo.<br>Clique <strong>+</strong> para iniciar.</div>';
  } else {
    var grupos = [
      { t: 'Urgente', items: ativos.filter(function(a) { return a.urg === 'red'; }) },
      { t: 'Aguardando minha ação', items: ativos.filter(function(a) { return a.urg !== 'red' && (a.etapa === 'tri' || a.etapa === 'ori'); }) },
      { t: 'Aguardando o paciente', items: ativos.filter(function(a) { return a.etapa === 'agu'; }) },
      { t: 'Pendente encerramento', items: ativos.filter(function(a) { return a.etapa === 'enc' || a.etapa === 'cer'; }) }
    ].filter(function(g) { return g.items.length > 0; });

    grupos.forEach(function(g) {
      out += '<div>';
      out += '<div class="secao-titulo">' + g.t + '<span class="secao-count">' + g.items.length + '</span></div>';
      g.items.forEach(function(a) {
        var etapaMap = { tri:'et-tri', ori:'et-ori', agu:'et-agu', enc:'et-enc', cer:'et-cer' };
        var etapaLbl = { tri:'Triagem', ori:'Orientando', agu:'Aguardando', enc:'Encaminhado', cer:'Encerrando' };
        var acMap = { red:'verm', amber:'laranja', green:'verde' };
        var el2 = etapaMap[a.etapa] || 'et-tri';
        var el3 = etapaLbl[a.etapa] || a.etapa;
        var ac = acMap[a.urg] || 'cinza';
        var ultTs = (a.hist && a.hist.length > 0) ? a.hist[a.hist.length - 1].ts : a.ts;
        var sil = (a.etapa === 'agu') ? Math.floor((Date.now() - ultTs) / 60000) : 0;
        var silT = sil >= 10 ? ' · ⏱ ' + sil + 'min' : '';
        var proxText = (a.prox || '').substring(0, 48);
        out += '<div class="fcard l-' + (a.urg || 'gray') + '" data-action="irAtend" data-val="' + a.id + '">';
        out += '<div class="fc-top"><span class="fc-nome">' + h(a.pac) + '</span><span class="fc-tempo">' + tempo(a.ts) + h(silT) + '</span></div>';
        out += '<div class="fc-motivo">' + h(a.motivo || 'A identificar') + '</div>';
        var tkBadge = a.ticket ? '<div style="font-size:10px;margin-top:2px">' + ticketBadge(a.ticket) + '</div>' : '';
        out += '<div class="fc-bottom"><span class="fc-acao ' + ac + '">' + h(proxText) + '</span><span class="fc-etapa ' + el2 + '">' + el3 + '</span></div>';
        out += tkBadge;
        out += '</div>';
      });
      out += '</div>';
    });
  }

  body.innerHTML = out;
}

// ── MODAL NOVO ATENDIMENTO ────────────────────────────────
function abrirModalNovo() {
  document.getElementById('m-nome').value = '';
  document.getElementById('m-ctx').value = '';
  document.getElementById('m-ticket').value = '';
  document.getElementById('m-novo').classList.add('on');
  setTimeout(function() { document.getElementById('m-nome').focus(); }, 50);
}

function fecharModal(id) { document.getElementById(id).classList.remove('on'); }

function criarAtend() {
  var pac = document.getElementById('m-nome').value.trim();
  var ctx = document.getElementById('m-ctx').value.trim();
  var ticket = document.getElementById('m-ticket').value.trim();
  if (!pac) { alert('Digite o nome do paciente.'); return; }
  if (!ctx) { alert('Descreva o contexto inicial.'); return; }
  if (!ticket) { alert('Informe o número ou link do ticket. É obrigatório para rastreabilidade.'); return; }

  var p = plantaoAtivo();
  if (!p) { alert('Nenhum plantão ativo.'); return; }

  var id = 'a' + Date.now();
  var atendTemp = { pac: pac, enf: p.e, ctx: ctx, etapa: 'tri', hist: [], mem: {}, ts: Date.now() };
  var res = analisarCaso(atendTemp, null);

  var novo = {
    id: id,
    pac: pac,
    enf: p.e,
    ticket: ticket,
    ctx: ctx,
    etapa: res.etapa || 'tri',
    urg: res.urg || 'green',
    motivo: res.motivo,
    prox: res.prox,
    sub: res.sub,
    mem: res.mem,
    textos: res.textos,
    dirs: res.dirs,
    alarmes: res.alarmes,
    hist: [{ tipo: 'ctx', txt: ctx, ts: Date.now() }],
    cl: { nilo: false, zen: false, des: false },
    ts: Date.now(),
    status: 'ativo',
    _sil: false
  };

  if (!p.a) p.a = [];
  p.a.unshift(novo);
  salvar();
  fecharModal('m-novo');
  notif('Atendimento iniciado — ' + pac);
  irAtend(id);
}

// ── ANÁLISE ───────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════
// MOTOR DE ANÁLISE — isolado para troca futura por API
// Para conectar Claude API no futuro: substituir APENAS analisarMotor()
// O restante da aplicação (mem, hist, render) não muda.
// ══════════════════════════════════════════════════════════════

// Dicionário de sintomas: palavra/regex → chave canônica
var DICT_SINTOMAS = [
  { re: /febre|febr[ei]|temperatura alta|38|39|40|calafrio/,       id: 'febre' },
  { re: /tosse|coriza|espirro|nariz.?(entupido|escorrendo)|resfri/, id: 'gripal' },
  { re: /vômit|vomit|náusea|nausea|enjoo/,                         id: 'vomito' },
  { re: /diarreia|diarr|fezes.?(líquid|mole)|evacuaç/,             id: 'diarreia' },
  { re: /dor.?(ao|para|pra).?urin|ard[eê].?urin|urin.?(dor|ard)|disúria|cistit|urinár/,
                                                                    id: 'dor_urinaria' },
  { re: /dor.?(de.?)?cabeça|cefaleia|enxaqueca/,                   id: 'cefaleia' },
  { re: /dor.?no.?corpo|dor.?muscular|mialgia|corpo.?(dói|doendo|doído)/, id: 'dorcorpo' },
  { re: /dor.?(nas?.)?cost|lombar|coluna/,                          id: 'dorcostas' },
  { re: /falta.?de.?ar|dificuld.?respirar|respiraç.?(difícil|curta)|dispneia/, id: 'dispneia' },
  { re: /ansiedade|pânico|panico|angustia|angústia/,               id: 'ansiedade' },
  { re: /depressão|depressao|estou.?mal.?emocional|triste.?muito/, id: 'depressao' },
  { re: /ideaç|suicid|não.?quero.?viver|quero.?morrer/,            id: 'ideacao' },
  { re: /mancha|exantema|rash|bolha.?pele|coceira.?pele/,          id: 'mancha' },
  { re: /sangramento|sangue(?!.?urin)|hemorra/,                    id: 'sangramento' },
];

// Pesos de sintomas (calculado, não exibido — para Ajuste 3)
var PESO_SINTOMAS = {
  febre: 1, gripal: 1, vomito: 2, diarreia: 2,
  dor_urinaria: 2, cefaleia: 1, dorcorpo: 1, dorcostas: 1,
  dispneia: 5, ansiedade: 2, depressao: 3, ideacao: 10,
  mancha: 2, sangramento: 4,
};

// Combinações: lista de sintomas necessários → protocolo resultante
// Ordem importa: combinações mais específicas ANTES das genéricas
var COMBINACOES = [
  // Combinações de alta especificidade
  { sintomas: ['febre','dor_urinaria'],                   id: 'itu',      label: 'Febre + dor urinária → suspeita de ITU' },
  { sintomas: ['febre','cefaleia','dorcorpo'],            id: 'dengue',   label: 'Febre + cefaleia + dor no corpo → suspeita de Dengue' },
  { sintomas: ['febre','mancha'],                         id: 'dengue',   label: 'Febre + manchas → suspeita de Dengue' },
  { sintomas: ['febre','vomito','diarreia'],              id: 'diarreia', label: 'Febre + vômitos + diarreia → síndrome gastrointestinal' },
  { sintomas: ['febre','gripal'],                         id: 'febre',    label: 'Febre + sintomas gripais → síndrome gripal' },
  { sintomas: ['febre','vomito'],                         id: 'vomito',   label: 'Febre + vômitos → síndrome gastrointestinal (acompanhar)' },
  { sintomas: ['ansiedade','cefaleia'],                   id: 'sm',       label: 'Ansiedade + cefaleia → reavaliar saúde mental' },
  { sintomas: ['ansiedade','ideacao'],                    id: 'ideacao',  label: 'Ansiedade + ideação → protocolo de ideação suicida' },
  { sintomas: ['depressao','ideacao'],                    id: 'ideacao',  label: 'Depressão + ideação → protocolo de ideação suicida' },
  { sintomas: ['dispneia','febre'],                       id: 'febre',    label: 'Dispneia + febre → síndrome gripal (atenção: falta de ar)' },
];

// Extrai sintomas canônicos de um texto livre
function extrairSintomas(txt) {
  var t = txt.toLowerCase();
  var encontrados = [];
  DICT_SINTOMAS.forEach(function(d) {
    if (d.re.test(t) && encontrados.indexOf(d.id) === -1) {
      encontrados.push(d.id);
    }
  });
  return encontrados;
}

// Motor principal — SUBSTITUIR APENAS ESTA FUNÇÃO no futuro para usar API
// Entrada: texto completo acumulado + array de sintomas acumulados
// Saída: { protId, label, mudou, pesoTotal }
function analisarMotor(txtAcumulado, sintomasAcumulados) {
  var peso = sintomasAcumulados.reduce(function(acc, s) {
    return acc + (PESO_SINTOMAS[s] || 1);
  }, 0);

  // 1. Testar combinações (mais específico → menos específico)
  for (var i = 0; i < COMBINACOES.length; i++) {
    var combo = COMBINACOES[i];
    var temTodos = combo.sintomas.every(function(s) {
      return sintomasAcumulados.indexOf(s) !== -1;
    });
    if (temTodos) {
      return { protId: combo.id, label: combo.label, pesoTotal: peso };
    }
  }

  // 2. Fallback: match simples por texto (BASE.findProt existente)
  var prot = BASE.findProt(txtAcumulado);
  return {
    protId: prot ? prot.id : null,
    label: null,  // sem label = match simples, sem notificação de mudança
    pesoTotal: peso
  };
}

function analisarCaso(atend, nova) {
  try {
    var partes = [atend.ctx || ''];
    (atend.hist || []).forEach(function(hh) { partes.push(hh.txt || ''); });
    if (nova) partes.push(nova);
    var txt = partes.join(' ').toLowerCase();

    // ── MOTOR DE SINTOMAS ACUMULADOS (Ajuste 2) ───────────────
    var mem = atend.mem || {};
    // Acumular sintomas da mensagem nova (nunca apaga os anteriores)
    var sintomasAnteriores = mem.sintomas || [];
    var sintomasNovos = nova ? extrairSintomas(nova) : [];
    var sintomasAcum = sintomasAnteriores.slice();
    sintomasNovos.forEach(function(s) {
      if (sintomasAcum.indexOf(s) === -1) sintomasAcum.push(s);
    });

    // Rodar motor — detecta combinações ou faz fallback para match simples
    var motorRes = analisarMotor(txt, sintomasAcum);
    var protIdMotor = motorRes.protId;
    var prot = protIdMotor ? BASE.protocolos.find(function(p) { return p.id === protIdMotor; }) : BASE.findProt(txt);

    // Detectar mudança de protocolo
    var protAnterior = mem.protId || null;
    var labelMudanca = null;
    if (protAnterior && protAnterior !== (prot && prot.id) && motorRes.label) {
      labelMudanca = motorRes.label;
    }
    // ─────────────────────────────────────────────────────────

    var n = atend.pac || '[Nome]';
    var e = atend.enf || (st && st.e) || db._nomeEnf || '[Enfermeira]';

    var histTxt = (atend.hist || []).map(function(hh) { return (hh.txt || '').toLowerCase(); }).join(' ');

    var pendentes;
    if (prot) {
      pendentes = prot.perguntas.filter(function(p) {
        return !histTxt.includes(p.substring(0, 12).toLowerCase());
      });
    } else {
      pendentes = ['Coletar mais informações sobre o caso'];
    }

    var niloGerado = gerarNilo(atend, nova, prot, n, e);

    var novasMem = {
      motivo: (prot && prot.titulo) || mem.motivo || 'A identificar',
      protId: (prot && prot.id) || mem.protId,
      protAnterior: protAnterior,
      sintomas: sintomasAcum,
      pesoTotal: motorRes.pesoTotal || 0,
      labelMudanca: labelMudanca,
      sabe: nova ? (mem.sabe || []).concat([nova.substring(0, 100)]) : (mem.sabe || []),
      pendentes: pendentes,
      oriEnv: mem.oriEnv || [],
      encFeitos: mem.encFeitos || [],
      ult: nova ? 'Nova informação recebida' : (mem.ult || 'Atendimento iniciado'),
      decisoes: mem.decisoes || [],
      nilo: niloGerado
    };

    var urg;
    if (prot && prot.urg) {
      urg = 'red';
    } else if (prot && prot.alarmes && prot.alarmes.some(function(a) { return a.includes('PS'); }) && prot.perguntas.length < 3) {
      urg = 'red';
    } else if (prot) {
      urg = 'amber';
    } else {
      urg = 'green';
    }

    var etapa = atend.etapa || 'tri';
    var jaOri = novasMem.oriEnv.length > 0;
    var jaEnc = novasMem.encFeitos.length > 0;
    if (jaEnc) { etapa = 'enc'; }
    else if (jaOri && prot && prot.dirs && prot.dirs.length > 0) { etapa = 'ori'; }
    else if (jaOri) { etapa = 'agu'; }

    var prox = 'Coletar mais informações.';
    var sub = '';
    // nMensagens calculado antes de textos[] — usar variável já declarada
    var _nMsg = (atend.hist || []).filter(function(h) { return h.tipo === 'msg'; }).length;
    var _faseInv = pendentes.length > 0 && _nMsg < 2 && !jaOri;

    if (urg === 'red' && prot && prot.urg) {
      prox = '🚨 ' + ((prot.alarmes && prot.alarmes[0]) || 'URGENTE — ação imediata');
      sub = 'Não aguardar — agir agora';
    } else if (_faseInv) {
      // Ainda investigando — não concluir nem encaminhar
      prox = 'Aguardar resposta: ' + pendentes[0];
      sub = pendentes.length > 1 ? '+' + (pendentes.length - 1) + ' pergunta(s) para entender o caso' : 'Entender antes de orientar';
    } else if (pendentes.length > 0 && !jaOri) {
      prox = 'Perguntar: ' + pendentes[0];
      sub = pendentes.length > 1 ? '+' + (pendentes.length - 1) + ' pergunta(s) pendente(s)' : '';
    } else if (!jaOri && prot) {
      prox = 'Enviar orientações ao paciente.';
      sub = 'Texto pronto disponível abaixo';
    } else if (!jaEnc && prot && prot.dirs && prot.dirs.length > 0) {
      prox = 'Encaminhar para ' + prot.dirs[0].l;
      sub = prot.dirs[0].m;
    } else if (jaEnc) {
      prox = 'Aguardar retorno. Se silêncio >10min → ligar.';
      sub = 'Registrar no Nilo e fechar ticket ao encerrar';
    }

    var textos = [];
    var nMensagens = (atend.hist || []).filter(function(h) { return h.tipo === 'msg'; }).length;
    // Fase investigação: nenhuma ou poucas respostas e ainda há perguntas
    var faseInvestigacao = pendentes.length > 0 && nMensagens < 2 && !jaOri;
    // Fase orientação: perguntas suficientes respondidas ou já enviou orientação
    var faseOrientacao = !faseInvestigacao;

    // ── CORREÇÃO DE CONTEXTO ──────────────────────────────────────────────────
    // Verificar se o acolhimento inicial já foi enviado (hist tem msg anterior)
    var jaAcolheu = nMensagens > 0;
    // Perguntas já respondidas: comparar com hist para não repetir
    var perguntasRespondidas = (atend.hist || [])
      .filter(function(h) { return h.tipo === 'msg'; })
      .map(function(h) { return (h.txt || '').toLowerCase(); });
    var pendentesNaoRespondidas = pendentes.filter(function(perg) {
      var chave = perg.substring(0, 15).toLowerCase();
      return !perguntasRespondidas.some(function(resp) { return resp.indexOf(chave) !== -1; });
    });
    // ─────────────────────────────────────────────────────────────────────────

    if (faseInvestigacao) {
      var pergInicial = pendentesNaoRespondidas[0] || pendentes[0];
      var acolhimento;
      if (!jaAcolheu) {
        // Primeira mensagem: acolhimento completo
        acolhimento = 'Olá, ' + n + '! Meu nome é ' + e + ', sou enfermeira da Pipo. 😊\n\n';
        acolhimento += 'Entendo sua situação e vou te ajudar da melhor forma possível. ';
        acolhimento += 'Antes de te orientar, preciso entender um pouquinho melhor o que aconteceu.\n\n';
        acolhimento += '→ ' + pergInicial;
        textos.push({ lbl: 'Acolhimento', txt: acolhimento });
      } else {
        // Mensagens seguintes: sem repetir acolhimento, só continuar investigação
        if (pendentesNaoRespondidas.length > 0) {
          var continuacao = 'Obrigada pela informação! ';
          continuacao += 'Para te ajudar melhor, mais uma pergunta:\n\n';
          continuacao += '→ ' + pendentesNaoRespondidas[0];
          textos.push({ lbl: 'Continuação', txt: continuacao });
          if (pendentesNaoRespondidas.length > 1) {
            textos.push({ lbl: 'Próximas perguntas', txt: pendentesNaoRespondidas.slice(1).map(function(p) { return '→ ' + p; }).join('\n') });
          }
        } else {
          // Todas perguntas respondidas — passar para orientação mesmo em faseInvestigacao
          faseOrientacao = true;
          faseInvestigacao = false;
        }
      }
    }
    if (!faseInvestigacao && !jaOri) {
      // Fase orientação: já investigou, agora orienta
      var txtOri = prot ? prot.ori(n, e) : ('Olá, ' + n + '! Meu nome é ' + e + ', sou enfermeira da Pipo. 😊\n\nRecebi suas informações e estou aqui para ajudar. Vou te orientar agora.');
      textos.push({ lbl: 'Orientação', txt: txtOri });
    } else if (faseInvestigacao) { /* já tratado acima */ } else {
      // Já enviou orientação — acompanhamento
      textos.push({ lbl: 'Acompanhamento', txt: n + ', obrigada por me atualizar. Estou verificando aqui e te respondo em instantes 😊' });
    }


    return {
      etapa: etapa,
      urg: urg,
      prox: prox,
      sub: sub,
      motivo: (prot && prot.titulo) || novasMem.motivo,
      mem: novasMem,
      textos: textos,
      dirs: (prot && prot.dirs) || [],
      alarmes: (prot && prot.alarmes) || [],
      protId: prot && prot.id
    };
  } catch(err) {
    console.error('[ERRO] analisarCaso falhou:', err.message, err.stack);
    return {
      etapa: atend.etapa || 'tri', urg: 'green',
      prox: 'Erro na análise. Verifique o console.',
      sub: err.message || '',
      motivo: 'Erro', mem: atend.mem || {},
      textos: [], dirs: [], alarmes: []
    };
  }
}

function gerarNilo(atend, nova, prot, n, e) {
  try {
    // Montar histórico completo incluindo nova mensagem
    var hist = (atend.hist || []).slice();
    if (nova) hist.push({ tipo: 'msg', txt: nova, ts: Date.now() });

    var mot = (prot && prot.titulo) || 'Atendimento clínico';
    var now = new Date();
    var hora = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    var mem = atend.mem || {};
    var encFeitos = mem.encFeitos || [];
    var oriEnv = mem.oriEnv || [];

    // 1. MOTIVO DO ATENDIMENTO
    var secMotivo = 'Membro ' + n + ' acionou o Plantão 24x7 às ' + hora + ' via Pipo Cuida.';
    secMotivo += '\nMotivo identificado: ' + mot + '.';

    // 2. HISTÓRICO — resumo cronológico real das mensagens
    var msgsMembro = hist.filter(function(hh) {
      return hh.tipo !== 'ctx' ? true : true; // incluir tudo
    });
    var secHistorico = '';
    if (msgsMembro.length > 0) {
      // Filtrar mensagens que tenham conteúdo clínico/operacional real
      var msgs = msgsMembro
        .filter(function(hh) { return hh.txt && hh.txt.length > 5; })
        .map(function(hh) {
          var ts = hh.ts ? (String(new Date(hh.ts).getHours()).padStart(2,'0') + ':' + String(new Date(hh.ts).getMinutes()).padStart(2,'0')) : hora;
          var prefixo = hh.tipo === 'lig' ? '[Ligação] ' : '';
          return ts + ' — ' + prefixo + hh.txt;
        });
      secHistorico = msgs.join('\n');
    }
    if (!secHistorico) secHistorico = 'Membro relatou: ' + (atend.ctx || 'demanda não especificada') + '.';

    // 3. CONDUTAS E ORIENTAÇÕES
    var secCondutas = 'Realizei triagem clínica e operacional.';
    if (prot) {
      secCondutas += '\nProtocolo identificado: ' + mot + '.';
      if (prot.resumo) secCondutas += '\n' + prot.resumo;
    }
    var secOrientacoes = '';
    if (oriEnv.length > 0) {
      secOrientacoes = 'Orientações de conforto e conduta enviadas ao membro.';
    } else {
      secOrientacoes = 'Orientações em andamento.';
    }
    // Alarmes / riscos identificados
    if (prot && prot.alarmes && prot.alarmes.length > 0) {
      secCondutas += '\nSinais de alarme monitorados: ' + prot.alarmes.slice(0, 2).join('; ') + '.';
    }

    // 4. ENCAMINHAMENTO
    var secEnc = '';
    if (encFeitos.length > 0) {
      secEnc = 'Membro encaminhado para: ' + encFeitos.join(', ') + '.';
    } else if (prot && prot.dirs && prot.dirs.length > 0) {
      secEnc = 'Encaminhamento sugerido: ' + prot.dirs.map(function(d) { return d.l; }).join(' ou ') + ' — pendente confirmação.';
    } else {
      secEnc = 'Sem encaminhamento formal neste momento.';
    }

    // 5. DESFECHO
    var secDesfecho = '- Origem: Acionamento via Pipo Cuida (Plantão 24x7)\n- Canal: Ferramenta oficial de chat\n- Desfecho: [preencher ao encerrar]';

    return 'TÍTULO: Plantão 24x7\n\n' +
      '1. MOTIVO DO ATENDIMENTO\n' + secMotivo + '\n\n' +
      '2. HISTÓRICO DO CASO\n' + secHistorico + '\n\n' +
      '3. CONDUTAS REALIZADAS\n' + secCondutas + '\n\n' +
      '4. ORIENTAÇÕES FORNECIDAS\n' + secOrientacoes + '\n\n' +
      '5. ENCAMINHAMENTO\n' + secEnc + '\n\n' +
      '6. DESFECHO\n' + secDesfecho;
  } catch(err) {
    return 'Erro ao gerar evolução: ' + (err.message || '');
  }
}

// ── RENDERIZAR ATENDIMENTO ────────────────────────────────
function renderAtend() {
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === atendAtivo) { a = lista[i]; break; }
  }
  if (!a) { voltarPlantao(); return; }

  document.getElementById('c-nome').textContent = a.pac || '';
  var metaStr = (a.motivo || 'A identificar') + ' · ' + tempo(a.ts);
  if (a.ticket) metaStr += ' · #' + a.ticket;
  document.getElementById('c-meta').textContent = metaStr;

  var etapaMap = { tri:'et-tri', ori:'et-ori', agu:'et-agu', enc:'et-enc', cer:'et-cer' };
  var etapaLbl = { tri:'Triagem', ori:'Orientando', agu:'Aguardando', enc:'Encaminhado', cer:'Encerrando' };
  var eb = document.getElementById('c-etapa');
  eb.textContent = etapaLbl[a.etapa] || a.etapa;
  eb.className = 'ebadge ' + (etapaMap[a.etapa] || 'et-tri');

  var px = document.getElementById('proxima');
  px.className = 'proxima' + (a.urg === 'red' ? ' urg' : '');
  document.getElementById('pr-texto').textContent = a.prox || 'Analisar o caso.';
  document.getElementById('pr-sub').textContent = a.sub || '';

  renderCorpo(a);
}

function renderCorpo(a) {
  var body = document.getElementById('caso-corpo');
  if (!body) { console.error('[ERRO] caso-corpo não encontrado'); return; }
  var out = '';

  try {
    // ── BANNER: Protocolo atualizado por combinação de sintomas ──
    if (a.mem && a.mem.labelMudanca) {
      out += '<div style="background:#fff7ed;border:1px solid #f97316;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;gap:10px;align-items:flex-start">';
      out += '<span style="font-size:18px">⚠️</span>';
      out += '<div>';
      out += '<div style="font-weight:600;color:#c2410c;font-size:13px">Protocolo atualizado</div>';
      out += '<div style="font-size:12px;color:#7c2d12;margin-top:2px">' + h(a.mem.labelMudanca) + '</div>';
      if (a.mem.protAnterior) {
        var pAnterior = BASE.protocolos.find(function(p) { return p.id === a.mem.protAnterior; });
        if (pAnterior) {
          out += '<div style="font-size:11px;color:#a0a09c;margin-top:4px">Protocolo anterior: ' + h(pAnterior.titulo) + '</div>';
        }
      }
      out += '</div></div>';
    }
    // ── SINTOMAS ACUMULADOS (quando há mais de 1) ─────────────────
    if (a.mem && a.mem.sintomas && a.mem.sintomas.length > 1) {
      out += '<div style="font-size:11px;color:#6b6b68;margin-bottom:8px">Sintomas registrados: ';
      out += a.mem.sintomas.map(function(s) {
        return '<span style="background:#f0f0ee;border-radius:4px;padding:1px 6px">' + h(s.replace('_',' ')) + '</span>';
      }).join(' ');
      out += '</div>';
    }

    // Resumo
    var encFeitos = (a.mem && a.mem.encFeitos) || [];
    var resumo = (a.motivo || 'Atendimento em andamento') + ' · ' + tempo(a.ts);
    if (encFeitos.length > 0) resumo += '. Encaminhado para ' + encFeitos.join(', ');
    resumo += '.';
    out += bloco('Resumo', '<div class="bl-texto">' + h(resumo) + '</div>');

    // Mapa de progresso
    var steps = [
      { l: 'Acolheu', ok: a.hist && a.hist.length > 0 },
      { l: 'Perguntou', ok: a.hist && a.hist.length > 1 },
      { l: 'Orientou', ok: (a.mem && a.mem.oriEnv && a.mem.oriEnv.length > 0) },
      { l: 'Encaminhou', ok: (a.mem && a.mem.encFeitos && a.mem.encFeitos.length > 0) },
      { l: 'Evoluiu', ok: a.cl && a.cl.nilo },
      { l: 'Encerrou', ok: a.status === 'enc' }
    ];
    var cur = -1;
    for (var i = 0; i < steps.length; i++) { if (!steps[i].ok) { cur = i; break; } }
    var mapaHtml = '<div class="mapa">';
    steps.forEach(function(s, i) {
      var cls = s.ok ? 'ok' : (i === cur ? 'atual' : 'pend');
      var ic = s.ok ? '✓' : (i === cur ? '→' : '·');
      mapaHtml += '<div class="ms ' + cls + '"><span class="ms-ic">' + ic + '</span>' + s.l + '</div>';
    });
    mapaHtml += '</div>';
    out += '<div class="bloco" style="overflow:hidden"><div class="bl-titulo" style="padding:9px 12px">Progresso</div>' + mapaHtml + '</div>';

    // O que ainda falta
    var falta = [];
    var pendentes = (a.mem && a.mem.pendentes) || [];
    pendentes.slice(0, 3).forEach(function(p) { falta.push(p); });
    if (encFeitos.length === 0 && a.dirs && a.dirs.length > 0) falta.push('Enviar link de teleconsulta ao paciente');
    if (!a.cl || !a.cl.nilo) falta.push('Registrar no Nilo — tópico: Atendimento 24x7');
    if (!a.cl || !a.cl.zen) falta.push('Fechar ticket no Zendesk com macro');
    if (falta.length > 0) {
      var faltaHtml = '';
      falta.forEach(function(f) { faltaHtml += '<div class="li pend">→ ' + h(f) + '</div>'; });
      out += bloco('O que ainda falta', faltaHtml);
    }

    // Textos prontos
    var textos = a.textos || [];
    if (textos.length > 0) {
      var txtHtml = '';
      textos.forEach(function(t, i) {
        var isLast = i === textos.length - 1;
        var safeId = 'txt_' + a.id + '_' + i;
        txtHtml += '<div style="margin-bottom:' + (isLast ? '0' : '10px') + '">';
        txtHtml += '<div style="font-size:10px;color:#a0a09c;margin-bottom:4px">' + h(t.lbl) + '</div>';
        txtHtml += '<div id="' + safeId + '" style="background:#f5f5f3;border-radius:6px;padding:9px 10px;font-size:12px;line-height:1.7;white-space:pre-wrap;color:#1a1a1a">' + h(t.txt) + '</div>';
        txtHtml += '<div style="display:flex;gap:5px;margin-top:5px">';
        txtHtml += '<button class="pill azul" data-action="copiarPorId" data-val="' + safeId + '">Copiar</button>';
        if (i === 0) {
          txtHtml += '<button class="pill" data-action="marcarOri" data-val="' + a.id + '">Marcar como enviado</button>';
        }
        txtHtml += '</div>';
        txtHtml += '</div>';
      });
      out += bloco('Textos prontos para copiar', txtHtml);
    }

    // Links de encaminhamento
    var dirs = a.dirs || [];
    if (dirs.length > 0) {
      var linksHtml = '<div class="pills">';
      dirs.forEach(function(d) {
        var url = BASE.links[d.t] || '#';
        var cls = (d.t && d.t.startsWith('med')) ? 'roxo' : 'azul';
        linksHtml += '<button class="pill ' + cls + '" title="' + h(d.m) + '" data-action="copiarLink" data-url="' + url + '" data-label="' + h(d.l) + '" data-id="' + a.id + '">' + h(d.l) + '</button>';
      });
      linksHtml += '</div>';
      var dirsDesc = dirs.map(function(d) { return d.l + ': ' + d.m; }).join(' · ');
      linksHtml += '<div style="font-size:11px;color:#a0a09c;margin-top:6px">' + h(dirsDesc) + '</div>';
      out += bloco('Encaminhamento', linksHtml);
    }

    // Riscos e alarmes
    var alarmes = a.alarmes || [];
    if (alarmes.length > 0) {
      var alHtml = '';
      alarmes.forEach(function(al) { alHtml += '<div class="li risco">⚠ ' + h(al) + '</div>'; });
      out += bloco('Riscos e alarmes', alHtml);
    }

    // Sugestões inteligentes
    var protId = a.mem && a.mem.protId;
    var sugestoes = BASE.sugestoes && BASE.sugestoes[protId];
    if (sugestoes && sugestoes.length > 0) {
      var sugHtml = '';
      sugestoes.forEach(function(s) {
        sugHtml += '<div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.05)">';
        sugHtml += '<span style="font-size:13px">' + s.ic + '</span>';
        sugHtml += '<span style="font-size:12px;color:#6b6b68">' + h(s.txt) + '</span>';
        sugHtml += '</div>';
      });
      out += '<div class="bloco" style="border-left:3px solid #f59e0b"><div class="bl-titulo" style="color:#b45309">💡 Lembretes do protocolo</div><div class="bl-body">' + sugHtml + '</div></div>';
    }

    // Evolução do Nilo
    var nilo = a.mem && a.mem.nilo;
    if (nilo) {
      var niloId = 'nilo_' + a.id;
      var niloHtml = '<div id="' + niloId + '" class="nilo-box">' + h(nilo) + '</div>';
      niloHtml += '<div style="display:flex;gap:5px;margin-top:7px">';
      niloHtml += '<button class="pill azul" data-action="copiarPorId" data-val="' + niloId + '">Copiar para o Nilo</button>';
      niloHtml += '<button class="pill verde" data-action="marcarNilo" data-val="' + a.id + '">Marcar como evoluído</button>';
      niloHtml += '</div>';
      out += '<div class="bloco"><div class="bl-titulo" style="display:flex;justify-content:space-between;align-items:center"><span>Evolução do Nilo</span><span style="font-size:10px;color:#a0a09c;font-weight:400">Revisar antes de copiar</span></div><div class="bl-body">' + niloHtml + '</div></div>';
    }

    // Timeline
    var hist = a.hist || [];
    if (hist.length > 0) {
      var tlHtml = '';
      hist.forEach(function(hh, i) {
        var cor = hh.tipo === 'lig' ? 'vd' : (hh.tipo === 'dec' ? 'am' : 'az');
        var linha = i < hist.length - 1 ? '<div class="tl-l"></div>' : '';
        tlHtml += '<div class="tl">';
        tlHtml += '<span class="tl-t">' + fmtTs(hh.ts) + '</span>';
        tlHtml += '<div class="tl-w"><div class="tl-d ' + cor + '"></div>' + linha + '</div>';
        tlHtml += '<div class="tl-b"><div class="tl-tx">' + h(hh.txt) + '</div></div>';
        tlHtml += '</div>';
      });
      out += bloco('Timeline', tlHtml);
    }

    // Checklist de encerramento
    if (a.etapa === 'cer') {
      out += renderChecklist(a);
    }

  } catch(err) {
    console.error('[ERRO] renderCorpo falhou:', err.message, err.stack);
    out += '<div style="padding:16px;color:#dc2626;font-size:13px">Erro ao renderizar: ' + h(err.message || String(err)) + '</div>';
  }
  body.innerHTML = out;
}

function bloco(titulo, conteudo) {
  return '<div class="bloco"><div class="bl-titulo">' + titulo + '</div><div class="bl-body">' + conteudo + '</div></div>';
}

// ── AÇÕES DO ATENDIMENTO ──────────────────────────────────
function copiarPorId(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var txt = el.innerText || el.textContent || '';
  copiarTexto(txt, function() { notif('Copiado ✓'); });
}

function copiarLink(btn, url, label, id) {
  copiarTexto(url, function() {
    var orig = btn.textContent;
    btn.textContent = '✓ ' + label;
    btn.classList.add('copiado');
    var a = null;
    var lista = atendimentos();
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === id) { a = lista[i]; break; }
    }
    if (a) {
      if (!a.mem.encFeitos) a.mem.encFeitos = [];
      if (a.mem.encFeitos.indexOf(label) === -1) {
        a.mem.encFeitos.push(label);
        var res = analisarCaso(a, null);
        a.etapa = 'enc';
        a.prox = res.prox;
        a.sub = res.sub;
        // manter encFeitos e oriEnv já registrados
        res.mem.encFeitos = a.mem.encFeitos;
        res.mem.oriEnv = a.mem.oriEnv;
        a.mem = res.mem;
        salvar();
        renderCorpo(a);
      }
    }
    setTimeout(function() { btn.textContent = orig; btn.classList.remove('copiado'); }, 2500);
  });
}

function marcarOri(id) {
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === id) { a = lista[i]; break; } }
  if (!a) return;
  if (!a.mem.oriEnv) a.mem.oriEnv = [];
  a.mem.oriEnv.push('Orientações enviadas às ' + fmtTs(Date.now()));
  var res = analisarCaso(a, null);
  res.mem.oriEnv = a.mem.oriEnv;
  res.mem.encFeitos = a.mem.encFeitos || [];
  a.etapa = res.etapa || a.etapa;
  a.prox = res.prox;
  a.sub = res.sub;
  a.mem = res.mem;
  salvar();
  renderAtend();
  notif('Orientação marcada como enviada');
}

function marcarNilo(id) {
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === id) { a = lista[i]; break; } }
  if (!a) return;
  a.cl.nilo = true;
  salvar();
  renderAtend();
  notif('Nilo marcado como evoluído ✓');
}

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    var ta = document.getElementById('up-ta');
    if (document.activeElement === ta) analisar();
  }
});

function analisar() {
  var ta = document.getElementById('up-ta');
  var txt = ta.value.trim();
  if (!txt) return;
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === atendAtivo) { a = lista[i]; break; } }
  if (!a) return;

  a.hist.push({ tipo: 'msg', txt: txt, ts: Date.now() });
  a._sil = false;

  var res = analisarCaso(a, txt);
  // preservar histórico operacional e acumulação de sintomas
  res.mem.oriEnv   = a.mem.oriEnv   || [];
  res.mem.encFeitos= a.mem.encFeitos|| [];
  // sintomas: analisarCaso já acumula, mas garantir fallback
  if (!res.mem.sintomas) res.mem.sintomas = a.mem.sintomas || [];
  a.etapa = res.etapa || a.etapa;
  a.urg = res.urg || a.urg;
  a.motivo = res.motivo || a.motivo;
  a.prox = res.prox;
  a.sub = res.sub;
  a.mem = res.mem;
  a.textos = res.textos;
  a.dirs = res.dirs;
  a.alarmes = res.alarmes;

  salvar();
  ta.value = '';
  renderAtend();
  notif('Caso atualizado');
}

function abrirLigacao() {
  document.getElementById('m-lig-txt').value = '';
  document.getElementById('m-lig').classList.add('on');
  setTimeout(function() { document.getElementById('m-lig-txt').focus(); }, 50);
}

function confirmarLig() {
  var txt = document.getElementById('m-lig-txt').value.trim();
  if (!txt) return;
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === atendAtivo) { a = lista[i]; break; } }
  if (!a) return;
  a.hist.push({ tipo: 'lig', txt: '📞 Ligação: ' + txt, ts: Date.now() });
  var res = analisarCaso(a, txt);
  res.mem.oriEnv = a.mem.oriEnv || [];
  res.mem.encFeitos = a.mem.encFeitos || [];
  a.etapa = res.etapa || a.etapa;
  a.prox = res.prox;
  a.sub = res.sub;
  a.mem = res.mem;
  a.textos = res.textos;
  a.dirs = res.dirs;
  a.alarmes = res.alarmes;
  salvar();
  fecharModal('m-lig');
  renderAtend();
  notif('Ligação registrada');
}

// ── ENCERRAMENTO ──────────────────────────────────────────
function iniciarEnc() {
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === atendAtivo) { a = lista[i]; break; } }
  if (!a) return;
  a.etapa = 'cer';
  a.prox = 'Complete o checklist para encerrar o atendimento.';
  salvar();
  renderAtend();
}

function renderChecklist(a) {
  var c = a.cl || {};
  var ok = c.nilo && c.zen && c.des;
  var out = '<div class="bloco"><div class="bl-titulo">Checklist de encerramento</div>';
  out += '<div class="cl-item" data-action="toggleCl" data-val="nilo"><div class="cl-box ' + (c.nilo ? 'ok' : '') + '">✓</div><span class="cl-label">Evoluí no Nilo — tópico: Atendimento 24x7</span></div>';
  out += '<div class="cl-item" data-action="toggleCl" data-val="zen"><div class="cl-box ' + (c.zen ? 'ok' : '') + '">✓</div><span class="cl-label">Fechei o ticket no Zendesk com macro</span></div>';
  out += '<div class="cl-item" data-action="toggleCl" data-val="des"><div class="cl-box ' + (c.des ? 'ok' : '') + '">✓</div><span class="cl-label">Registrei o desfecho na evolução</span></div>';
  out += '<div style="padding:9px 12px"><button class="btn-encerrar-ok" data-action="encerrar" ' + (ok ? '' : 'disabled') + '>' + (ok ? 'Encerrar e avaliar caso →' : 'Complete o checklist') + '</button></div>';
  out += '</div>';
  return out;
}

function toggleCl(campo) {
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === atendAtivo) { a = lista[i]; break; } }
  if (!a) return;
  a.cl[campo] = !a.cl[campo];
  salvar();
  renderCorpo(a);
}

function encerrar() {
  var a = null;
  var lista = atendimentos();
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === atendAtivo) { a = lista[i]; break; } }
  if (!a) return;
  // Abrir modal de avaliação antes de encerrar
  document.getElementById('aval-nome').textContent = a.pac;
  // Limpar campos da passagem (evitar dados do caso anterior)
  ['pass-resumo','pass-feito','pass-pendencia','pass-responsavel','pass-prazo'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  // Pré-preencher resumo com o contexto do caso (editável)
  var elResumo = document.getElementById('pass-resumo');
  if (elResumo && a.ctx) elResumo.value = a.ctx.substring(0, 200);
  // Pré-preencher ações realizadas com encaminhamentos já feitos
  var elFeito = document.getElementById('pass-feito');
  if (elFeito) {
    var encFeitosStr = ((a.mem && a.mem.encFeitos) || []).join('; ');
    var oriStr = (a.mem && a.mem.oriEnv && a.mem.oriEnv.length > 0) ? 'Orientações enviadas.' : '';
    elFeito.value = [encFeitosStr, oriStr].filter(Boolean).join(' ');
  }
  // Limpar seleção de avaliação
  document.querySelectorAll('.aval-btn').forEach(function(b) { b.classList.remove('selecionado'); b.style.borderColor = ''; b.style.background = ''; });
  document.getElementById('m-aval').classList.add('on');
}

function confirmarAvaliacao() {
  var resultado = document.querySelector('.aval-btn.selecionado');
  if (!resultado) { notif('Selecione como terminou o caso'); return; }

  // Validação: caso não resolvido ou parcialmente resolvido exige 3 campos
  var avVal = resultado.dataset.val;
  var naoResolvido = avVal !== 'Resolvido';

  if (naoResolvido) {
    var campos = [
      { id: 'pass-resumo',      label: 'Resumo do caso' },
      { id: 'pass-pendencia',   label: 'Pendências' },
      { id: 'pass-responsavel', label: 'Responsável pela próxima ação' },
    ];
    var vazios = campos.filter(function(f) {
      return !document.getElementById(f.id).value.trim();
    });
    if (vazios.length > 0) {
      // Destacar campos vazios em vermelho
      campos.forEach(function(f) {
        var el = document.getElementById(f.id);
        el.style.borderColor = el.value.trim() ? '' : '#dc2626';
      });
      notif('Preencha: ' + vazios.map(function(f) { return f.label; }).join(', '));
      document.getElementById(vazios[0].id).focus();
      return;
    }
    // Limpar destaques se passou na validação
    campos.forEach(function(f) {
      document.getElementById(f.id).style.borderColor = '';
    });
  }

  var lista = atendimentos();
  var a = null;
  for (var i = 0; i < lista.length; i++) { if (lista[i].id === atendAtivo) { a = lista[i]; break; } }
  if (!a) return;

  // Salvar os 5 campos de passagem
  a.passagem = {
    resumo:       resumo,
    feito:        document.getElementById('pass-feito').value.trim(),
    pendencia:    document.getElementById('pass-pendencia').value.trim(),
    responsavel:  document.getElementById('pass-responsavel').value.trim(),
    prazo:        document.getElementById('pass-prazo').value.trim(),
  };

  a.status = 'enc';
  a.etapa = 'enc';
  a.encTs = Date.now();
  a.avaliacao = avVal;
  a.avalObs = ''; // campo obs removido — passagem substitui

  salvar();
  fecharModal('m-aval');
  // Limpar seleção
  document.querySelectorAll('.aval-btn').forEach(function(b) { b.classList.remove('selecionado'); });
  document.getElementById('aval-obs').value = '';

  atendAtivo = null;
  notif('Atendimento encerrado ✓');
  voltarPlantao();
}

function selecionarAvaliacao(btn, val) {
  document.querySelectorAll('.aval-btn').forEach(function(b) { b.classList.remove('selecionado'); });
  btn.classList.add('selecionado');
  btn.dataset.val = val;
}

// ── BASE DE CONHECIMENTO ──────────────────────────────────
function renderBase() {
  document.getElementById('base-search').value = '';
  renderCats();
  filtrarBase('clinico');
}

function renderCats() {
  var cats = [
    { id:'clinico', l:'Clínicos' },
    { id:'operacional', l:'Operacional' },
    { id:'autorizacao', l:'Autorização' },
    { id:'cofen', l:'COFEN 801' },
    { id:'rede', l:'Rede' },
    { id:'tel', l:'Telefones' },
    { id:'fluxo', l:'Fluxos' },
    { id:'materiais', l:'📄 Materiais' }
  ];
  var out = '';
  cats.forEach(function(c) {
    out += '<button class="base-cat' + (baseCat === c.id ? ' on' : '') + '" data-action="filtrarBase" data-val="' + c.id + '">' + c.l + '</button>';
  });
  document.getElementById('base-cats').innerHTML = out;
}

function filtrarBase(cat) {
  baseCat = cat;
  renderCats();
  var el = document.getElementById('base-items');
  var out = '';

  if (cat === 'clinico' || cat === 'operacional') {
    BASE.protocolos.filter(function(p) { return p.cat === cat; }).forEach(function(p) {
      out += '<div class="base-item" style="cursor:pointer" data-action="abrirProtocolo" data-val="' + h(p.id) + '">';
      out += '<div class="bi-titulo">' + h(p.titulo) + (p.urg ? ' <span class="bi-tag verm">URGENTE</span>' : '') + '</div>';
      out += '<div class="bi-desc">' + h(p.resumo) + '</div>';
      out += '<div class="bi-tags">';
      p.tags.slice(0, 3).forEach(function(t) { out += '<span class="bi-tag">' + h(t) + '</span>'; });
      out += '<span class="bi-tag azul" style="margin-left:auto;cursor:pointer">Ver protocolo →</span>';
      if (p.drive) out += '<a href="' + h(p.drive) + '" target="_blank" class="bi-tag" style="text-decoration:none">📄 Doc ↗</a>';
      out += '</div></div>';
    });

  } else if (cat === 'autorizacao') {
    out += '<div class="base-item" style="border-left:3px solid #dc2626">';
    out += '<div class="bi-titulo">Alta complexidade — acionar WhatsApp de urgência em casos críticos</div>';
    out += '<div class="bi-desc">Prazos ANS: consultas/exames simples = 7 dias úteis · cirurgias eletivas = 21 dias úteis · urgência/emergência = 8 horas.<br>Em emergências, o hospital NÃO pode negar atendimento por lei.</div>';
    out += '</div>';

    var statusGuia = [
      { k: 'Não recepcionada', v: 'A guia ainda não chegou no sistema da operadora. Orientar membro a contatar o médico/hospital para verificar a data de envio e o número do protocolo gerado.' },
      { k: 'Em andamento', v: 'A guia foi recebida e está em análise. Para cirurgia eletiva: prazo de até 21 dias úteis. Não é possível solicitar prioridade salvo em emergência comprovada pelo médico.' },
      { k: 'Pendente documentação', v: 'A guia foi recebida mas há documentos faltando (laudo, relatório médico). Orientar contato urgente com médico/hospital para envio da documentação complementar.' },
      { k: 'Aprovada parcialmente', v: 'Alguns itens foram aprovados, outros negados. Orientar contato com hospital/equipe médica para verificar se o procedimento pode ocorrer com a aprovação parcial.' },
      { k: 'Aprovada', v: 'Aprovação integral. Todas as informações foram encaminhadas ao prestador. Orientar contato com hospital para confirmar detalhes e agendamento.' },
      { k: 'Negada', v: 'Negativa total. Acionar WhatsApp de urgência. Orientar membro a contatar hospital/médico. Verificar possibilidade de NIP na ANS ou recurso de ouvidoria.' }
    ];
    out += '<div class="bi-titulo" style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:10px 0 5px">Status da guia de autorização</div>';
    statusGuia.forEach(function(s) {
      out += '<div class="base-item"><div class="bi-titulo">' + h(s.k) + '</div><div class="bi-desc">' + h(s.v) + '</div></div>';
    });

    out += '<div class="bi-titulo" style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:10px 0 5px">Templates</div>';
    var tplColeta = 'Para que eu possa verificar junto à operadora, preciso de:\n\n👉 Nome do procedimento\n👉 Nome do prestador (hospital/clínica)\n👉 Número da guia de autorização (se tiver)\n👉 Print do app do plano com o status (se tiver)\n\nAguardo para continuar!';
    var tplUrgencia = 'Olá, [NOME]! Recebi sua mensagem e estou tratando com prioridade máxima.\n\nJá estou verificando com [OPERADORA]. Retorno em instantes.\n\nImportante: em emergência, o hospital é obrigado a atender mesmo sem autorização prévia.\nTime Pipo Cuida';
    out += '<div class="base-item"><div class="bi-titulo">Coleta de dados inicial</div>';
    out += '<div class="bi-desc" style="white-space:pre-wrap;font-size:11px">' + h(tplColeta) + '</div>';
    out += '<div class="bi-tags"><button class="bi-tag azul" style="cursor:pointer" data-action="cpTxtDireto" data-json="' + JSON.stringify(tplColeta) + '" data-msg="Template copiado ✓">Copiar</button></div></div>';
    out += '<div class="base-item"><div class="bi-titulo">Urgência / emergência</div>';
    out += '<div class="bi-desc" style="white-space:pre-wrap;font-size:11px">' + h(tplUrgencia) + '</div>';
    out += '<div class="bi-tags"><button class="bi-tag verm" style="cursor:pointer;background:#fef2f2;color:#dc2626;border-color:#fecaca" data-action="cpTxtDireto" data-json="' + JSON.stringify(tplUrgencia) + '" data-msg="Template copiado ✓">Copiar</button></div></div>';

    var glos = [
      ['Código TUSS', 'Código numérico que identifica cada procedimento. A operadora usa para processar a autorização.'],
      ['ANS', 'Agência Nacional de Saúde Suplementar. Define prazos máximos obrigatórios para autorização.'],
      ['Rol de procedimentos', 'Lista de procedimentos que todos os planos são obrigados a cobrir. Se está no rol, a operadora não pode negar.'],
      ['NIP', 'Notificação de Intermediação Preliminar. Canal da ANS para reclamações. A operadora tem prazo para responder sob risco de sanção.'],
      ['OPME', 'Órteses, Próteses e Materiais Especiais. Frequentemente têm processo de autorização separado do procedimento principal.']
    ];
    out += '<div class="bi-titulo" style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:10px 0 5px">Glossário</div>';
    glos.forEach(function(g) {
      out += '<div class="base-item"><div class="bi-titulo">' + h(g[0]) + '</div><div class="bi-desc">' + h(g[1]) + '</div></div>';
    });

  } else if (cat === 'cofen') {
    out += '<div style="margin-bottom:8px">';
    out += '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px">';
    out += '<span style="font-size:11px;background:#f0fdf4;color:#16a34a;padding:2px 8px;border-radius:99px">🟢 Pode orientar</span>';
    out += '<span style="font-size:11px;background:#fffbeb;color:#b45309;padding:2px 8px;border-radius:99px">🟡 Com cautela</span>';
    out += '<span style="font-size:11px;background:#fef2f2;color:#dc2626;padding:2px 8px;border-radius:99px">🔴 Encaminhar médico</span>';
    out += '</div>';
    out += '<a href="https://www.cofen.gov.br/resolucao-cofen-no-801-de-14-de-janeiro-de-2026/" target="_blank" style="font-size:12px;color:#1d4ed8">Ver Resolução COFEN 801/2026 ↗</a>';
    out += '</div>';
    BASE.cofen.forEach(function(c) {
      var nv = c.nivel === 'v' ? '🟢' : (c.nivel === 'a' ? '🟡' : '🔴');
      out += '<div class="base-item"><div class="bi-titulo">' + h(c.nome) + ' ' + nv + '</div>';
      out += '<div class="bi-desc">' + h(c.ind) + ' · ' + h(c.dose) + '</div>';
      if (c.obs) out += '<div class="bi-tags"><span class="bi-tag verm">' + h(c.obs) + '</span></div>';
      out += '</div>';
    });

  } else if (cat === 'rede') {
    // Cabeçalho
    out += '<div class="base-item" style="border-left:3px solid #1d4ed8">';
    out += '<div class="bi-titulo">Top 1 motivo de atendimento — 58,6% dos tickets</div>';
    out += '<div class="bi-desc">Especialidades mais buscadas: Exames/Labs, Psicologia, Endocrinologia, Psiquiatria, Dermatologia.<br>Mais frequentes: SulAmérica (146/ano), Bradesco (133), Amil (60).</div>';
    out += '</div>';

    // Templates de resposta
    var tpls = [
      { titulo: 'Quando encontra prestador',
        txt: 'Olá, [NOME]!\n\nEncontrei opções de [ESPECIALIDADE] na rede [OPERADORA] para a sua região:\n\n- [Prestador] | [Endereço] | Tel: [telefone]\n\nPara agendar, entre em contato e informe o número da sua carteirinha.\nTime Pipo Cuida' },
      { titulo: 'Quando não encontra prestador',
        txt: 'Olá, [NOME]!\n\nBusquei na rede [OPERADORA] para [ESPECIALIDADE] e a disponibilidade está limitada na sua região.\n\nAlternativas:\n1. Teleconsulta: seu plano cobre atendimento online\n2. Regiões próximas: posso buscar em cidades vizinhas\n\nQual prefere?\nTime Pipo Cuida' },
      { titulo: 'Pronto Socorro na rede',
        txt: 'Olá, [NOME]! Espero que esteja bem.\n\nPS credenciado na rede [OPERADORA]:\n- [Hospital] | [Endereço] | Tel: [telefone] | 24h\n\nApresente sua carteirinha na chegada.\n\nEm emergências, o hospital é obrigado a atender mesmo sem autorização. Se piorar, ligue 192 (SAMU).\nTime Pipo Cuida' }
    ];
    out += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:10px 0 5px">Templates de resposta</div>';
    tpls.forEach(function(tp) {
      var el = document.createElement('div');
      el.textContent = tp.txt;
      var safe = el.innerHTML; // HTML-escape do texto
      out += '<div class="base-item">';
      out += '<div class="bi-titulo">' + h(tp.titulo) + '</div>';
      out += '<div class="bi-desc" style="white-space:pre-wrap;font-size:11px">' + safe + '</div>';
      // Usar data-copy para evitar problema de aspas no onclick
      out += '<div class="bi-tags"><button class="bi-tag azul" style="cursor:pointer" data-copy="' + safe + '" data-msg="Template copiado ✓">Copiar</button></div>';
      out += '</div>';
    });

    // Operadoras
    var opsTele = {
      'SulAmérica': '1. Baixar App SulAmérica Saúde\n2. Login com CPF e data de nascimento\n3. Menu → Telemedicina → Pronto Atendimento por Vídeo\n4. Selecionar especialidade → confirmar\nDisponível 24h.',
      'Bradesco Saúde': '1. Baixar App Saúde Digital Bradesco\n2. Login com CPF e senha\n3. Tela inicial → Teleconsulta\n4. Escolher médico disponível agora ou agendar\nDisponível 24h para clínico geral.',
      'Amil': '1. Baixar App Amil Clientes\n2. Login com CPF e senha\n3. Menu → Telemedicina Amil\n4. Pronto Atendimento ou agendar\nDisponível 24h.',
      'Seguros Unimed': '1. Baixar Super App Seguros Unimed\n2. Login com CPF\n3. Menu → Telemedicina → Pronto Atendimento 24h\n4. Confirmar dados e iniciar'
    };
    out += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:10px 0 5px">Operadoras</div>';
    BASE.operadoras.forEach(function(o) {
      var passoTele = opsTele[o.nome] || '';
      var tels = o.tels || [];
      // Primeiro telefone para o botão "Copiar tel"
      var tel1 = tels.length > 0 ? tels[0].n : (o.tel || '');
      var msgTel = ('Tel ' + o.nome + ' copiado').replace(/"/g, '&quot;');
      var msgTele = ('Telemedicina ' + o.nome + ' copiado').replace(/"/g, '&quot;');
      var passoEsc = passoTele.replace(/"/g, '&quot;').replace(/\n/g, '&#10;');
      out += '<div class="base-item">';
      out += '<div class="bi-titulo">' + h(o.nome) + (o.tele ? ' <span class="bi-tag azul" style="font-weight:400">Telemedicina 24h</span>' : '') + '</div>';
      // Números visíveis
      if (tels.length > 0) {
        out += '<div style="margin:6px 0 8px">';
        tels.forEach(function(t) {
          var tEsc = t.n.replace(/"/g, '&quot;');
          var mEsc = (t.l + ' ' + o.nome + ' copiado').replace(/"/g, '&quot;');
          out += '<div style="display:flex;align-items:center;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(0,0,0,.04)">';
          out += '<div><span style="font-size:10px;color:#a0a09c">' + h(t.l) + '</span> <span style="font-size:15px;font-weight:700;color:#1a1a1a;letter-spacing:.01em">' + h(t.n) + '</span></div>';
          out += '<button class="bi-tag azul" style="cursor:pointer;flex-shrink:0" data-copy="' + tEsc + '" data-msg="' + mEsc + '">📞 Copiar</button>';
          out += '</div>';
        });
        out += '</div>';
      }
      // Botões de ação
      out += '<div class="bi-tags">';
      out += '<a href="' + h(o.rede) + '" target="_blank" class="bi-tag azul" style="text-decoration:none">🌐 Abrir rede</a>';
      if (passoTele) {
        out += '<button class="bi-tag azul" style="cursor:pointer" data-copy="' + passoEsc + '" data-msg="' + msgTele + '">📋 Copiar telemedicina</button>';
      }
      out += '</div>';
      // Passo a passo telemedicina inline
      if (passoTele) {
        out += '<div style="font-size:11px;color:#6b6b68;white-space:pre-wrap;background:#f5f5f3;border-radius:6px;padding:8px 10px;margin-top:6px">' + h(passoTele.replace(/\\n/g, '\n')) + '</div>';
      }
      out += '</div>';
    });

    out += '<div class="base-item"><div class="bi-titulo">ABRAMGE — rede nacional de emergência</div>';
    out += '<div class="bi-desc">Hapvida NDI, Medic Global, Amil — quando não há credenciado local</div>';
    out += '<div class="bi-tags"><a href="https://atendimentoabramge.com.br/#/home/service-locations" target="_blank" class="bi-tag azul" style="text-decoration:none">🌐 Abrir</a></div></div>';

    // Glossário
    var glosRede = [
      ['Rede credenciada', 'Prestadores com contrato ativo com a operadora. Usar a rede evita pagar do bolso.'],
      ['Coparticipação', 'Valor pago a cada uso, mesmo na rede. Varia conforme o plano.'],
      ['Reembolso', 'Ressarcimento ao usar prestador fora da rede. Geralmente parcial.'],
      ['Carência', 'Período após adesão com coberturas limitadas. Para urgências: máximo 24h por lei.'],
      ['Rol ANS', 'Lista de procedimentos obrigatórios. Não pode ser negado pela operadora.']
    ];
    out += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:10px 0 5px">Glossário</div>';
    glosRede.forEach(function(g) {
      out += '<div class="base-item"><div class="bi-titulo">' + h(g[0]) + '</div><div class="bi-desc">' + h(g[1]) + '</div></div>';
    });

  } else if (cat === 'tel') {
    BASE.telefones.forEach(function(t) {
      var numEsc = (t.num || '').replace(/"/g, '&quot;');
      var msgEsc = (t.nome + ' copiado').replace(/"/g, '&quot;');
      out += '<div class="base-item">';
      out += '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">';
      out += '<div>';
      out += '<div class="bi-titulo">' + h(t.nome) + '</div>';
      if (t.num) out += '<div style="font-size:20px;font-weight:700;color:#1a1a1a;letter-spacing:.02em;margin:4px 0">' + h(t.num) + '</div>';
      out += '<div class="bi-desc">' + h(t.desc) + '</div>';
      out += '</div>';
      out += '<div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0;margin-top:2px">';
      if (t.num) out += '<button class="bi-tag azul" style="cursor:pointer" data-copy="' + numEsc + '" data-msg="' + msgEsc + '">📞 Copiar</button>';
      if (t.link) out += '<a href="' + h(t.link) + '" target="_blank" class="bi-tag azul" style="text-decoration:none">🌐 Abrir</a>';
      out += '</div>';
      out += '</div>';
      out += '</div>';
    });
  } else if (cat === 'fluxo') {
    BASE.fluxos.forEach(function(f) {
      out += '<div class="base-item"><div class="bi-titulo">' + h(f.nome) + '</div><div class="bi-desc">' + h(f.desc) + '</div></div>';
    });
  } else if (cat === 'materiais') {
    // Biblioteca de consulta rápida — sem duplicar protocolos clínicos
    var biblioteca = [
      // Manuais operacionais
      { titulo:'Manual — Interconsulta',                key:'interconsulta',       grupo:'Manuais operacionais' },
      { titulo:'Manual — Programa Pinguim',             key:'manual_pinguim',       grupo:'Manuais operacionais' },
      { titulo:'Manual — Programa Busca Ativa',         key:'manual_busca_ativa',   grupo:'Manuais operacionais' },
      { titulo:'Manual — Desconto / Isenção',           key:'desconto_isencao',     grupo:'Manuais operacionais' },
      { titulo:'Manual — Renovação de Receitas',        key:'renovacao_receita',    grupo:'Manuais operacionais' },
      // Materiais de apoio
      { titulo:'Plano de Parto',                        key:'plano_parto',          grupo:'Materiais de apoio' },
      { titulo:'Máscaras para Prontuário',              key:'mascaras_prontuario',  grupo:'Materiais de apoio' },
      { titulo:'Material de Apoio — Nilo Saúde',        key:'material_nilo',        grupo:'Materiais de apoio' },
      { titulo:'Playbook Nilo Saúde',                   key:'playbook_nilo',        grupo:'Materiais de apoio' },
      { titulo:'Declaração de Atendimento',             key:'declaracao_atend',     grupo:'Materiais de apoio' },
      { titulo:'Templates Droz',                        key:'templates_droz',       grupo:'Materiais de apoio' },
      { titulo:'Meses Coloridos',                       key:'meses_coloridos',      grupo:'Materiais de apoio' },
      { titulo:'Níveis de Complexidade',                key:'niveis_complexidade',  grupo:'Materiais de apoio' },
    ];

    // Agrupar por grupo
    var grupos = {};
    biblioteca.forEach(function(m) {
      if (!grupos[m.grupo]) grupos[m.grupo] = [];
      grupos[m.grupo].push(m);
    });

    Object.keys(grupos).forEach(function(grp) {
      out += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:12px 0 6px">' + h(grp) + '</div>';
      grupos[grp].forEach(function(m) {
        var url = LINKS_DOCS[m.key] || '';
        out += '<div class="base-item" style="display:flex;align-items:center;justify-content:space-between;gap:10px">';
        out += '<div class="bi-titulo"' + (url ? '' : ' style="color:#a0a09c"') + '>' + h(m.titulo) + '</div>';
        if (url) {
          out += '<a href="' + h(url) + '" target="_blank" class="bi-tag azul" style="text-decoration:none;flex-shrink:0">📄 Abrir ↗</a>';
        } else {
          out += '<span class="bi-tag" style="color:#a0a09c;flex-shrink:0">Em breve</span>';
        }
        out += '</div>';
      });
    });
  }

  el.innerHTML = out;
}

function abrirProtocolo(id) {
  var p = BASE.protocolos.find(function(x) { return x.id === id; });
  if (!p) return;
  var el = document.getElementById('base-items');
  var out = '';

  out += '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px">';
  out += '<button class="bi-tag azul" style="cursor:pointer" data-action="filtrarBase" data-val="' + h(p.cat) + '">← Voltar</button>';
  out += '<span style="font-size:14px;font-weight:600">' + h(p.titulo) + (p.urg ? ' <span class="bi-tag verm">URGENTE</span>' : '') + '</span>';
  if (p.drive) {
    out += '<a href="' + h(p.drive) + '" target="_blank" class="bi-tag azul" style="text-decoration:none;white-space:nowrap">📄 Doc oficial ↗</a>';
  }
  out += '</div>';

  // Resumo
  out += '<div class="base-item">';
  out += '<div class="bi-titulo">Resumo</div>';
  out += '<div class="bi-desc">' + h(p.resumo) + '</div>';
  out += '</div>';

  // Perguntas essenciais
  if (p.perguntas && p.perguntas.length) {
    out += '<div class="base-item">';
    out += '<div class="bi-titulo">Perguntas essenciais</div>';
    p.perguntas.forEach(function(q) {
      out += '<div class="bi-desc" style="padding:4px 0;border-bottom:1px solid rgba(0,0,0,.05)">→ ' + h(q) + '</div>';
    });
    out += '</div>';
  }

  // Acolhimento
  if (p.ori) {
    var txtOri = p.ori('[Nome]', '[Enf]');
    out += '<div class="base-item">';
    out += '<div class="bi-titulo" style="display:flex;justify-content:space-between">Acolhimento sugerido <button class="bi-tag azul" style="cursor:pointer;font-weight:400" data-copy="' + txtOri.replace(/"/g,'&quot;').replace(/\n/g,'&#10;') + '" data-msg="Acolhimento copiado">Copiar</button></div>';
    out += '<div class="bi-desc" style="white-space:pre-wrap;font-size:11px">' + h(txtOri) + '</div>';
    out += '</div>';
  }

  // Encaminhamentos
  if (p.dirs && p.dirs.length) {
    out += '<div class="base-item">';
    out += '<div class="bi-titulo">Encaminhamentos</div>';
    p.dirs.forEach(function(d) {
      var url = BASE.links[d.t] || '#';
      out += '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.05)">';
      out += '<div><div style="font-size:12px;font-weight:600">' + h(d.l) + '</div><div style="font-size:11px;color:#6b6b68">' + h(d.m) + '</div></div>';
      out += '<button class="bi-tag azul" style="cursor:pointer" data-copy="' + h(url) + '" data-msg="Link copiado">Copiar link</button>';
      out += '</div>';
    });
    out += '</div>';
  }

  // Alarmes
  if (p.alarmes && p.alarmes.length) {
    out += '<div class="base-item" style="border-left:3px solid #dc2626">';
    out += '<div class="bi-titulo">Sinais de alarme</div>';
    p.alarmes.forEach(function(al) {
      out += '<div class="bi-desc" style="color:#dc2626;padding:3px 0">⚠ ' + h(al) + '</div>';
    });
    out += '</div>';
  }

  // Tags
  out += '<div class="bi-tags" style="margin-top:8px">';
  (p.tags || []).forEach(function(t) { out += '<span class="bi-tag">' + h(t) + '</span>'; });
  out += '</div>';

  el.innerHTML = out;
}


function buscarBase(q) {
  if (!q || q.length < 2) { filtrarBase(baseCat); return; }
  var res = BASE.search(q);
  var el = document.getElementById('base-items');
  if (!res.length) {
    el.innerHTML = '<div style="padding:20px;text-align:center;color:#a0a09c;font-size:13px">Nenhum resultado para "' + h(q) + '"</div>';
    return;
  }
  var tipoC = { 'Protocolo':'azul', 'COFEN 801':'', 'Operadora':'verde', 'Telefone':'', 'Fluxo':'' };
  var out = '';
  res.forEach(function(r) {
    out += '<div class="base-item"><div class="bi-titulo">' + h(r.titulo) + '</div>';
    out += '<div class="bi-desc">' + h(r.desc) + '</div>';
    out += '<div class="bi-tags"><span class="bi-tag ' + (tipoC[r.tipo] || '') + '">' + h(r.tipo) + '</span>';
    if (r.num) out += '<span class="bi-tag azul" style="cursor:pointer" data-action="cpTxtDireto" data-json="' + JSON.stringify(r.num) + '" data-msg="Copiado ✓">Copiar</span>';
    if (r.link) out += '<a href="' + h(r.link) + '" target="_blank" class="bi-tag azul" style="text-decoration:none">Abrir ↗</a>';
    out += '</div></div>';
  });
  el.innerHTML = out;
}

// ── PASSAGEM DE PLANTÃO ───────────────────────────────────
function renderPassagem() {
  var p = plantaoAtivo();
  var todos = p ? (p.a || []) : [];
  var enc = todos.filter(function(a) { return a.status === 'enc'; });
  var pend = todos.filter(function(a) { return a.status !== 'enc'; });
  var now = new Date();
  var hora = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  var out = '';

  // Cabeçalho do plantão
  out += '<div style="background:#fff;border:1px solid rgba(0,0,0,.09);border-radius:9px;padding:13px;margin-bottom:8px">';
  out += '<div style="font-size:14px;font-weight:600;margin-bottom:3px">Passagem de plantão</div>';
  out += '<div style="font-size:12px;color:#6b6b68">' + h(p ? p.e : '') + ' · ' + h(p ? p.h : '') + ' · ' + h(p ? p.data : '') + '</div>';
  out += '</div>';

  // Contadores
  var stats = [
    { n: todos.length, l: 'Total', c: false },
    { n: enc.length, l: 'Encerrados', c: false },
    { n: pend.length, l: 'Pendentes', c: pend.length > 0 }
  ];
  out += '<div style="display:flex;gap:7px;margin-bottom:12px">';
  stats.forEach(function(s) {
    out += '<div style="flex:1;background:#fff;border:1px solid rgba(0,0,0,.09);border-radius:8px;padding:10px;text-align:center">';
    out += '<div style="font-size:20px;font-weight:600;color:' + (s.c ? '#b45309' : '#1a1a1a') + '">' + s.n + '</div>';
    out += '<div style="font-size:11px;color:#a0a09c">' + s.l + '</div></div>';
  });
  out += '</div>';

  // Pendentes primeiro — quem assume o plantão precisa ver isso
  if (pend.length > 0) {
    out += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#b45309;margin-bottom:6px">⚠ Pendentes para o próximo plantão</div>';
    pend.forEach(function(a) { out += cardPassagem(a, false); });
    out += '<div style="height:10px"></div>';
  }

  // Encerrados
  if (enc.length > 0) {
    out += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin-bottom:6px">Encerrados neste plantão</div>';
    enc.forEach(function(a) { out += cardPassagem(a, true); });
  }

  // Resumo texto para copiar
  var resumo = gerarResumoPassagem(enc, pend, hora);
  out += '<div style="background:#f5f5f3;border-radius:8px;padding:11px 12px;font-size:12px;line-height:1.8;color:#1a1a1a;white-space:pre-wrap;margin:12px 0 8px">' + h(resumo) + '</div>';
  var resumoEsc = resumo.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  out += '<button style="width:100%;padding:10px;font-size:13px;font-weight:600;background:#1a1a1a;color:#fff;border:none;border-radius:7px;cursor:pointer;margin-bottom:8px" data-copy="' + h(resumo).replace(/&#10;/g, '\n') + '" data-msg="Resumo copiado ✓">Copiar resumo da passagem</button>';
  // Botão copiar passagem completa
  out += '<button style="width:100%;padding:10px;font-size:13px;font-weight:600;background:#1d4ed8;color:#fff;border:none;border-radius:7px;cursor:pointer;margin-bottom:8px" data-action="copiarPassagemCompleta">📋 Copiar passagem completa</button>';
  out += '<button style="width:100%;padding:10px;font-size:13px;font-weight:600;background:#fff;color:#dc2626;border:1px solid #dc2626;border-radius:7px;cursor:pointer" data-action="encerrarPlantao">Encerrar plantão e iniciar novo</button>';

  // Histórico de plantões anteriores
  var anteriores = db.plantoes.filter(function(p2) { return p2.id !== db.ativo && p2.encerradoEm; });
  if (anteriores.length > 0) {
    out += '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#a0a09c;margin:16px 0 6px">Plantões anteriores</div>';
    anteriores.forEach(function(p2) {
      var totalA = (p2.a || []).length;
      var encA = (p2.a || []).filter(function(a) { return a.status === 'enc'; }).length;
      out += '<div style="background:#fff;border:1px solid rgba(0,0,0,.09);border-radius:8px;padding:10px 12px;margin-bottom:6px;cursor:pointer" data-action="verPlantaoArq" data-val="' + p2.id + '">';
      out += '<div style="font-size:13px;font-weight:600">' + h(p2.data) + ' — ' + h(p2.e) + '</div>';
      out += '<div style="font-size:11px;color:#6b6b68;margin-top:2px">' + h(p2.h) + ' · ' + totalA + ' atendimentos · ' + encA + ' encerrados</div>';
      out += '</div>';
    });
  }

  document.getElementById('passagem-body').innerHTML = out;
}

// Card de atendimento na passagem — rico e clicável
function cardPassagem(a, ok) {
  var pass = a.passagem || {};
  var det  = ((a.mem && a.mem.encFeitos) || []).join(', ');
  var ts   = ok ? fmtTs(a.encTs) : tempo(a.ts);
  var avCor = a.avaliacao === 'Resolvido' ? '#16a34a'
            : a.avaliacao === 'Parcialmente resolvido' ? '#b45309'
            : a.avaliacao === 'Não resolvido' ? '#dc2626'
            : '#a0a09c';
  var borderCor = !ok ? '#f59e0b' : ok && a.avaliacao === 'Não resolvido' ? '#fca5a5' : 'rgba(0,0,0,.09)';

  var html = '<div style="background:#fff;border:1.5px solid ' + borderCor + ';border-radius:9px;padding:13px;margin-bottom:8px">';

  // ── Cabeçalho: nome + status ─────────────────────────────
  html += '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:5px">';
  html += '<div style="font-size:13px;font-weight:600">' + h(a.pac || '') + ' — ' + h(a.motivo || 'A identificar') + '</div>';
  html += '<span style="font-size:10px;padding:2px 8px;border-radius:99px;flex-shrink:0;white-space:nowrap;' + (ok ? 'background:#f0fdf4;color:#16a34a' : 'background:#fffbeb;color:#b45309') + '">' + (ok ? '✓ Encerrado' : '⚠ Pendente') + '</span>';
  html += '</div>';

  // Ticket + horário
  html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">';
  html += ticketBadge(a.ticket);
  html += '<span style="font-size:10px;color:#a0a09c">' + h(ts) + '</span>';
  html += '</div>';

  // ── 5 campos de passagem ─────────────────────────────────
  function campo(icon, label, valor, cor) {
    if (!valor) return '';
    return '<div style="margin-bottom:6px">'
      + '<span style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:' + (cor || '#a0a09c') + '">' + icon + ' ' + label + '</span>'
      + '<div style="font-size:12px;color:#1a1a1a;margin-top:2px;padding:5px 8px;background:#f9f9f8;border-radius:5px">' + h(valor) + '</div>'
      + '</div>';
  }

  // Resumo: usar passagem.resumo se preenchido, senão fallback para ctx
  var resumoTxt = pass.resumo || (a.ctx ? a.ctx.substring(0, 200) + (a.ctx.length > 200 ? '…' : '') : '');
  html += campo('📋', 'Resumo', resumoTxt, '#6b6b68');
  html += campo('✅', 'Ações realizadas', pass.feito || det || '', '#16a34a');

  if (pass.pendencia || (!ok && (a.mem && a.mem.pendentes && a.mem.pendentes.length > 0))) {
    var pendTxt = pass.pendencia || ((a.mem.pendentes || []).slice(0,2).join(' · '));
    html += campo('⏳', 'Pendências', pendTxt, '#b45309');
  }

  if (pass.responsavel || pass.prazo) {
    html += '<div style="display:flex;gap:8px;margin-bottom:6px">';
    if (pass.responsavel) {
      html += '<div style="flex:1"><span style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#1d4ed8">👤 Responsável</span>'
           + '<div style="font-size:12px;font-weight:600;color:#1a1a1a;margin-top:2px;padding:5px 8px;background:#eff6ff;border-radius:5px">' + h(pass.responsavel) + '</div></div>';
    }
    if (pass.prazo) {
      html += '<div style="flex:1"><span style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#7c3aed">🕐 Prazo</span>'
           + '<div style="font-size:12px;color:#1a1a1a;margin-top:2px;padding:5px 8px;background:#f5f3ff;border-radius:5px">' + h(pass.prazo) + '</div></div>';
    }
    html += '</div>';
  }

  // Avaliação
  if (a.avaliacao) {
    html += '<div style="font-size:11px;padding:4px 8px;border-radius:5px;background:' + (ok && a.avaliacao === 'Resolvido' ? '#f0fdf4' : '#fafafa') + ';color:' + avCor + ';margin-top:2px">' + h(a.avaliacao) + '</div>';
  }

  html += '</div>';
  return html;
}

function encerrarPlantao() {
  if (!confirm('Encerrar este plantão e começar um novo?')) return;
  var p = plantaoAtivo();
  if (p) p.encerradoEm = Date.now();
  db.ativo = null;
  salvar();
  // Voltar para tela de entrada
  document.getElementById('app').style.display = 'none';
  document.getElementById('entrada').style.display = 'flex';
  document.getElementById('fab').style.display = 'none';
}

function verPlantaoArq(pid) {
  var p = db.plantoes.find(function(x) { return x.id === pid; });
  if (!p) return;
  var todos = p.a || [];
  var enc = todos.filter(function(a) { return a.status === 'enc'; });
  var pend = todos.filter(function(a) { return a.status !== 'enc'; });
  var resumo = 'Plantão ' + p.data + ' — ' + p.e + ' — ' + p.h + '\n';
  resumo += 'Total: ' + todos.length + ' · ' + enc.length + ' encerrados · ' + pend.length + ' pendentes\n\n';
  enc.forEach(function(a) {
    var ef = ((a.mem && a.mem.encFeitos) || []).join(', ') || 'sem encaminhamento';
    var av = a.avaliacao ? ' [' + a.avaliacao + ']' : '';
    resumo += '✓ ' + (a.pac || '') + ' — ' + (a.motivo || '') + ' — ' + ef + av + '\n';
  });
  if (pend.length) {
    resumo += '\nPENDENTES:\n';
    pend.forEach(function(a) { resumo += '⚠ ' + (a.pac || '') + ' — ' + (a.motivo || '') + '\n'; });
  }
  alert(resumo);
}


function gerarResumoPassagem(enc, pend, hora) {
  var p = plantaoAtivo();
  var txt = 'Passagem de plantão — ' + (p ? p.e : '') + ' — ' + (p ? p.h : '') + ' — ' + (p ? p.data : '') + '\nGerada às ' + hora + '\n\n';
  var todos = atendimentos();
  txt += 'Total: ' + todos.length + ' · ' + enc.length + ' encerrados · ' + pend.length + ' pendentes\n\n';
  if (enc.length > 0) {
    txt += 'ENCERRADOS:\n';
    enc.forEach(function(a) {
      var ef = ((a.mem && a.mem.encFeitos) || []).join(', ') || 'sem encaminhamento';
      txt += '✓ ' + (a.pac || '') + ' — ' + (a.motivo || 'A identificar') + ' — ' + ef + '\n';
    });
  }
  if (pend.length > 0) {
    txt += '\nPENDENTES:\n';
    pend.forEach(function(a) {
      txt += '⚠ ' + (a.pac || '') + ' — ' + (a.motivo || 'A identificar') + ' — ' + (a.prox || 'aguardando') + '\n';
    });
  }
  return txt;
}


// ── CONFIGURAÇÕES ─────────────────────────────────────────
function abrirConfig() {
  var p = plantaoAtivo();
  document.getElementById('cfg-nome').value = p ? (p.e || '') : '';
  document.getElementById('cfg-horario').value = p ? (p.h || '20:00-07:00') : '20:00-07:00';
  document.getElementById('m-config').style.display = 'flex';
}
function salvarConfig() {
  var nome = document.getElementById('cfg-nome').value.trim();
  var hor  = document.getElementById('cfg-horario').value;
  var p = plantaoAtivo();
  if (p) {
    if (nome) p.e = nome;
    if (hor)  p.h = hor;
    salvar();
    document.getElementById('tb-info').textContent = p.e ? '(' + p.e + ')' : '';
  }
  fecharModal('m-config');
}


// ── PASSAGEM DE PLANTÃO — COPIAR TEXTO COMPLETO ───────────────
function copiarPassagemCompleta() {
  var p = plantaoAtivo();
  if (!p) return;
  var todos = p.a || [];
  var pend  = todos.filter(function(a) { return a.status !== 'enc'; });
  var enc   = todos.filter(function(a) { return a.status === 'enc'; });
  var now   = new Date();
  var hora  = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');

  var txt = '═══════════════════════════════\n';
  txt += 'PASSAGEM DE PLANTÃO — ' + hora + '\n';
  txt += (p.e || 'Plantão') + ' · ' + (p.h || '') + ' · ' + (p.data || '') + '\n';
  txt += '═══════════════════════════════\n\n';

  txt += '📊 RESUMO: ' + todos.length + ' caso(s) · ' + enc.length + ' encerrado(s) · ' + pend.length + ' pendente(s)\n\n';

  if (pend.length > 0) {
    txt += '⚠ PENDENTES PARA O PRÓXIMO PLANTÃO\n';
    txt += '───────────────────────────────\n';
    pend.forEach(function(a, i) {
      var pass = a.passagem || {};
      txt += (i+1) + '. ' + (a.pac || '') + ' — ' + (a.motivo || 'A identificar') + '\n';
      if (a.ticket) txt += '   🔗 Ticket: ' + a.ticket + '\n';
      if (pass.resumo || a.ctx) txt += '   📋 Resumo: ' + (pass.resumo || (a.ctx||'').substring(0,120)) + '\n';
      if (pass.feito) txt += '   ✅ Realizado: ' + pass.feito + '\n';
      if (pass.pendencia) txt += '   ⏳ Pendência: ' + pass.pendencia + '\n';
      if (pass.responsavel) txt += '   👤 Responsável: ' + pass.responsavel + '\n';
      if (pass.prazo) txt += '   🕐 Prazo: ' + pass.prazo + '\n';
      txt += '\n';
    });
  }

  if (enc.length > 0) {
    txt += '✓ ENCERRADOS\n';
    txt += '───────────────────────────────\n';
    enc.forEach(function(a, i) {
      var pass = a.passagem || {};
      txt += (i+1) + '. ' + (a.pac || '') + ' — ' + (a.motivo || '') + ' [' + (a.avaliacao || 'sem avaliação') + ']\n';
      if (pass.feito) txt += '   Realizado: ' + pass.feito + '\n';
    });
    txt += '\n';
  }

  txt += '═══════════════════════════════\n';

  copiarTexto(txt,
    function() { notif('Passagem copiada ✓'); },
    function() { notif('Erro ao copiar — tente novamente'); }
  );
}



// ══════════════════════════════════════════════════════════════
// EVENT LISTENERS — substitui todos os onclick/oninput inline
// Necessário para CSP da extensão Chrome (sem eventos inline)
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {

  // Delegação global: captura cliques em qualquer elemento com data-action
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.getAttribute('data-action');
    var val    = el.getAttribute('data-val') || '';

    switch (action) {
      // ── Entrada ──────────────────────────────────────────
      case 'entrar':           entrar();           break;
      case 'restaurar':        restaurar();        break;
      case 'abrirConfig':      abrirConfig();      break;

      // ── Navegação principal ──────────────────────────────
      case 'ir':               ir(val);            break;

      // ── Atendimento ──────────────────────────────────────
      case 'voltarPlantao':    voltarPlantao();    break;
      case 'iniciarEnc':       iniciarEnc();       break;
      case 'analisar':         analisar();         break;
      case 'abrirLigacao':     abrirLigacao();     break;

      // ── Modais ────────────────────────────────────────────
      case 'fecharModal':      fecharModal(val);   break;
      case 'fecharModalNovo':  fecharModal('m-novo'); break;
      case 'fecharOverlay':
        if (e.target === el) fecharModal(val);
        break;
      case 'abrirModalNovo':   abrirModalNovo();   break;
      case 'abrirSug':
        var ms = document.getElementById('m-sug');
        if (ms) ms.classList.add('on');
        break;

      // ── Atendimento: criar / ligação ──────────────────────
      case 'criarAtend':       criarAtend();       break;
      case 'confirmarLig':     confirmarLig();     break;

      // ── Avaliação / passagem ──────────────────────────────
      case 'avaliar':          selecionarAvaliacao(el, val); break;
      case 'confirmarAvaliacao': confirmarAvaliacao(); break;

      // ── Sugestão ──────────────────────────────────────────
      case 'enviarSugestao':   enviarSugestao();   break;

      // ── Configurações ────────────────────────────────────
      case 'salvarConfig':     salvarConfig();     break;

      // ── Delegação existente ──────────────────────────────────
      case 'abrirProtocolo':        abrirProtocolo(val);        break;
      case 'filtrarBase':           filtrarBase(val);           break;
      case 'verPlantaoArq':         verPlantaoArq(val);         break;
      case 'cpData':                cpData(el);                 break;
      // ── Cards de atendimento ─────────────────────────────
      case 'irAtend':               irAtend(val);               break;
      // ── Checklist ────────────────────────────────────────
      case 'toggleCl':              toggleCl(val);              break;
      case 'encerrar':              encerrar();                 break;
      // ── Passagem de plantão ──────────────────────────────
      case 'encerrarPlantao':       encerrarPlantao();          break;
      case 'copiarPassagemCompleta':copiarPassagemCompleta();   break;
      // ── Atendimento — copiar/marcar ───────────────────────
      case 'copiarPorId':           copiarPorId(val);           break;
      case 'marcarOri':             marcarOri(val);             break;
      case 'marcarNilo':            marcarNilo(val);            break;
      case 'copiarLink': {
        var url2   = el.getAttribute('data-url')   || '';
        var label2 = el.getAttribute('data-label') || '';
        var id2    = el.getAttribute('data-id')    || '';
        copiarLink(el, url2, label2, id2);
        break;
      }
      case 'cpTxtDireto': {
        var jsonStr = el.getAttribute('data-json') || '""';
        var msg2    = el.getAttribute('data-msg')  || 'Copiado ✓';
        try {
          var decoded = jsonStr.replace(/&quot;/g, '"');
          cpTxtDireto(JSON.parse(decoded), msg2);
        } catch(e) { notif('Erro ao copiar'); }
        break;
      }
      case 'fecharDrive': {
        var md = document.getElementById('m-drive');
        if (md) md.style.display = 'none';
        break;
      }
      case 'abrirDriveConfig':  ppAbrirDriveConfig();  break;
      case 'extrairTransc':        ppExtrairManual();           break;
      case 'fecharDriveConfig':
        if (typeof ppAbrirDriveVista === 'function') ppAbrirDriveVista('busca');
        break;
      case 'driveConectar':     ppDriveConectar();     break;
      case 'driveDesconectar':  ppDriveDesconectar();  break;
    }
  });

  // Input para busca da base (oninput)
  var baseSearch = document.getElementById('base-search');
  if (baseSearch) {
    baseSearch.addEventListener('input', function() {
      buscarBase(this.value);
    });
  }

  // Tecla Enter / Ctrl+Enter na textarea de análise
  var upTa = document.getElementById('up-ta');
  if (upTa) {
    upTa.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        analisar();
      }
    });
  }

});
