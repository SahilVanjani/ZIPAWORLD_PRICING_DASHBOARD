export function formatAge(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function getSLAColor(ageMinutes, slaMinutes) {
  const pct = ageMinutes / slaMinutes;
  if (pct >= 1) return '#b71c1c';
  if (pct >= 0.8) return '#f59e0b';
  return '#16a34a';
}

export function getSLALabel(ageMinutes, slaMinutes) {
  if (ageMinutes >= slaMinutes) return 'SLA Breached';
  const remaining = slaMinutes - ageMinutes;
  if (remaining <= 10) return `${remaining}m remaining ⚠`;
  return 'Within SLA';
}

export function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ', ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatINR(amount) {
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(2).replace(/\.?0+$/, '') + ' L';
  return '₹' + amount.toLocaleString('en-IN');
}
