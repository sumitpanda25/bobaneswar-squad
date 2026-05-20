export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function getTrendColor(value: number): string {
  if (value > 0) return "text-green-400"
  if (value < 0) return "text-red-400"
  return "text-gray-400"
}

export function getTrendBgColor(value: number): string {
  if (value > 0) return "bg-green-500/10"
  if (value < 0) return "bg-red-500/10"
  return "bg-gray-500/10"
}
