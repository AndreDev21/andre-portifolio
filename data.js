window.AM = {
  meta: {
    name: '>/André Martins',
    role: 'Full-Stack Developer · Pleno-Sênior',
    org: 'BJGroup',
  },

  hero: {
    kicker: '~/andre',
    greeting: 'Olá, me chamo André',
    pitch:
      'Comecei mexendo em ERP e automação, e isso me ensinou uma coisa: sistema bom não é o que tem mais feature, é o que não trava a operação de quem usa. Hoje isso guia todo projeto que construo — do banco de dados ao deploy.',
    current:
      'Atualmente na BJGroup, lidero o TaxResearch, coordeno e mentoro um dev júnior, e mantenho no ar mais de 10 aplicações containerizadas em um servidor Oracle Cloud que configurei do zero.',
    stack: ['Node.js', 'NestJS', 'Next.js', 'Flutter', 'PHP', 'Docker', 'Oracle Cloud'],
    ctas: [
      { label: 'Ver projetos', href: '#work' },
      { label: 'Cartão de contato', href: 'contacts/', external: true },
    ],
  },

  projects: [
    {
      id: 'taxresearch',
      title: 'TaxResearch',
      tag: 'Plataforma fiscal',
      status: 'Em produção',
      live: 'https://ia.taxresearch.com.br/',
      brief: 'Sistema de análise fiscal atendendo 300+ clientes empresariais e 40 usuários internos.',
      overview:
        'Lidero o desenvolvimento da plataforma TaxResearch na BJGroup: da modelagem de banco de dados às APIs e ao painel que a equipe comercial usa todo dia. Também construí, do zero, o pipeline de captação de leads que hoje alimenta a base comercial e a automação de outreach via WhatsApp.',
      highlights: [
        'Liderança técnica do produto, com um dev júnior sob coordenação',
        'Pipeline de leads: Google Places API + APIs de CNPJ (BrasilAPI, ReceitaWS, cnpj.ws) — 600+ empresas prospectadas',
        'Automação de outreach via WhatsApp (Node.js, Baileys, Redis, BullMQ) com delays humanizados anti-ban',
        'APIs backend em NestJS e frontend em Next.js/TypeScript',
      ],
      stack: ['Node.js', 'NestJS', 'Next.js', 'TypeScript', 'MySQL', 'Redis', 'BullMQ', 'Baileys'],
      mockup: 'taxresearch',
      mockupViews: [
        { id: 'painel', label: 'Painel' },
        { id: 'leads', label: 'Leads' },
        { id: 'outreach', label: 'Outreach' },
      ],
    },
    {
      id: 'okcarro',
      title: 'OkCarro',
      tag: 'Consulta veicular',
      status: 'Em produção',
      live: 'https://okcarro.com.br/',
      brief: 'Aplicação de consulta veicular servindo 1.000+ usuários mensais.',
      overview:
        'Construí a aplicação de consulta veicular OkCarro de ponta a ponta — API em NestJS, banco em MySQL e interface em Next.js — pensada pra devolver resultado rápido em um fluxo simples: placa entrou, dado saiu.',
      highlights: [
        '1.000+ usuários mensais em produção',
        'API própria em NestJS com validação e cache de consulta',
        'Frontend em Next.js otimizado pra mobile, onde está a maior parte do tráfego',
      ],
      stack: ['Next.js', 'NestJS', 'MySQL', 'TypeScript'],
    },
    {
      id: 'ponto',
      title: 'App de Controle de Ponto',
      tag: 'Ferramenta interna',
      status: 'Em produção',
      brief: 'Registro de ponto com validação por foto e geolocalização para 40 funcionários.',
      overview:
        'App web pra controle de ponto em múltiplas unidades: cada batida exige foto e geolocalização, e o painel de gestão configura filiais e trabalhadores itinerantes. No fechamento do mês, o relatório de horas sai automaticamente pra contabilidade — sem planilha manual.',
      highlights: [
        '40 funcionários, múltiplas unidades',
        'Validação de registro por foto + geolocalização',
        'Painel de gestão multi-local (filiais e itinerantes)',
        'Relatório mensal de horas automático pra contabilidade',
      ],
      stack: ['Next.js', 'NestJS', 'Supabase'],
    },
    {
      id: 'afiliados',
      title: 'Bot de Afiliados Mercado Livre',
      tag: 'Automação',
      status: 'Em produção',
      brief: 'Pipeline que capta ofertas, gera links de afiliado e distribui por WhatsApp.',
      overview:
        'Pipeline end-to-end: captura ofertas em grupos externos, gera automaticamente os links de afiliado, categoriza o conteúdo e distribui pra 10 canais de WhatsApp por categoria — cada um com 100+ participantes.',
      highlights: [
        '10 canais de WhatsApp, 100+ participantes cada',
        'Geração automática de link de afiliado',
        'Categorização automática de ofertas',
      ],
      stack: ['Node.js', 'Baileys', 'WhatsApp'],
    },
    {
      id: 'personal-trainer',
      title: 'App Personal Trainer com IA',
      tag: 'Mobile · IA',
      status: 'Em produção',
      brief: 'Planos de treino personalizados por IA, com base em lesões, histórico e objetivos.',
      overview:
        'App mobile em Flutter que gera plano de treino personalizado usando a NVIDIA NIM API, considerando lesões, histórico e objetivo de cada usuário. Em produção, com usuários ativos reais treinando com os planos gerados.',
      highlights: [
        'Geração de treino via IA (NVIDIA NIM API)',
        'Considera lesões, histórico e objetivos individuais',
        'App mobile em produção com usuários ativos',
      ],
      stack: ['Flutter', 'Dart', 'NVIDIA NIM API'],
    },
    {
      id: 'oracle-infra',
      title: 'Infraestrutura Oracle Cloud',
      tag: 'DevOps · Infra',
      status: 'Em produção',
      brief: 'Servidor cloud configurado do zero, hospedando 10+ apps containerizadas.',
      overview:
        'Configurei um servidor na camada Always Free da Oracle Cloud do absoluto zero: stack completa de segurança, firewall, roteamento e escalabilidade, sem nenhuma configuração prévia pra herdar. Hoje sustenta mais de 10 aplicações em Docker rodando em paralelo, incluindo TaxResearch e OkCarro.',
      highlights: [
        '10+ aplicações containerizadas em produção',
        'Firewall, roteamento e segurança configurados do zero',
        'Custo de infra: Oracle Cloud Always Free tier',
      ],
      stack: ['Oracle Cloud', 'Docker', 'Arch Linux'],
    },
    {
      id: 'site-factory',
      title: 'Site Factory',
      tag: 'Automação · Growth',
      status: 'Projeto paralelo',
      brief: 'Pipeline automatizado de geração e deploy de sites pra negócios locais.',
      overview:
        'Projeto paralelo: monorepo pnpm que gera e publica sites profissionais pra negócios locais de forma automatizada, com scraper próprio (Google Places API + APIs de CNPJ) alimentando a prospecção e deploy direto no Cloudflare Pages.',
      highlights: [
        'Arquitetura monorepo com pnpm',
        'Deploy automatizado no Cloudflare Pages',
        'Scraper de prospecção (Google Places API + APIs de CNPJ)',
      ],
      stack: ['Astro', 'Tailwind CSS', 'TypeScript', 'Cloudflare Pages', 'pnpm'],
    },
  ],

  about: {
    headline: 'Antes de ser profissão, era curiosidade.',
    pull:
      'Todo sistema que eu uso, em algum momento, eu quero saber como funciona por dentro. <br> Foi assim que fui parar em ERP, depois em infra, depois em automação.',
    paragraphs: [
      'Comecei em Delphi/ERP na Wisesoft, automatizando processo manual e escrevendo API onde só existia planilha. De lá pra cá, migrei o grosso do dia a dia pra Node.js e TypeScript, mas o instinto continua o mesmo: olhar o fluxo real de quem usa antes de decidir a arquitetura.',
      'Hoje coordeno e mentoro um dev júnior na BJGroup, e uso IA (Cursor, Claude) de forma pesada como multiplicador de produtividade — é o que viabiliza tocar produto principal e projetos paralelos ao mesmo tempo sem perder qualidade.',
      'Fora do teclado, gosto de ter controle total do próprio ambiente: rodo Arch Linux com BSPWM, sincronizo dotfiles entre as máquinas de casa e trabalho, e vivo ajustando alguma automação nova. Treino luta e academia com a mesma regularidade que subo deploy — e estou estudando investimentos por conta própria, porque gosto de entender o sistema antes de confiar nele.',
    ],
    signoff: 'O contato tá logo abaixo — ou no cartão digital, se você preferir já chamar no WhatsApp.',
  },

  contact: {
    headline: 'Aberto a freela remoto e vagas híbridas CLT/PJ',
    text:
      'Se você tem um desafio técnico, uma vaga full-stack ou um projeto que precisa sair do papel, me chama. Respondo rápido, principalmente no WhatsApp.',
    channels: [
      { id: 'whatsapp', label: 'WhatsApp', value: '+55 19 99985-5040', href: 'https://wa.me/5519999855040?text=Ol%C3%A1%20Andr%C3%A9!%20Vi%20seu%20portf%C3%B3lio.', note: 'Canal preferido' },
      { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/andre-mattedi-martins', href: 'https://www.linkedin.com/in/andre-mattedi-martins/', note: 'Perfil profissional' },
      { id: 'github', label: 'GitHub', value: 'github.com/AndreDev21', href: 'https://github.com/AndreDev21', note: 'Código & projetos' },
      { id: 'email', label: 'E-mail', value: 'andredev2103@gmail.com', href: 'mailto:andredev2103@gmail.com', note: 'Assuntos formais' },
    ],
    cardCta: { label: 'Abrir cartão de contato digital', href: 'contacts/' },
    location: 'Serra Negra, SP · Brasil',
  },

  footer: {
    text: '&gt;/André Martins — construído com HTML, CSS e JS puro. Sem framework, sem pressa.',
  },
};
