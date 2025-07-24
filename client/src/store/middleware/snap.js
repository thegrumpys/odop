export function snap(table, value) {
  if (!table || table.length === 0) return value;
  let low = 0;
  let high = table.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (table[mid] === value) {
      return table[mid];
    } else if (table[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  if (low === 0) return table[0];
  if (low >= table.length) return table[table.length - 1];
  return Math.abs(table[low] - value) < Math.abs(value - table[low - 1]) ? table[low] : table[low - 1];
}
