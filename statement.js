const createStatementData = require("./createStatementData");

function htmlStatement(invoice, plays) {
  console.log(invoice);
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
  let result = `<h1>청구내역 (고객명: ${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += ` <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

module.exports = htmlStatement;
