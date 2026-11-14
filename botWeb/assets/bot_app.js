/* 账单页面：原生 JavaScript。只依赖本地 Flatpickr；Excel 库在导出时加载。 */
(function () {
  'use strict';

  const API_SERVERS = ['https://bot.letsvpn.bet', 'https://api.letsvpn.bet'];
  const PRIMARY_REQUEST_TIMEOUT = 8000;
  const BACKUP_REQUEST_TIMEOUT = 30000;
  const ALL = '全部';
  const isMobile = window.screen.width < 1000;
  const theme = isMobile ? 'theme-mobile-' : 'theme-desktop-';
  const scriptDirectory = new URL('.', document.currentScript.src);
  const state = {
    groupId: new URLSearchParams(location.search).get('id'),
    token: readCookie('codekey'),
    periods: [],
    periodId: null,
    periodsLoading: false,
    billLoading: false,
    report: emptyReport(),
    filters: { replyUser: ALL, operator: ALL, remark: ALL, splitNegativeIn: false },
    requestId: 0,
    highlights: {
      in: readStoredArray('table1HighLightRow'),
      out: readStoredArray('table2HighLightRow')
    },
    expandedGroups: new Set(),
    dateEnabled: false,
    startDate: 0,
    endDate: 0,
    menuIndex: 0
  };
  const elements = {
    page: document.getElementById('bill-page'),
    filterBar: document.getElementById('bill-filter-bar'),
    summary: document.getElementById('bill-filter-summary'),
    menu: document.getElementById('history-menu'),
    tooltip: document.getElementById('bill-tooltip')
  };
  const filterFields = [
    { id: 'reply-user-filter', key: 'replyUser', value: bill => text(bill.replyUser && bill.replyUser.id), label: bill => text(bill.replyUser && bill.replyUser.first_name) },
    { id: 'operator-filter', key: 'operator', value: bill => text(bill.user && bill.user.id), label: bill => text(bill.user && bill.user.first_name) },
    { id: 'remark-filter', key: 'remark', value: bill => text(bill.remark), label: bill => text(bill.remark) }
  ];
  const groupDefinitions = [
    { key: 'operator', title: '按(操作员)分类' },
    { key: 'replyUser', title: '按(标记类)分组' },
    { key: 'remark', title: '按(备注)分组' },
    { key: 'rate', title: '按(入款汇率)分类' },
    { key: 'operatorRate', title: '按(入款汇率和操作人)分类' }
  ];

  // ── 基础工具：数据、存储、DOM ──────────────────────────────────────
  function text(value) { return value == null ? '' : String(value); }
  function number(value) { return Number.isFinite(Number(value)) ? Number(value) : 0; }
  function money(value) { return number(value).toFixed(2); }
  function roundMoney(value) {
    // Shift the decimal exponent before rounding (also handles 1.005 and negatives).
    const parts = String(Math.abs(value)).split('e');
    const shifted = Number(parts[0] + 'e' + (Number(parts[1] || 0) + 2));
    return Math.sign(value) * Number(Math.round(shifted) + 'e-2');
  }
  function fullName(user) { return user ? text(user.first_name) + text(user.last_name) : ''; }
  function readCookie(name) {
    const entry = document.cookie.split(';').map(item => item.trim()).find(item => item.indexOf(name + '=') === 0);
    return entry ? entry.slice(name.length + 1) : null;
  }
  function readStoredArray(key) {
    try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value.map(String) : []; }
    catch (_) { return []; }
  }
  function saveStorage(key, value) {
    try { value == null ? localStorage.removeItem(key) : localStorage.setItem(key, value); }
    catch (_) { /* 禁用本地存储时，页面查询仍可正常使用。 */ }
  }
  function emptyReport() {
    return { bills: [], rate: 0, currenyType: '', baseType: '', totalInBase: 0, totalOutCurrency: 0, outCurrency: 0, notOutCurrency: 0 };
  }
  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = text(content);
    return node;
  }
  function append(parent, content) {
    parent.appendChild(content instanceof Node ? content : document.createTextNode(text(content)));
    return parent;
  }
  function cloneTemplate(id) { return document.getElementById(id).content.firstElementChild.cloneNode(true); }
  function themedTemplate(id) {
    const node = cloneTemplate(id);
    [node].concat(Array.from(node.querySelectorAll('[class]'))).forEach(child => {
      child.setAttribute('class', child.getAttribute('class').replace(/theme-desktop-/g, theme));
    });
    return node;
  }
  function parseTime(value) {
    if (value === null) return new Date(NaN);
    if (value === undefined) return new Date();

    // Match the original date library: parse dates without a timezone as local time.
    // Do not insert "T": that breaks values such as "2026/11/13 9:05:06".
    if (typeof value === 'string' && !/Z$/i.test(value)) {
      const parts = value.match(/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/);
      if (parts) {
        const [, year, month, day, hours, minutes, seconds, fraction] = parts;
        return new Date(
          Number(year), month ? Number(month) - 1 : 0, Number(day || 1),
          Number(hours || 0), Number(minutes || 0), Number(seconds || 0),
          Number((fraction || '0').slice(0, 3))
        );
      }
    }

    // Preserve explicit timezone offsets and numeric millisecond timestamps.
    return new Date(value);
  }
  function formatTime(value) {
    const date = parseTime(value);
    if (Number.isNaN(date.getTime())) return 'Invalid Date';
    const pad = value => String(value).padStart(2, '0');
    return pad(date.getMonth() + 1) + '/' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
  }
  function currencyIcon(size, className) {
    const icon = cloneTemplate('currency-icon-template');
    icon.setAttribute('width', size);
    icon.setAttribute('height', size);
    icon.setAttribute('class', 'tg-icon ' + (className || ''));
    return icon;
  }
  function currencyLabel(code) {
    const names = { cny: '元', php: 'PHP', kgs: 'KGS', mmk: 'MMK', vnd: 'VND', twd: 'TWD', thb: 'THD', hkd: 'HKD', myr: 'MYR', mop: 'MOP', aed: 'AED', inr: 'INR', eur: 'EUR', jpy: 'JPY' };
    return code === 'usd' || code === 'usdt' ? currencyIcon(10, 'mr-4px') : (names[code] || '');
  }

  // ── API：保留原参数、主备接口和登录失效行为 ────────────────────────
  function requestJSON(url, timeout) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.setRequestHeader('Accept', 'application/json, text/plain, */*');
      const authorization = readCookie('authorization');
      if (authorization) {
        let token = authorization;
        try { token = decodeURIComponent(authorization); } catch (_) { /* Preserve an unencoded cookie. */ }
        request.setRequestHeader('Authorization', 'bearer ' + token);
      }
      request.timeout = timeout;
      request.onload = () => {
        if (request.status < 200 || request.status >= 300) return reject(new Error('HTTP ' + request.status));
        try { resolve(JSON.parse(request.responseText)); } catch (error) { reject(error); }
      };
      request.onerror = request.ontimeout = () => reject(new Error('Network error'));
      request.send();
    });
  }
  async function requestWithFallback(endpoint, parameters, isValid) {
    const query = new URLSearchParams();
    Object.keys(parameters).forEach(key => { if (parameters[key] != null) query.set(key, parameters[key]); });
    for (const [index, server] of API_SERVERS.entries()) {
      try {
        const timeout = index === 0 ? PRIMARY_REQUEST_TIMEOUT : BACKUP_REQUEST_TIMEOUT;
        const result = await requestJSON(server + '/botWeb/' + endpoint + '/?' + query, timeout);
        if (isValid(result)) return result;
      } catch (_) { /* 主接口失败后尝试备用接口。 */ }
    }
    throw new Error('加载数据失败,请切换网络或稍后重试！');
  }
  function showError(message) {
    elements.filterBar.classList.remove('is-ready');
    elements.filterBar.classList.add('is-error');
    let error = elements.filterBar.querySelector('.bill-error-message');
    if (!error) { error = element('span', 'bill-error-message'); elements.filterBar.appendChild(error); }
    Array.from(elements.filterBar.children).forEach(child => { child.hidden = child !== error; });
    error.textContent = message;
  }
  function clearError() {
    elements.filterBar.classList.remove('is-error');
    const error = elements.filterBar.querySelector('.bill-error-message');
    if (error) error.remove();
    Array.from(elements.filterBar.children).forEach(child => { child.hidden = false; });
  }
  function setLoading(loading) {
    state.billLoading = loading;
    updateHistoryLoading();
    elements.page.querySelectorAll('.n-data-table').forEach(table => {
      table.classList.toggle('n-data-table--loading', loading);
      const empty = table.querySelector('.n-data-table-empty');
      if (empty) empty.classList.toggle('n-data-table-empty--hide', loading);
      const spinner = table.querySelector('.n-data-table-loading-wrapper');
      if (loading && !spinner) table.appendChild(cloneTemplate('loading-template'));
      if (!loading && spinner) spinner.remove();
    });
  }
  async function loadPeriods() {
    if (!state.groupId || state.periodsLoading) return;
    state.periodsLoading = true;
    clearError();
    updatePeriodLabel();
    try {
      const periods = await requestWithFallback('options', { id: state.groupId, token: state.token }, Array.isArray);
      state.periods = periods.map(period => ({ value: text(period._id), label: text(period.startTime) + (period.settlementTime ? '到 ' + period.settlementTime : '') }));
      state.periodId = state.periods.length ? state.periods[0].value : null;
      updatePeriodLabel();
      await loadBill();
    } catch (error) { showError(error.message); }
    finally {
      state.periodsLoading = false;
      updatePeriodLabel();
    }
  }
  async function loadBill() {
    if (!state.periodId) return;
    const requestId = ++state.requestId;
    clearError();
    resetFilters();
    saveStorage('result', null);
    setLoading(true);
    try {
      const report = await requestWithFallback('bill', {
        id: state.periodId, groupId: state.groupId, checkbox: state.dateEnabled ? 1 : 0,
        timestart: state.startDate, timeend: state.endDate, token: state.token
      }, value => value && typeof value === 'object' && !Array.isArray(value));
      if (requestId !== state.requestId) return;
      if (report.msg) alert(report.msg);
      if (report.xxx) {
        document.cookie = 'codekey=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        location.href = 'https://jzusdt.github.io/code.html?id=' + encodeURIComponent(report.xxx);
        return;
      }
      saveStorage('result', JSON.stringify(report));
      state.report = Object.assign(emptyReport(), report, { bills: Array.isArray(report.bills) ? report.bills.slice().reverse() : [] });
      const name = document.getElementById('namechat');
      name.replaceChildren();
      if (report.chat_nane) { name.appendChild(document.createElement('br')); append(name, '《 群组：' + report.chat_nane + ' 》'); }
      updateFilterOptions();
      renderReport();
    } catch (_) {
      if (requestId !== state.requestId) return;
      state.report = emptyReport();
      updateFilterOptions();
      renderReport();
      showError('账单明细加载失败,请切换网络或稍后重试！');
    } finally {
      if (requestId === state.requestId) {
        setLoading(false);
      }
    }
  }

  // ── 历史账单选择器：复用原 UI，支持鼠标、键盘、滚动和触屏 ───────────
  function updatePeriodLabel() {
    const selected = state.periods.find(period => period.value === state.periodId);
    state.menuIndex = Math.max(0, state.periods.findIndex(period => period.value === state.periodId));
    const label = selected ? selected.label : (state.periodsLoading ? '账单加载中…' : '请选择');
    elements.history.querySelector('.n-base-selection-input__content').textContent = label;
    elements.history.querySelector('.n-base-selection-input').title = label;
    updateHistoryLoading();
  }
  function updateHistoryLoading() {
    // 主接口和备用接口共用加载状态，切换接口时保持转圈。
    const loading = state.periodsLoading || state.billLoading;
    elements.page.setAttribute('aria-busy', loading);
    elements.history.classList.toggle('is-loading', loading);
    elements.history.querySelector('[role="combobox"]').setAttribute('aria-busy', loading);
    const suffix = elements.history.querySelector('.n-base-suffix');
    suffix.setAttribute('aria-label', loading ? '账单加载中' : '展开历史账单');
    elements.queryButton.disabled = state.periodsLoading;
  }
  function closeMenu() {
    elements.menu.hidden = true;
    elements.history.querySelector('[role="combobox"]').setAttribute('aria-expanded', 'false');
    elements.history.querySelector('.n-base-selection').classList.remove('n-base-selection--active');
  }
  function positionMenu() {
    const box = elements.history.getBoundingClientRect();
    elements.menu.style.left = box.left + 'px';
    elements.menu.style.width = box.width + 'px';
    const height = Math.min(266, state.periods.length * 34 + 8);
    elements.menu.style.top = (window.innerHeight - box.bottom < height && box.top > height ? box.top - height : box.bottom) + 'px';
  }
  function openMenu() {
    if (state.dateEnabled) return;
    elements.menu.className = 'n-base-select-menu n-select-menu ' + theme + 'options ' + theme + 'menu';
    elements.menu.replaceChildren();
    const list = element('div');
    list.style.padding = '4px 0';
    state.periods.forEach((period, index) => {
      const option = element('div', 'n-base-select-option n-base-select-option--show-checkmark');
      const selected = period.value === state.periodId;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', selected);
      option.id = 'period-option-' + index;
      option.classList.toggle('n-base-select-option--selected', selected);
      option.classList.toggle('n-base-select-option--pending', index === state.menuIndex);
      const label = element('div', 'n-base-select-option__content', period.label);
      if (selected) {
        const check = element('i', 'n-base-icon n-base-select-option__check');
        check.innerHTML = '<svg viewBox="0 0 16 16"><path d="M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z" fill="currentColor"/></svg>';
        label.appendChild(check);
      }
      option.appendChild(label);
      option.addEventListener('click', () => { state.periodId = period.value; updatePeriodLabel(); closeMenu(); });
      list.appendChild(option);
    });
    if (!state.periods.length) list.appendChild(element('div', 'n-base-select-option', '无数据'));
    elements.menu.appendChild(list);
    elements.menu.hidden = false;
    positionMenu();
    elements.history.querySelector('[role="combobox"]').setAttribute('aria-expanded', 'true');
    elements.history.querySelector('.n-base-selection').classList.add('n-base-selection--active');
  }
  function bindHistory() {
    elements.history.addEventListener('click', () => elements.menu.hidden ? openMenu() : closeMenu());
    elements.history.addEventListener('focusin', () => elements.history.querySelector('.n-base-selection').classList.add('n-base-selection--focus'));
    elements.history.addEventListener('focusout', () => elements.history.querySelector('.n-base-selection').classList.remove('n-base-selection--focus'));
    elements.history.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.key === 'Tab') return closeMenu();
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        state.menuIndex = Math.max(0, Math.min(state.periods.length - 1, state.menuIndex + (event.key === 'ArrowDown' ? 1 : -1)));
        openMenu();
        const option = document.getElementById('period-option-' + state.menuIndex);
        if (option) option.scrollIntoView({ block: 'nearest' });
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (elements.menu.hidden) openMenu();
        else if (state.periods[state.menuIndex]) { state.periodId = state.periods[state.menuIndex].value; updatePeriodLabel(); closeMenu(); }
      }
    });
    document.addEventListener('click', event => { if (!elements.history.contains(event.target) && !elements.menu.contains(event.target)) closeMenu(); });
    window.addEventListener('resize', () => { if (!elements.menu.hidden) positionMenu(); });
    window.addEventListener('scroll', () => { if (!elements.menu.hidden) positionMenu(); }, true);
  }

  // ── 表格：直接渲染数据，不再轮询 DOM 或复制框架生成的表格 ──────────
  function nameCell(user) {
    const span = element('span', 'n-ellipsis');
    span.style.textOverflow = 'ellipsis';
    span.dataset.tooltip = fullName(user);
    span.appendChild(element('span', '', fullName(user)));
    return span;
  }
  function incomeAmount(bill) {
    if (state.report.rate === 0 || (bill.rate === 1 && bill.fei === 0)) return text(bill.baseAmount);
    const cell = element('div');
    cell.appendChild(element('b', '', bill.baseAmount));
    cell.appendChild(element('div', '', text(bill.fei) + '% ⇌ ' + text(bill.rate)));
    return cell;
  }
  function outgoingAmount(bill) {
    if (state.report.version === 'v2') {
      if (!state.report.use_usd) return element('span', '', money(bill.baseAmount));
      const cell = element('div', 'inline-flex items-center');
      append(cell, currencyLabel('usdt')); append(cell, bill.currenyAmount);
      return cell;
    }
    if (state.report.rate === 0 || state.report.rate === 1) return text(bill.baseAmount);
    const cell = element('div');
    const inner = element('div');
    append(inner, currencyLabel(bill.currenyType)); append(inner, money(bill.baseAmount));
    cell.appendChild(inner);
    return cell;
  }
  function billColumns(kind) {
    const incoming = kind === 'in';
    const columns = [
      { key: 'time', title: '时间', width: 58, render: bill => formatTime(bill.time) },
      { key: 'baseAmount', title: '金额', width: 90, render: incoming ? incomeAmount : outgoingAmount }
    ];
    if (incoming) columns.push({ key: 'baseAm', title: '结算', width: 95, render: bill => append(element('div'), element('div', '', money(bill.currenyAmount))) });
    columns.push(
      { key: 'replyUser', title: '标记人', width: incoming ? 80 : 70, ellipsis: true, render: bill => nameCell(bill.replyUser) },
      { key: 'user', title: '操作人', width: incoming ? 80 : 70, ellipsis: true, render: bill => nameCell(bill.user) },
      { key: 'type', title: '备注', width: 70, render: bill => element('span', '', bill.remark) },
      { key: 'messageid', title: '', width: 1, render: bill => {
        const id = element('span', '', bill.messageid);
        id.style.cssText = 'font-size:' + (window.matchMedia('(min-width: 1024px)').matches ? '0' : '0.0001px') + ';height:5px;overflow:hidden;display:block';
        return id;
      } }
    );
    return columns;
  }
  function createTable(rows, columns, kind) {
    const wrapper = element('div', 'n-data-table ' + theme + 'table n-data-table--bordered');
    const outer = element('div', 'n-data-table-wrapper');
    const base = element('div', 'n-data-table-base-table');
    const table = element('table', 'n-data-table-table');
    const fixed = !!kind;
    table.style.tableLayout = fixed ? 'fixed' : 'auto';
    const colgroup = element('colgroup');
    columns.forEach(column => {
      const col = element('col');
      if (fixed && (isMobile || column.width === 1)) col.style.cssText = 'width:' + column.width + 'px;min-width:' + column.width + 'px';
      colgroup.appendChild(col);
    });
    table.appendChild(colgroup);
    const head = element('thead', 'n-data-table-thead');
    const headerRow = element('tr', 'n-data-table-tr');
    columns.forEach((column, index) => {
      const cell = element('th', 'n-data-table-th' + (index === columns.length - 1 ? ' n-data-table-th--last' : ''));
      cell.dataset.colKey = column.key;
      cell.colSpan = cell.rowSpan = 1;
      if (column.key !== 'messageid') cell.style.textAlign = 'center';
      const title = element('div', 'n-data-table-th__title');
      append(title, column.ellipsis ? nameCell({ first_name: column.title }) : column.title);
      cell.appendChild(append(element('div', 'n-data-table-th__title-wrapper'), title));
      headerRow.appendChild(cell);
    });
    head.appendChild(headerRow); table.appendChild(head);
    const body = element('tbody', 'n-data-table-tbody');
    rows.forEach((record, rowIndex) => {
      const row = element('tr', 'n-data-table-tr');
      if (kind) {
        const messageId = text(record.messageid);
        row.dataset.messageId = messageId;
        row.dataset.kind = kind;
        row.classList.toggle('highlight', !!messageId && state.highlights[kind].includes(messageId));
        row.addEventListener('click', () => toggleHighlight(kind, messageId));
      }
      columns.forEach((column, index) => {
        const cell = element('td', 'n-data-table-td' + (column.key === 'messageid' ? '' : ' n-data-table-td--center-align') + (rowIndex === rows.length - 1 ? ' n-data-table-td--last-row' : '') + (index === columns.length - 1 ? ' n-data-table-td--last-col' : ''));
        cell.dataset.colKey = column.key;
        cell.colSpan = cell.rowSpan = 1;
        if (column.key !== 'messageid') cell.style.textAlign = 'center';
        append(cell, column.render(record)); row.appendChild(cell);
      });
      body.appendChild(row);
    });
    if (rows.length) table.appendChild(body);
    // Mobile columns retain their original widths and horizontal scrolling.
    if (isMobile || !fixed) {
      const scroll = element('div', 'n-data-table-base-table-body n-scrollbar bill-scroll ' + theme + 'scrollbar');
      const content = element('div', 'n-scrollbar-content bill-scroll-content');
      content.appendChild(table); scroll.appendChild(content); base.appendChild(scroll);
    } else base.appendChild(table);
    if (!rows.length) base.appendChild(append(element('div', 'n-data-table-empty'), themedTemplate('empty-template')));
    outer.appendChild(base); wrapper.appendChild(outer);
    return wrapper;
  }
  function toggleHighlight(kind, id) {
    if (!id) return;
    const selected = state.highlights[kind];
    const index = selected.indexOf(id);
    if (index < 0) selected.push(id); else selected.splice(index, 1);
    saveStorage(kind === 'in' ? 'table1HighLightRow' : 'table2HighLightRow', JSON.stringify(selected));
    elements.page.querySelectorAll('tr[data-kind]').forEach(row => {
      if (row.dataset.kind === kind && row.dataset.messageId === id) row.classList.toggle('highlight', selected.includes(id));
    });
  }

  // ── 筛选：按 ID 区分同名人员；分类与导出仍使用完整账单 ─────────────
  function filteredBills() {
    return state.report.bills.filter(bill => filterFields.every(field => state.filters[field.key] === ALL || field.value(bill) === state.filters[field.key]));
  }
  function updateFilterOptions() {
    clearError();
    elements.filterBar.classList.toggle('is-ready', state.report.bills.length > 0);
    filterFields.forEach(field => {
      const select = document.getElementById(field.id);
      select.replaceChildren(new Option(ALL, ALL));
      const seen = new Set();
      // Original option order follows API data, not the reversed table rows.
      state.report.bills.slice().reverse().forEach(bill => {
        const value = field.value(bill);
        if (value && !seen.has(value)) { select.add(new Option(field.label(bill) || value, value)); seen.add(value); }
      });
      if (state.filters[field.key] !== ALL && !seen.has(state.filters[field.key])) state.filters[field.key] = ALL;
      select.value = state.filters[field.key];
    });
  }
  function resetFilters() {
    Object.assign(state.filters, { replyUser: ALL, operator: ALL, remark: ALL, splitNegativeIn: false });
    filterFields.forEach(field => { document.getElementById(field.id).value = ALL; });
    document.getElementById('split-negative-in-filter').checked = false;
    elements.summary.hidden = false;
    elements.summary.classList.remove('is-visible');
    elements.filterBar.classList.remove('is-ready');
  }
  function renderFilterSummary(bills) {
    elements.summary.replaceChildren();
    const active = filterFields.some(field => state.filters[field.key] !== ALL);
    elements.summary.classList.toggle('is-visible', active);
    if (!active) return;
    const incoming = bills.filter(bill => bill.type === 'in');
    const sum = (rows, key) => rows.reduce((total, row) => total + number(row[key]), 0);
    const positive = sum(incoming.filter(bill => number(bill.baseAmount) > 0), 'baseAmount');
    const negative = sum(incoming.filter(bill => number(bill.baseAmount) < 0), 'baseAmount');
    const payable = sum(incoming, 'currenyAmount');
    const paid = sum(bills.filter(bill => bill.type === 'out'), 'currenyAmount');
    const heading = element('span', '', '筛选后总计'); heading.style.color = 'rgb(0, 176, 240)';
    elements.summary.appendChild(append(element('div'), heading));
    ['总明细：↓ ' + money(positive) + ' ↑ ' + money(Math.abs(negative)), '总入款：' + money(positive + negative), '应下发：' + money(payable), '已下发：' + money(paid), '待下发：' + money(payable - paid)].forEach(line => elements.summary.appendChild(element('div', '', line)));
  }
  function renderBillTables() {
    elements.tables.replaceChildren();
    const bills = filteredBills();
    const sections = [
      { kind: 'in', tag: 'h1', title: '入账', rows: bills.filter(bill => bill.type === 'in' && (!state.filters.splitNegativeIn || number(bill.baseAmount) >= 0)) }
    ];
    const negative = bills.filter(bill => bill.type === 'in' && number(bill.baseAmount) < 0);
    if (state.filters.splitNegativeIn && negative.length) sections.push({ kind: 'in', tag: 'h2', title: '出账', rows: negative });
    sections.push({ kind: 'out', tag: 'h2', title: '下发', rows: bills.filter(bill => bill.type === 'out') });
    sections.forEach(section => {
      const isNegativeSection = section.title === '出账';
      const container = isNegativeSection ? element('div', 'negative-in-section') : elements.tables;
      if (isNegativeSection) { container.id = 'negative-in-section'; elements.tables.appendChild(container); }
      container.appendChild(element(section.tag, 'px-20px text-size-18px', ' ' + section.title + '(' + section.rows.length + '笔) '));
      // Keep the full table's column layout and border positions when filtering.
      const rows = state.report.bills.filter(bill => bill.type === section.kind);
      const table = createTable(rows, billColumns(section.kind), section.kind);
      if (!isNegativeSection) {
        table.querySelectorAll('tbody > tr').forEach((row, index) => { if (rows[index]) row.hidden = !section.rows.includes(rows[index]); });
        const block = element('div', 'px-10px mt-15px'); block.appendChild(table); container.appendChild(block);
      } else {
        // Match the original split table, including source column widths and borders.
        table.querySelectorAll('tbody > tr').forEach((row, index) => { if (!section.rows.includes(rows[index])) row.remove(); });
        const widths = Array.from(elements.tables.querySelector('table').querySelectorAll('th')).map(cell => cell.getBoundingClientRect().width);
        table.querySelectorAll('col').forEach((col, index) => {
          col.style.width = widths[index] + 'px'; col.style.maxWidth = widths[index] + 'px';
        });
        table.querySelectorAll('tr').forEach(row => {
          Array.from(row.children).forEach((cell, index) => {
            cell.style.width = widths[index] + 'px'; cell.style.maxWidth = widths[index] + 'px';
            if (index === 4) {
              cell.classList.add('negative-in-operator-cell');
              Array.from(cell.children).forEach(child => { child.style.cssText += ';display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; });
            }
          });
        });
        container.appendChild(table);
      }
    });
    renderFilterSummary(bills);
  }

  // ── 五种分类统计：保留原分组规则与显示格式 ──────────────────────────
  function groupBy(rows, keyOf) {
    const groups = Object.create(null);
    rows.forEach(row => { const key = String(keyOf(row)); if (!groups[key]) groups[key] = []; groups[key].push(row); });
    return groups;
  }
  function aggregate(rows) {
    const totals = { inBase: 0, inCurrency: 0, outBase: 0, outCurrency: 0 };
    rows.forEach(row => {
      if (row.type === 'in') { totals.inBase += number(row.baseAmount); totals.inCurrency += number(row.currenyAmount); }
      if (row.type === 'out') { totals.outBase += number(row.baseAmount); totals.outCurrency += number(row.currenyAmount); }
    });
    totals.leftBase = roundMoney(totals.inBase - totals.outBase);
    totals.leftCurrency = roundMoney(totals.inCurrency - totals.outCurrency);
    return totals;
  }
  function groupedRows(key) {
    const bills = state.report.bills;
    if (key === 'rate' || key === 'operatorRate') {
      const incoming = bills.filter(bill => bill.type === 'in');
      const operators = key === 'operatorRate' ? groupBy(incoming, bill => bill.user && bill.user.id) : { all: incoming };
      const rows = [];
      Object.keys(operators).forEach(operator => {
        const rates = groupBy(operators[operator], bill => bill.rate);
        Object.keys(rates).forEach(rate => rows.push(Object.assign(aggregate(rates[rate]), { rate, person: rates[rate][0].user })));
      });
      return rows;
    }
    const groups = groupBy(bills, bill => key === 'remark' ? bill.remark : (key === 'replyUser' ? bill.replyUser && bill.replyUser.id : bill.user && bill.user.id));
    return Object.keys(groups).filter(id => key !== 'replyUser' || groups[id][0].replyUser).map(id => {
      const first = groups[id][0];
      return Object.assign(aggregate(groups[id]), {
        label: key === 'remark' ? (id.trim() ? id : '(无备注)') : fullName(key === 'replyUser' ? first.replyUser : first.user),
        username: first.user && first.user.username
      });
    });
  }
  function groupAmount(rate, amount, settlement) {
    const cell = element('div');
    if (rate === 0 || rate === 1) return append(cell, text(amount));
    const pair = element('div'); pair.appendChild(element('div', '', amount));
    const currency = element('div', 'inline-flex items-center');
    currency.appendChild(currencyIcon(10, 'mr-4px')); append(currency, ' '); append(currency, settlement);
    pair.appendChild(currency); cell.appendChild(pair);
    return cell;
  }
  function personLink(name, username, newTab) {
    const link = element('a', '', name);
    link.href = 'https://t.me/' + text(username);
    if (newTab) { link.target = '_blank'; link.rel = 'noopener'; }
    return link;
  }
  function groupColumns(key) {
    if (key === 'rate' || key === 'operatorRate') {
      const columns = [
        { key: 'rate', title: '汇率', render: row => row.rate },
        { key: 'insCount', title: '总入', render: row => row.inBase },
        { key: 'usdCount', title: '结算', render: row => money(row.inCurrency) }
      ];
      if (key === 'operatorRate') columns.unshift({ key: 'user', title: '操作员', render: row => personLink(fullName(row.person), row.person && row.person.username, false) });
      return columns;
    }
    return [
      { key: 'insCount', title: '总入', render: row => groupAmount(state.report.rate, row.inBase, money(row.inCurrency)) },
      // The original classification table displays settlement values here, unlike its incoming column.
      { key: 'outCount', title: '总出', render: row => groupAmount(row.outBase, money(row.outCurrency)) },
      { key: 'leftCount', title: '剩余', render: row => groupAmount(row.leftBase, money(row.leftCurrency)) },
      { key: 'user', title: '标记', render: row => personLink(row.label, row.username, true) }
    ];
  }
  function renderGroups() {
    elements.groups.replaceChildren();
    groupDefinitions.forEach(definition => {
      const item = element('div', 'n-collapse-item n-collapse-item--left-arrow-placement');
      const header = cloneTemplate('collapse-header-template');
      header.querySelector('.group-label').textContent = definition.title;
      const content = element('div', 'n-collapse-item__content-wrapper');
      const inner = element('div', 'n-collapse-item__content-inner');
      const rows = groupedRows(definition.key);
      inner.appendChild(element('h2', 'px-20px text-size-18px', ' 共' + rows.length + '组 '));
      const tableBlock = element('div', 'px-10px mt-15px');
      tableBlock.appendChild(createTable(rows, groupColumns(definition.key)));
      inner.appendChild(tableBlock); content.appendChild(inner);
      const setExpanded = expanded => {
        if (expanded) state.expandedGroups.add(definition.key); else state.expandedGroups.delete(definition.key);
        item.classList.toggle('n-collapse-item--active', expanded);
        header.classList.toggle('n-collapse-item__header--active', expanded);
        header.setAttribute('aria-expanded', expanded);
        content.hidden = !expanded;
      };
      setExpanded(state.expandedGroups.has(definition.key));
      header.addEventListener('click', () => setExpanded(content.hidden));
      header.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpanded(content.hidden); } });
      item.appendChild(header); item.appendChild(content); elements.groups.appendChild(item);
    });
  }
  function renderTotals() {
    const report = state.report;
    elements.totals.replaceChildren(element('div', 'text-size-16px font-semibold', ' 总计 '));
    const line = (content, className) => { const node = element('div', className, content); elements.totals.appendChild(node); return node; };
    const rowClass = 'my-4px text-size-16px flex items-center';
    line(number(report.totalInBaseout) ? ' 总明细：↓ ' + report.totalInBasein + '  ↑ ' + report.totalInBaseout + ' ' : '', rowClass);
    line(number(report.usd_p) ? ' P 寄存：' + report.usd_p + ' ' : '', rowClass);
    line(number(report.usd_h) ? ' H 回款：' + report.usd_h + ' ' : '', rowClass);
    line(' 总入款：' + text(report.totalInBase) + ' ', rowClass);
    [['应下发', 'totalOutCurrency'], ['已下发', 'outCurrency'], ['待下发', 'notOutCurrency']].forEach(([label, key], index) => {
      const node = line(' ' + label + '：' + money(report[key]) + ' ', index === 2 ? 'flex items-center m-0px text-size-16px' : 'my-4px text-size-16px');
      if (report.rate !== 0 && report.rate !== 1) {
        const currency = element('span', 'inline-flex items-center ml-5px');
        currency.appendChild(['usd', 'usdt'].includes(report.currenyType) ? currencyIcon(16, 'ml-5px') : element('span', 'ml-5px', text(report.currenyType).toUpperCase()));
        node.appendChild(currency);
      }
    });
  }
  function renderReport() { renderBillTables(); renderGroups(); renderTotals(); }

  // ── 导出：首次点击才下载本地 XLSX 与导出脚本，可在失败后重试 ────────
  const scriptLoads = new Map();
  function loadScript(relativePath) {
    if (!scriptLoads.has(relativePath)) {
      const promise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = new URL(relativePath, scriptDirectory).href;
        script.onload = resolve;
        script.onerror = () => { script.remove(); scriptLoads.delete(relativePath); reject(new Error('导出组件加载失败，请重试')); };
        document.head.appendChild(script);
      });
      scriptLoads.set(relativePath, promise);
    }
    return scriptLoads.get(relativePath);
  }
  async function exportExcel() {
    if (!state.report.startTime || elements.exportButton.disabled) return;
    const report = Object.assign({}, state.report, { bills: state.report.bills.slice().reverse() });
    elements.exportButton.disabled = true;
    try {
      await Promise.all([loadScript('bot_xlsx.js'), loadScript('bot_export.js')]);
      window.BillExport.download(report, window.XLSX);
    } catch (error) { alert(error.message); }
    finally { elements.exportButton.disabled = false; }
  }

  // ── 初始化与事件绑定：页面只初始化一次，无轮询定时器 ────────────────
  function buildPage() {
    document.body.classList.add(isMobile ? 'is-mobile' : 'is-desktop');
    elements.page.className = isMobile ? '' : 'w-1200px mx-auto';
    elements.history = themedTemplate('history-template');
    elements.queryButton = themedTemplate('query-template');
    elements.exportButton = element('button', 'theme-desktop-button n-button n-button--default-type n-button--large-type n-button--block exportBtn', '导出xlsx');
    elements.exportButton.id = 'exportBtn';
    elements.exportButton.type = 'button';
    const selectBlock = element('div', isMobile ? 'p-20px pb-10px' : '');
    selectBlock.appendChild(elements.history);
    const buttons = element('div', isMobile ? 'px-20px' : '');
    buttons.appendChild(elements.queryButton); buttons.appendChild(elements.exportButton);
    if (isMobile) {
      elements.history.classList.add('select');
      elements.page.appendChild(selectBlock); elements.page.appendChild(buttons);
    } else {
      elements.history.classList.add('w-240px');
      const controls = element('div', 'flex pt-60px pl-20px mb-40px');
      const space = element('div', 'n-space'); space.style.cssText = 'display:flex;flex-flow:wrap;justify-content:flex-start;gap:8px 12px';
      [selectBlock, buttons].forEach(block => { block.style.maxWidth = '100%'; space.appendChild(block); });
      controls.appendChild(space); elements.page.appendChild(controls);
    }
    elements.tables = element('div'); elements.page.appendChild(elements.tables);
    elements.page.appendChild(element('h2', 'px-20px text-size-18px', ' 记账分类 '));
    const groupBlock = element('div', 'px-20px pt-15px pb-20px');
    elements.groups = element('div', 'n-collapse ' + theme + 'collapse');
    groupBlock.appendChild(elements.groups); elements.page.appendChild(groupBlock);
    elements.totals = element('div', 'px-20px pt-15px pb-20px'); elements.page.appendChild(elements.totals);
  }
  function initializeDates() {
    const common = { minDate: '2000-01-01', dateFormat: 'Y-m-d H:i', enableTime: true, time_24hr: true, required: true };
    const start = flatpickr('#start-date-input', Object.assign({}, common, { defaultDate: 'today', onChange: (_, value) => { state.startDate = value; } }));
    const end = flatpickr('#end-date-input', Object.assign({}, common, {
      defaultDate: new Date(new Date().setHours(23, 59, 0, 0)),
      onChange: (_, value) => { state.endDate = value; },
      onReady: (_, value, instance) => instance.setDate(new Date(new Date().setHours(23, 59, 0, 0)), true)
    }));
    function setDateMode() {
      state.dateEnabled = document.getElementById('checkbox1').checked;
      [start, end].forEach(picker => {
        picker.input.disabled = !state.dateEnabled;
        if (picker.mobileInput) { picker.mobileInput.disabled = !state.dateEnabled; picker.mobileInput.style.color = state.dateEnabled ? 'black' : 'gray'; }
      });
      elements.history.querySelector('.n-base-selection').style.display = state.dateEnabled ? 'none' : '';
      closeMenu();
    }
    document.getElementById('checkbox1').addEventListener('change', setDateMode);
    setDateMode();
  }
  function bindEvents() {
    elements.queryButton.addEventListener('click', () => state.periodId ? loadBill() : loadPeriods());
    elements.exportButton.addEventListener('click', exportExcel);
    filterFields.forEach(field => document.getElementById(field.id).addEventListener('change', event => {
      state.filters[field.key] = event.target.value; renderBillTables();
    }));
    document.getElementById('split-negative-in-filter').addEventListener('change', event => {
      state.filters.splitNegativeIn = event.target.checked; renderBillTables();
    });
    document.getElementById('clear-highlights').addEventListener('click', event => {
      event.preventDefault(); saveStorage('table1HighLightRow', null); saveStorage('table2HighLightRow', null); location.reload();
    });
    elements.page.addEventListener('mouseover', event => {
      const target = event.target.closest('[data-tooltip]');
      if (!target || target.scrollWidth <= target.clientWidth) return;
      elements.tooltip.textContent = target.dataset.tooltip;
      elements.tooltip.hidden = false;
      const box = target.getBoundingClientRect();
      elements.tooltip.style.left = Math.max(4, Math.min(box.left, innerWidth - elements.tooltip.offsetWidth - 4)) + 'px';
      elements.tooltip.style.top = Math.max(4, box.top - elements.tooltip.offsetHeight - 8) + 'px';
    });
    elements.page.addEventListener('mouseout', () => { elements.tooltip.hidden = true; });
    bindHistory();
  }
  saveStorage('result', null);
  buildPage();
  initializeDates();
  bindEvents();
  renderReport();
  loadPeriods();
}());
