export const NumberFormatter = (number) => {
  return number.toLocaleString(undefined, { minimumFractionDigits: 2 })
}
