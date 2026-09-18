(function () {
  'use strict';
  window.AM_MOCKUPS = window.AM_MOCKUPS || {};

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === 'html') node.innerHTML = attrs[k];
      else if (k === 'text') node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  var LEADS = [
    { name: 'Contabilidade Vértice ME', status: 'qualificado' },
    { name: 'Grupo Almeida Distribuidora', status: 'contatado' },
    { name: 'Nova Serra Comércio Ltda', status: 'novo' },
    { name: 'Fiscal Prime Consultoria', status: 'contatado' },
    { name: 'Bella Vista Alimentos S.A.', status: 'novo' },
  ];

  function renderPainel() {
    var view = el('div', { class: 'mockup-view', id: 'tr-painel' });
    var kpis = el('div', { class: 'tr-kpis' }, [
      el('div', { class: 'tr-kpi' }, [el('span', { class: 'tr-kpi-value', text: '300+' }), el('span', { class: 'tr-kpi-label', text: 'clientes empresariais' })]),
      el('div', { class: 'tr-kpi' }, [el('span', { class: 'tr-kpi-value', text: '40' }), el('span', { class: 'tr-kpi-label', text: 'usuários internos' })]),
      el('div', { class: 'tr-kpi' }, [el('span', { class: 'tr-kpi-value', text: '623' }), el('span', { class: 'tr-kpi-label', text: 'empresas prospectadas' })]),
    ]);
    view.appendChild(kpis);
    var bars = el('div', { class: 'tr-bars' });
    [40, 55, 48, 70, 62, 80, 74, 90, 85, 96, 88, 100].forEach(function (h) {
      bars.appendChild(el('i', { style: 'height:' + h + '%' }));
    });
    view.appendChild(bars);
    return view;
  }

  function renderLeads() {
    var view = el('div', { class: 'mockup-view', id: 'tr-leads', hidden: 'true' });
    view.appendChild(
      el('div', { class: 'tr-leads-head' }, [
        el('span', { text: 'pipeline · google places + cnpj apis' }),
        el('span', { text: '623 prospectados' }),
      ])
    );
    LEADS.forEach(function (l) {
      view.appendChild(
        el('div', { class: 'tr-lead-row' }, [
          el('span', { text: l.name }),
          el('span', { class: 'tr-lead-badge ' + l.status, text: l.status }),
        ])
      );
    });
    return view;
  }

  function renderOutreach() {
    var view = el('div', { class: 'mockup-view', id: 'tr-outreach', hidden: 'true' });
    view.appendChild(
      el('div', { class: 'tr-chat' }, [
        el('div', { class: 'tr-bubble out', text: 'Olá! Vi que sua empresa pode se beneficiar de uma análise fiscal gratuita, topa dar uma olhada?' }),
        el('div', { class: 'tr-bubble', text: 'Oi, pode mandar mais detalhes?' }),
        el('div', { class: 'tr-bubble out', text: 'Claro, te chamo em instantes com o material 👍' }),
        el('div', { class: 'tr-tick', text: 'delay humanizado ativo · fila: Baileys + BullMQ + Redis · anti-ban ✓' }),
      ])
    );
    return view;
  }

  window.AM_MOCKUPS.taxresearch = function () {
    var tabsDef = [
      { id: 'painel', label: 'Painel' },
      { id: 'leads', label: 'Leads' },
      { id: 'outreach', label: 'Outreach' },
    ];
    var views = { painel: renderPainel(), leads: renderLeads(), outreach: renderOutreach() };

    var tabs = el('div', { class: 'mockup-tabs' });
    tabsDef.forEach(function (t, i) {
      var btn = el('button', { type: 'button', text: t.label, class: i === 0 ? 'active' : '' });
      btn.addEventListener('click', function () {
        tabs.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        Object.keys(views).forEach(function (k) { views[k].hidden = k !== t.id; });
      });
      tabs.appendChild(btn);
    });

    var shell = el('div', { class: 'mockup-shell' }, [tabs, views.painel, views.leads, views.outreach]);
    return shell;
  };
})();
