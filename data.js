window.AM = {
  meta: {
    name: '~/André-Martins',
    role: 'Full-Stack Developer · Pleno-Sênior',
    org: 'BJGroup',
  },

  hero: {
    kicker: '~/André-Martins',
    greeting: 'Tiro sistema do papel e deixo no ar.',
    pitch:
      'Full-stack na BJGroup: lidero o TaxResearch (300+ empresas) e construí o OkCarro (1.000+ consultas/mês). Mentoro um júnior e mantenho 10+ apps na Oracle Cloud.',
    current: 'Aberto a freela remoto e vagas híbridas CLT/PJ.',
    metrics: [
      { value: '300+', label: 'empresas no TaxResearch' },
      { value: '1.000+', label: 'consultas/mês no OkCarro' },
      { value: '10+', label: 'apps na Oracle Cloud' },
    ],
    stack: ['Node.js', 'NestJS', 'Next.js', 'Flutter', 'PHP', 'Docker', 'Oracle Cloud'],
    ctas: [
      {
        label: 'Chamar no WhatsApp',
        href: 'https://wa.me/5519999855040?text=Ol%C3%A1%20Andr%C3%A9!%20Vi%20seu%20portf%C3%B3lio.',
        external: true,
      },
      { label: 'Ver o trabalho', href: '#work' },
    ],
  },

  projects: [
    {
      id: 'taxresearch',
      title: 'TaxResearch',
      tag: 'Plataforma fiscal',
      status: 'Em produção',
      lane: 'featured',
      live: 'https://ia.taxresearch.com.br/',
      brief: 'Análise fiscal no ar pra 300+ empresas — o comercial usa todo dia.',
      metric: '300+ empresas · 40 usuários internos',
      overview:
        'O comercial da BJGroup precisava prospectar e analisar empresas sem virar planilha. Lidero o TaxResearch de ponta a ponta: banco, API, painel e o pipeline que alimenta a base.',
      story: {
        problem: 'Prospecção e análise fiscal sem processo — o time comercial perdia tempo em planilha e pesquisa manual.',
        action: 'Lidero o produto (banco, APIs NestJS, painel Next.js), o pipeline de leads e o outreach no WhatsApp, mentorando um júnior.',
        result: '300+ clientes empresariais, 40 usuários internos e 600+ empresas prospectadas em produção.',
      },
      highlights: [
        'Liderança técnica do produto, com um dev júnior sob coordenação',
        'Pipeline de leads: Google Places + APIs de CNPJ — 600+ empresas prospectadas',
        'Outreach via WhatsApp (Baileys, Redis, BullMQ) com delay humanizado anti-ban',
      ],
      stack: ['Node.js', 'NestJS', 'Next.js', 'TypeScript', 'MySQL', 'Redis', 'BullMQ', 'Baileys'],
      mockup: 'taxresearch',
      preview: 'taxresearch',
    },
    {
      id: 'okcarro',
      title: 'OkCarro',
      tag: 'Consulta veicular',
      status: 'Em produção',
      lane: 'featured',
      live: 'https://okcarro.com.br/',
      brief: 'Placa entrou, dado saiu — 1.000+ consultas por mês.',
      metric: '1.000+ usuários/mês · fluxo de uma tela',
      overview:
        'Construí de ponta a ponta o OkCarro como uma aplicação de consulta veicular pensada pra devolver resultado rápido em um fluxo simples: placa entrou, dado saiu. Para essa simplicidade, usei API em NestJS, banco em MySQL e interface em Next.js.',
      story: {
        problem: 'Consulta veicular costuma ser lenta e cheia de passo. Quem vai comprar um carro quer o dado, não um formulário.',
        action: 'Desenhei o fluxo em uma tela e construí o produto inteiro: API NestJS, MySQL e interface Next.js, com cache e mobile-first.',
        result: '1.000+ usuários mensais em produção. Placa entra, histórico (batida, débito, leilão) sai.',
      },
      highlights: [
        '1.000+ usuários mensais em produção',
        'API própria em NestJS com validação e cache de consulta',
        'Frontend em Next.js otimizado pra mobile, onde está a maior parte do tráfego',
      ],
      stack: ['Next.js', 'NestJS', 'MySQL', 'TypeScript'],
      mockup: 'okcarro',
      preview: 'okcarro',
    },
    {
      id: 'ponto',
      title: 'App de Controle de Ponto',
      tag: 'Ferramenta interna',
      status: 'Em produção',
      lane: 'featured',
      brief: 'Foto + GPS na batida. Relatório do mês sai sozinho.',
      metric: '40 funcionários · sem planilha no fechamento',
      overview:
        'App web pra controle de ponto em múltiplas unidades: cada registro exige foto e geolocalização; o painel da gestão permite cadastrar e acompanhar filiais e trabalhadores itinerantes; e no fechamento do mês, o relatório de horas sai automaticamente pra contabilidade — sem necessidade de planilha manual.',
      story: {
        problem: 'Ponto em várias unidades ia pra planilha. Contabilidade fechava o mês na mão, e itinerante não tinha como provar a batida.',
        action: 'App web com foto + GPS em cada registro, painel multi-filial e relatório mensal automático pra contabilidade.',
        result: '40 funcionários em produção. Fechamento de horas sem planilha manual.',
      },
      highlights: [
        '40 funcionários, múltiplas unidades',
        'Validação de registro por foto + geolocalização',
        'Painel de gestão multi-local (filiais e itinerantes)',
        'Relatório mensal de horas automático pra contabilidade',
      ],
      stack: ['Next.js', 'NestJS', 'Supabase'],
      preview: 'ponto',
    },
    {
      id: 'afiliados',
      title: 'Bot de Afiliados Mercado Livre',
      tag: 'Automação',
      status: 'Em produção',
      lane: 'more',
      brief: 'Oferta entra no grupo, link de afiliado sai em 10 canais.',
      overview:
        'Pipeline end-to-end: captura ofertas em grupos externos, gera automaticamente os links de afiliado, categoriza o conteúdo e distribui pra 10 canais de WhatsApp por categoria — cada um com 100+ participantes.',
      story: {
        problem: 'Repassar oferta de afiliado na mão não escala — e cada atraso perde clique.',
        action: 'Bot que captura a oferta, gera o link, categoriza e dispara nos canais certos.',
        result: '10 canais de WhatsApp, 100+ participantes cada, rodando sozinho.',
      },
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
      lane: 'more',
      brief: 'Treino gerado por IA, levando lesão e objetivo em conta.',
      overview:
        'Aplicativo mobile em Flutter usando a NVIDIA NIM API. O app objetiva gerar planos de treino personalizado que levam em consideração lesões, histórico e objetivo de cada usuário. Em produção, com usuários ativos reais treinando com os planos gerados.',
      story: {
        problem: 'Plano genérico de academia ignora lesão, histórico e o que a pessoa realmente quer.',
        action: 'App Flutter que manda o contexto pra NVIDIA NIM e devolve treino personalizado.',
        result: 'Em produção, com gente treinando de verdade com o plano gerado.',
      },
      highlights: [
        'Geração de treino via IA (NVIDIA NIM API)',
        'Considera lesões, histórico e objetivos individuais',
        'App mobile em produção com usuários ativos',
      ],
      stack: ['Flutter', 'Dart', 'NVIDIA NIM API'],
    },
    {
      id: 'oracle-infra',
      title: 'Oracle Cloud',
      tag: 'DevOps · Infra',
      status: 'Em produção',
      lane: 'ship',
      brief: '10+ apps em Docker, firewall e roteamento do zero no Always Free.',
      overview:
        'Configurei do absoluto zero um servidor na camada Always Free da Oracle Cloud: stack completa de segurança, firewall, roteamento e escalabilidade, sem nenhuma configuração prévia pra herdar. Hoje sustenta mais de 10 aplicações em Docker rodando em paralelo.',
      story: {
        problem: 'Produto no ar precisa de casa. Sem herdar stack pronta, e sem gastar com cloud cara no começo.',
        action: 'Servidor Oracle Always Free do zero: firewall, roteamento, Docker, os 10+ apps lado a lado.',
        result: 'TaxResearch, OkCarro e o resto no ar no mesmo host, custo zero de infra.',
      },
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
      lane: 'ship',
      brief: 'Gera e publica site de negócio local no Cloudflare, no automático.',
      overview:
        'Esse projeto paralelo consiste em monorepo pnpm que gera e publica sites profissionais pra negócios locais de forma automatizada, com scraper próprio (Google Places API + APIs de CNPJ) alimentando a prospecção e deploy direto no Cloudflare Pages.',
      story: {
        problem: 'Negócio local precisa de site. Montar um a um não paga o tempo.',
        action: 'Monorepo que raspa dado (Places + CNPJ), gera o site e publica no Cloudflare Pages.',
        result: 'Pipeline de prospecção + deploy, sem abrir o painel da nuvem na mão.',
      },
      highlights: [
        'Arquitetura monorepo com pnpm',
        'Deploy automatizado no Cloudflare Pages',
        'Scraper de prospecção (Google Places API + APIs de CNPJ)',
      ],
      stack: ['Astro', 'Tailwind CSS', 'TypeScript', 'Cloudflare Pages', 'pnpm'],
    },
  ],

  about: {
    headline: 'Olho o fluxo real antes da arquitetura.',
    pull:
      'Em algum momento, todo sistema que eu uso me desperta a vontade de saber como ele funciona por dentro. <br> Foi assim que fui parar em ERP, depois em infra, depois em automação.',
    paragraphs: [
      'Comecei a programar em Delphi/ERP na Wisesoft, automatizando processo manual e escrevendo API em que só existiam planilhas. De lá pra cá, migrei a produção, o grosso do dia a dia, pra Node.js e TypeScript. Mesmo com essas mudanças, o instinto continua o mesmo: olhar o fluxo real de quem usa antes de decidir a arquitetura.',
      'Hoje oriento e trabalho com um dev júnior na BJGroup. Aqui, uso IA (Cursor, Claude) de forma pesada como multiplicador de produtividade — e é o que viabiliza tocar produto principal e projetos paralelos ao mesmo tempo sem perder a qualidade.',
      'Fora do teclado, gosto de ter controle total do meu próprio ambiente virtual: rodo Arch Linux com BSPWM, sincronizo dotfiles entre as máquinas de casa e do trabalho, e vivo ajustando alguma automação nova. Treino luta e academia com a mesma regularidade que subo deploy e estou estudando investimentos por conta própria, porque gosto de entender o sistema antes de confiar nele.',
    ],
    signoff: 'O contato tá logo abaixo — ou no cartão digital. Caso preferir, já pode chamar pelo WhatsApp.',
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
    text: '~/André-Martins — construído com HTML, CSS e JS puro. Sem framework, sem pressa.',
  },
};
