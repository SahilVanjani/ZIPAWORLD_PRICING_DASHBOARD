export const airRates = [
  {
    id: 'RTE-001', airline: 'Emirates', origin: 'DEL', destination: 'DXB', service: 'Express', currency: 'USD',
    m: 25, n: 1.2, p45: 1.1, p100: 1.0, p300: 0.9, p500: 0.85, p1000: 0.8,
    fuel: 0.15, security: 0.05, handling: 20, awb: 15, validUntil: '2026-10-31', status: 'ACTIVE'
  },
  {
    id: 'RTE-002', airline: 'Qatar Airways', origin: 'BOM', destination: 'DOH', service: 'Standard', currency: 'USD',
    m: 30, n: 1.3, p45: 1.15, p100: 1.05, p300: 0.95, p500: 0.9, p1000: 0.85,
    fuel: 0.1, security: 0.05, handling: 25, awb: 15, validUntil: '2026-09-30', status: 'EXPIRING SOON'
  },
  {
    id: 'RTE-003', airline: 'Lufthansa Cargo', origin: 'DEL', destination: 'FRA', service: 'Standard', currency: 'EUR',
    m: 45, n: 2.2, p45: 2.0, p100: 1.8, p300: 1.6, p500: 1.5, p1000: 1.4,
    fuel: 0.2, security: 0.1, handling: 35, awb: 20, validUntil: '2026-11-15', status: 'ACTIVE'
  },
  {
    id: 'RTE-004', airline: 'British Airways', origin: 'BOM', destination: 'LHR', service: 'Express', currency: 'GBP',
    m: 50, n: 2.5, p45: 2.3, p100: 2.1, p300: 1.9, p500: 1.8, p1000: 1.7,
    fuel: 0.15, security: 0.1, handling: 30, awb: 15, validUntil: '2026-09-10', status: 'EXPIRED'
  },
  {
    id: 'RTE-005', airline: 'Singapore Airlines Cargo', origin: 'MAA', destination: 'SIN', service: 'Standard', currency: 'USD',
    m: 20, n: 1.0, p45: 0.9, p100: 0.8, p300: 0.75, p500: 0.7, p1000: 0.65,
    fuel: 0.12, security: 0.05, handling: 15, awb: 10, validUntil: '2026-12-31', status: 'ACTIVE'
  },
  {
    id: 'RTE-006', airline: 'Cathay Cargo', origin: 'DEL', destination: 'HKG', service: 'Express', currency: 'USD',
    m: 35, n: 1.5, p45: 1.3, p100: 1.2, p300: 1.1, p500: 1.0, p1000: 0.9,
    fuel: 0.18, security: 0.08, handling: 22, awb: 15, validUntil: '2026-10-15', status: 'ACTIVE'
  },
  {
    id: 'RTE-007', airline: 'Air India', origin: 'DEL', destination: 'JFK', service: 'Standard', currency: 'USD',
    m: 60, n: 3.5, p45: 3.2, p100: 3.0, p300: 2.8, p500: 2.6, p1000: 2.5,
    fuel: 0.25, security: 0.1, handling: 40, awb: 25, validUntil: '2026-09-28', status: 'EXPIRING SOON'
  },
  {
    id: 'RTE-008', airline: 'KLM Cargo', origin: 'BLR', destination: 'AMS', service: 'Standard', currency: 'EUR',
    m: 40, n: 2.0, p45: 1.8, p100: 1.6, p300: 1.5, p500: 1.4, p1000: null,
    fuel: 0.15, security: 0.1, handling: 25, awb: 20, validUntil: '2026-12-01', status: 'ACTIVE'
  },
  {
    id: 'RTE-009', airline: 'Turkish Cargo', origin: 'HYD', destination: 'CDG', service: 'Standard', currency: 'EUR',
    m: 35, n: 1.8, p45: 1.6, p100: 1.4, p300: 1.3, p500: 1.2, p1000: 1.1,
    fuel: 0.12, security: 0.05, handling: 20, awb: 15, validUntil: '2026-10-10', status: 'ACTIVE'
  },
  {
    id: 'RTE-010', airline: 'Etihad Airways', origin: 'DEL', destination: 'ORD', service: 'Express', currency: 'USD',
    m: 65, n: 3.8, p45: 3.5, p100: 3.2, p300: 3.0, p500: 2.8, p1000: 2.7,
    fuel: 0.3, security: 0.15, handling: 45, awb: 25, validUntil: '2026-11-30', status: 'ACTIVE'
  },
  {
    id: 'RTE-011', airline: 'Saudia Cargo', origin: 'BOM', destination: 'YYZ', service: 'Standard', currency: 'USD',
    m: 70, n: 4.0, p45: 3.8, p100: 3.5, p300: 3.2, p500: 3.0, p1000: 2.8,
    fuel: 0.25, security: 0.12, handling: 40, awb: 20, validUntil: '2026-10-25', status: 'ACTIVE'
  },
  {
    id: 'RTE-012', airline: 'Ethiopian Cargo', origin: 'DEL', destination: 'LHR', service: 'Standard', currency: 'GBP',
    m: 45, n: 2.2, p45: 2.0, p100: 1.8, p300: 1.6, p500: null, p1000: null,
    fuel: 0.1, security: 0.08, handling: 25, awb: 15, validUntil: '2026-12-15', status: 'ACTIVE'
  },
  {
    id: 'RTE-013', airline: 'Emirates', origin: 'CDG', destination: 'DEL', service: 'Express', currency: 'EUR',
    m: 35, n: 2.0, p45: 1.8, p100: 1.6, p300: 1.4, p500: 1.3, p1000: 1.2,
    fuel: 0.18, security: 0.05, handling: 30, awb: 20, validUntil: '2026-11-01', status: 'ACTIVE'
  },
  {
    id: 'RTE-014', airline: 'Lufthansa Cargo', origin: 'FRA', destination: 'BOM', service: 'Standard', currency: 'EUR',
    m: 40, n: 2.1, p45: 1.9, p100: 1.7, p300: 1.5, p500: 1.4, p1000: 1.3,
    fuel: 0.15, security: 0.1, handling: 35, awb: 25, validUntil: '2026-10-20', status: 'ACTIVE'
  },
  {
    id: 'RTE-015', airline: 'Singapore Airlines Cargo', origin: 'SIN', destination: 'MAA', service: 'Express', currency: 'USD',
    m: 25, n: 1.2, p45: 1.1, p100: 1.0, p300: 0.9, p500: 0.85, p1000: 0.8,
    fuel: 0.12, security: 0.05, handling: 15, awb: 10, validUntil: '2026-12-31', status: 'ACTIVE'
  },
  {
    id: 'RTE-016', airline: 'Qatar Airways', origin: 'JFK', destination: 'DEL', service: 'Standard', currency: 'USD',
    m: 65, n: 3.4, p45: 3.1, p100: 2.9, p300: 2.7, p500: 2.5, p1000: 2.4,
    fuel: 0.22, security: 0.1, handling: 40, awb: 25, validUntil: '2026-09-25', status: 'EXPIRING SOON'
  }
];
