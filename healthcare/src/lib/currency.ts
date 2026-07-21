// The platform serves Bangladesh (Dhaka), so fees are in Bangladeshi Taka.
// Centralized here so every fee/amount/revenue display stays consistent —
// previously some screens showed "$" and others "৳" for the same values.
export const formatCurrency = (amount?: number | null): string => {
  const value = typeof amount === "number" && Number.isFinite(amount) ? amount : 0
  return `৳${value.toFixed(2)}`
}
