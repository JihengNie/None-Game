function getRangeReport(start, end) {
  var result = {};
  var total = 0;
  var odds = [];
  var evens = [];
  var range = [];
  var average = (start + end) / 2;

  while (start <= end) {
    range.push(start);
    if (start % 2 === 0) {
      evens.push(start);
    } else {
      odds.push(start);
    }
    start++;
  }
  for (var i = 0; i < range.length; i++) {
    total += range[i];
  }
  result.total = total;
  result.odds = odds;
  result.evens = evens;
  result.range = range;
  result.average = average;
  return result;
}
