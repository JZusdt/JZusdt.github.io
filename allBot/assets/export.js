/* Excel 导出：保持原表头、顺序、单元格位置、列宽、行高和文件名。 */
(function (root) {
  'use strict';

  function firstName(user) { return user ? user.first_name : ''; }
  function byTime(left, right) { return new Date(left.时间) - new Date(right.时间); }
  function textCell(value) { return { t: 's', v: value, r: '<fill>', h: 'filled' }; }

  function buildWorkbook(report, XLSX) {
    const income = report.bills.filter(bill => bill.type === 'in').map(bill => ({
      '时间': bill.time,
      '费率/汇率': bill.fei ? bill.fei + '% ⇌ ' + bill.rate : '',
      '金额': bill.baseAmount,
      '结算': bill.currenyAmount,
      '标记人': firstName(bill.replyUser),
      '操作人': firstName(bill.user),
      '备注': bill.mark
    })).sort(byTime);
    const outgoing = report.bills.filter(bill => bill.type === 'out').map(bill => ({
      '时间': bill.time,
      '金额': bill.baseAmount,
      '标记人': firstName(bill.replyUser),
      '操作人': firstName(bill.user),
      '备注': bill.mark
    })).sort(byTime);
    const incomeCount = income.length;
    const outgoingCount = outgoing.length;

    // 保留原版空白行与表头推断顺序，包括没有入账的账单。
    for (let index = 0; index < 100; index++) {
      income.push({ '时间': '', '金额': '', '结算': '', '标记人': '', '操作人': '', '备注': '' });
    }
    const sheet = XLSX.utils.json_to_sheet(income);
    const outgoingHeaderRow = incomeCount + 5;
    const outgoingColumns = ['时间', '金额', '标记人', '操作人', '备注'];
    outgoingColumns.forEach((label, index) => {
      sheet[String.fromCharCode(65 + index) + outgoingHeaderRow] = textCell(label);
    });
    outgoing.forEach((bill, rowIndex) => {
      outgoingColumns.forEach((label, columnIndex) => {
        sheet[String.fromCharCode(65 + columnIndex) + (outgoingHeaderRow + rowIndex + 1)] = textCell(bill[label]);
      });
    });

    const totalsRow = incomeCount + outgoingCount + 10;
    sheet['A' + totalsRow] = textCell('总计');
    sheet['C' + totalsRow] = textCell('已入账（' + incomeCount + '笔）');
    sheet['D' + totalsRow] = textCell('已下发（' + outgoingCount + '笔）');
    const totals = [
      ['H 回款', report.usd_h || 0],
      ['P 寄存', report.usd_p || 0],
      ['总入款', report.totalInBase || 0],
      ['应下发', report.totalOutBase || 0],
      ['已下发', report.outBase || 0],
      ['待下发', report.notOutBase ? Number(report.notOutBase).toFixed(2) : 0]
    ];
    totals.forEach(([label, value], index) => {
      sheet['A' + (totalsRow + index + 1)] = textCell(label);
      sheet['B' + (totalsRow + index + 1)] = textCell(value);
    });
    sheet['!cols'] = Array.from({ length: 100 }, () => ({ wpx: 150 }));
    sheet['!rows'] = Array.from({ length: 100 }, (_, index) => index === totalsRow ? { wpx: 150, font: { bold: true } } : { hpt: 20 });

    // 大量下发记录超过原来的 100 行空白区时，也必须完整导出。
    const range = XLSX.utils.decode_range(sheet['!ref']);
    range.e.r = Math.max(range.e.r, totalsRow + totals.length - 1);
    sheet['!ref'] = XLSX.utils.encode_range(range);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, report.startTime + '账单');
    return workbook;
  }

  function download(report, XLSX) {
    XLSX.writeFile(buildWorkbook(report, XLSX), report.startTime + '账单.xlsx');
  }

  const api = { buildWorkbook, download };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BillExport = api;
}(typeof window !== 'undefined' ? window : globalThis));
