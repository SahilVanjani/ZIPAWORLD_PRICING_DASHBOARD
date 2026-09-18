export const airAnalyticsData = {
  kpis: {
    export: {
      totalQueries: 128, pending: 14, ratesAvailable: 47, ratesQuoted: 39, ratesConfirmed: 28,
      avgResponseTime: 38, bestRateOpportunities: 21, potentialSavings: '2.84L'
    },
    import: {
      totalQueries: 84, pending: 8, ratesAvailable: 32, ratesQuoted: 24, ratesConfirmed: 20,
      avgResponseTime: 42, bestRateOpportunities: 15, potentialSavings: '1.45L'
    }
  },
  queryVolumeTrend: [
    { date: '10 Sep', received: 15, quoted: 12, confirmed: 8 },
    { date: '11 Sep', received: 18, quoted: 15, confirmed: 10 },
    { date: '12 Sep', received: 22, quoted: 19, confirmed: 12 },
    { date: '13 Sep', received: 25, quoted: 20, confirmed: 14 },
    { date: '14 Sep', received: 20, quoted: 18, confirmed: 11 },
    { date: '15 Sep', received: 28, quoted: 22, confirmed: 16 },
    { date: '16 Sep', received: 12, quoted: 8, confirmed: 4 }
  ],
  avgResponseTime: [
    { date: '10 Sep', tat: 45 },
    { date: '11 Sep', tat: 42 },
    { date: '12 Sep', tat: 38 },
    { date: '13 Sep', tat: 40 },
    { date: '14 Sep', tat: 35 },
    { date: '15 Sep', tat: 32 },
    { date: '16 Sep', tat: 38 }
  ],
  airlineRateComparison: [
    { name: 'DEL-DXB', 'Emirates': 1.2, 'Qatar Airways': 1.35, 'Etihad': 1.25 },
    { name: 'BOM-LHR', 'British Airways': 2.5, 'Virgin Atlantic': 2.6, 'Air India': 2.4 },
    { name: 'MAA-SIN', 'Singapore Airlines': 1.0, 'Air India': 1.1, 'Indigo': 0.9 }
  ],
  avgFreightTrend: [
    { month: 'Jul', rate: 1.45 },
    { month: 'Aug', rate: 1.50 },
    { month: 'Sep', rate: 1.48 }
  ],
  importVsExport: [
    { name: 'Export', value: 65, color: '#1565c0' },
    { name: 'Import', value: 35, color: '#e8192c' }
  ],
  queryStatusDistribution: [
    { name: 'Pending', value: 22, color: '#f59e0b' },
    { name: 'Rate Available', value: 79, color: '#0288d1' },
    { name: 'Quoted', value: 63, color: '#7c3aed' },
    { name: 'Confirmed', value: 48, color: '#16a34a' }
  ],
  airlinePerformance: [
    { airline: 'Emirates', quotes: 45, avgTat: 15, avgRate: 1.25, confirmed: 22 },
    { airline: 'Qatar Airways', quotes: 38, avgTat: 20, avgRate: 1.30, confirmed: 18 },
    { airline: 'Lufthansa Cargo', quotes: 32, avgTat: 25, avgRate: 2.10, confirmed: 15 },
    { airline: 'Singapore Airlines', quotes: 28, avgTat: 18, avgRate: 1.15, confirmed: 12 },
    { airline: 'Air India', quotes: 20, avgTat: 45, avgRate: 2.80, confirmed: 5 }
  ],
  queryAging: [
    { category: '0-30 min', count: 18 },
    { category: '30-60 min', count: 12 },
    { category: '1-2 hours', count: 8 },
    { category: '2-4 hours', count: 5 },
    { category: '4+ hours', count: 3 }
  ],
  tatAnalytics: {
    average: '38 min',
    median: '32 min',
    fastest: '5 min',
    longest: '6.5 hours'
  }
};
