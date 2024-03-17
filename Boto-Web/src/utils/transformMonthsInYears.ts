export function transformMonthsInYears(monthCount: number): string {
  function getPlural(number: number, word: any) {
    return (number === 1 && word.one) || word.other;
  }

  let months = { one: 'mês', other: 'meses' },
    years = { one: 'ano', other: 'anos' },
    m = monthCount % 12,
    y = Math.floor(monthCount / 12),
    result = [];

  y && result.push(y + ' ' + getPlural(y, years));
  m && result.push(m + ' ' + getPlural(m, months));
  return result.join(' e ');
}
