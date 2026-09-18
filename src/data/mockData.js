// ============================================================
// ZIPWORLD PRICING CONTROL TOWER — MOCK DATA
// ============================================================
// This file contains all mock data for the prototype.
// Replace with API calls to the endpoints below when ready:
//   GET /pricing/queries
//   GET /pricing/queries/:id
//   GET /pricing/rates
//   GET /pricing/carriers
//   GET /pricing/analytics
//   GET /pricing/sla
//   GET /pricing/rate-master
// ============================================================
































































































// ============================================================
// MOCK QUERIES — 55 records
// ============================================================
export const mockQueries = [
{
  id: 'PR-2026-00124', receivedAt: '2026-09-12T15:08:00', customer: 'ABC Exports Pvt Ltd',
  origin: 'Nhava Sheva', destination: 'Rotterdam', shipmentType: 'FCL', container: '40HC',
  weight: '18 MT', commodity: 'General Cargo', assignedTo: 'Sahil', status: 'Rates Available',
  ageMinutes: 34, slaMinutes: 60, currency: 'INR',
  assignedAt: '2026-09-12T15:12:00', ratesFoundAt: '2026-09-12T15:29:00',
  ratesComparedAt: '2026-09-12T15:35:00', ratesRevertedAt: '2026-09-12T15:42:00',
  tatMinutes: 34, incoterm: 'FOB', source: 'Email'
},
{
  id: 'PR-2026-00125', receivedAt: '2026-09-12T14:22:00', customer: 'Global Textile India',
  origin: 'Mundra', destination: 'Hamburg', shipmentType: 'FCL', container: '40GP',
  weight: '22 MT', commodity: 'Textiles', assignedTo: 'Rahul', status: 'Quoted',
  ageMinutes: 72, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T14:28:00', ratesFoundAt: '2026-09-12T14:50:00',
  ratesRevertedAt: '2026-09-12T15:10:00', tatMinutes: 48, incoterm: 'CIF', source: 'Portal'
},
{
  id: 'PR-2026-00126', receivedAt: '2026-09-12T16:45:00', customer: 'Sunrise Pharma Ltd',
  origin: 'Chennai', destination: 'Dubai', shipmentType: 'LCL', container: 'LCL',
  weight: '3.5 MT', commodity: 'Pharmaceuticals', assignedTo: 'Neha', status: 'Pending',
  ageMinutes: 48, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T16:50:00', source: 'Email'
},
{
  id: 'PR-2026-00127', receivedAt: '2026-09-12T13:00:00', customer: 'Bharat Steel Corp',
  origin: 'Nhava Sheva', destination: 'Antwerp', shipmentType: 'FCL', container: '40HC',
  weight: '25 MT', commodity: 'Steel Products', assignedTo: 'Amit', status: 'Confirmed',
  ageMinutes: 240, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T13:05:00', ratesFoundAt: '2026-09-12T13:40:00',
  ratesRevertedAt: '2026-09-12T14:00:00', tatMinutes: 60, incoterm: 'FOB', source: 'Portal'
},
{
  id: 'PR-2026-00128', receivedAt: '2026-09-12T17:10:00', customer: 'Krishna Agro Exports',
  origin: 'Mundra', destination: 'Singapore', shipmentType: 'FCL', container: '20GP',
  weight: '14 MT', commodity: 'Agri Products', assignedTo: 'Priya', status: 'In Progress',
  ageMinutes: 22, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T17:15:00', source: 'Email'
},
{
  id: 'PR-2026-00129', receivedAt: '2026-09-12T11:30:00', customer: 'Tech Vision Systems',
  origin: 'Nhava Sheva', destination: 'New York', shipmentType: 'FCL', container: '40HC',
  weight: '12 MT', commodity: 'Electronics', assignedTo: 'Sahil', status: 'SLA Breached',
  ageMinutes: 142, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T11:35:00', source: 'Portal'
},
{
  id: 'PR-2026-00130', receivedAt: '2026-09-12T10:00:00', customer: 'Reliance Commodities',
  origin: 'Hazira', destination: 'Rotterdam', shipmentType: 'FCL', container: '40HC',
  weight: '28 MT', commodity: 'Chemicals', assignedTo: 'Rahul', status: 'Confirmed',
  ageMinutes: 480, slaMinutes: 60, currency: 'INR',
  assignedAt: '2026-09-12T10:06:00', ratesFoundAt: '2026-09-12T10:38:00',
  ratesRevertedAt: '2026-09-12T10:52:00', tatMinutes: 52, incoterm: 'FOB', source: 'Email'
},
{
  id: 'PR-2026-00131', receivedAt: '2026-09-12T17:55:00', customer: 'Modern Ceramics Ltd',
  origin: 'Mundra', destination: 'Jebel Ali', shipmentType: 'FCL', container: '20GP',
  weight: '10 MT', commodity: 'Ceramics', assignedTo: 'Neha', status: 'Pending',
  ageMinutes: 15, slaMinutes: 60, currency: 'USD', source: 'Email'
},
{
  id: 'PR-2026-00132', receivedAt: '2026-09-12T09:15:00', customer: 'Ganesh Polymers',
  origin: 'Chennai', destination: 'Hamburg', shipmentType: 'LCL', container: 'LCL',
  weight: '2.8 MT', commodity: 'Polymers', assignedTo: 'Amit', status: 'No Rate',
  ageMinutes: 535, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T09:20:00', ratesFoundAt: '', source: 'Portal'
},
{
  id: 'PR-2026-00133', receivedAt: '2026-09-12T16:00:00', customer: 'Dalmia Industries',
  origin: 'Kolkata', destination: 'Los Angeles', shipmentType: 'FCL', container: '40HC',
  weight: '20 MT', commodity: 'General Cargo', assignedTo: 'Priya', status: 'Rates Available',
  ageMinutes: 110, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T16:05:00', ratesFoundAt: '2026-09-12T16:30:00',
  tatMinutes: 90, source: 'Email'
},
{
  id: 'PR-2026-00134', receivedAt: '2026-09-12T15:30:00', customer: 'Sunrise Garments',
  origin: 'Nhava Sheva', destination: 'Rotterdam', shipmentType: 'LCL', container: 'LCL',
  weight: '4.2 MT', commodity: 'Garments', assignedTo: 'Sahil', status: 'Quoted',
  ageMinutes: 78, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T15:35:00', ratesFoundAt: '2026-09-12T15:55:00',
  ratesRevertedAt: '2026-09-12T16:10:00', tatMinutes: 40, source: 'Portal'
},
{
  id: 'PR-2026-00135', receivedAt: '2026-09-12T08:30:00', customer: 'Indo Gulf Chemicals',
  origin: 'Hazira', destination: 'Antwerp', shipmentType: 'FCL', container: '40HC',
  weight: '26 MT', commodity: 'Chemicals', assignedTo: 'Rahul', status: 'Confirmed',
  ageMinutes: 540, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T08:35:00', ratesFoundAt: '2026-09-12T09:05:00',
  ratesRevertedAt: '2026-09-12T09:18:00', tatMinutes: 48, incoterm: 'CFR', source: 'Email'
},
{
  id: 'PR-2026-00136', receivedAt: '2026-09-12T18:05:00', customer: 'Apex Auto Parts',
  origin: 'Chennai', destination: 'Singapore', shipmentType: 'FCL', container: '20GP',
  weight: '8 MT', commodity: 'Auto Parts', assignedTo: 'Priya', status: 'Pending',
  ageMinutes: 8, slaMinutes: 60, currency: 'USD', source: 'Email'
},
{
  id: 'PR-2026-00137', receivedAt: '2026-09-12T12:00:00', customer: 'Laxmi Foods',
  origin: 'Mundra', destination: 'Dubai', shipmentType: 'LCL', container: 'LCL',
  weight: '5.5 MT', commodity: 'Food Products', assignedTo: 'Amit', status: 'SLA Breached',
  ageMinutes: 360, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T12:08:00', source: 'Portal'
},
{
  id: 'PR-2026-00138', receivedAt: '2026-09-12T14:45:00', customer: 'VasthraExim',
  origin: 'Nhava Sheva', destination: 'New York', shipmentType: 'FCL', container: '40HC',
  weight: '16 MT', commodity: 'Textiles', assignedTo: 'Neha', status: 'Rates Available',
  ageMinutes: 105, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T14:50:00', ratesFoundAt: '2026-09-12T15:15:00',
  tatMinutes: 88, source: 'Email'
},
{
  id: 'PR-2026-00139', receivedAt: '2026-09-12T13:20:00', customer: 'Zeta Logistics',
  origin: 'Kolkata', destination: 'Singapore', shipmentType: 'FCL', container: '40GP',
  weight: '19 MT', commodity: 'Machinery', assignedTo: 'Sahil', status: 'Quoted',
  ageMinutes: 200, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T13:25:00', ratesFoundAt: '2026-09-12T14:00:00',
  ratesRevertedAt: '2026-09-12T14:20:00', tatMinutes: 60, source: 'Portal'
},
{
  id: 'PR-2026-00140', receivedAt: '2026-09-12T17:40:00', customer: 'Pioneer Plastics',
  origin: 'Chennai', destination: 'Jebel Ali', shipmentType: 'LCL', container: 'LCL',
  weight: '2.1 MT', commodity: 'Plastic Goods', assignedTo: 'Rahul', status: 'Pending',
  ageMinutes: 32, slaMinutes: 60, currency: 'USD', source: 'Email'
},
{
  id: 'PR-2026-00141', receivedAt: '2026-09-12T09:45:00', customer: 'Tata International',
  origin: 'Nhava Sheva', destination: 'Hamburg', shipmentType: 'FCL', container: '45HC',
  weight: '30 MT', commodity: 'Engineering Goods', assignedTo: 'Amit', status: 'Confirmed',
  ageMinutes: 495, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T09:50:00', ratesFoundAt: '2026-09-12T10:20:00',
  ratesRevertedAt: '2026-09-12T10:38:00', tatMinutes: 53, incoterm: 'FOB', source: 'Portal'
},
{
  id: 'PR-2026-00142', receivedAt: '2026-09-12T16:20:00', customer: 'Ambika Rice Mills',
  origin: 'Mundra', destination: 'Dubai', shipmentType: 'FCL', container: '20GP',
  weight: '21 MT', commodity: 'Rice', assignedTo: 'Priya', status: 'In Progress',
  ageMinutes: 90, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T16:25:00', source: 'Email'
},
{
  id: 'PR-2026-00143', receivedAt: '2026-09-12T11:00:00', customer: 'Ozone Chemicals',
  origin: 'Hazira', destination: 'Rotterdam', shipmentType: 'FCL', container: '40HC',
  weight: '24 MT', commodity: 'Chemicals', assignedTo: 'Neha', status: 'SLA Breached',
  ageMinutes: 420, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T11:05:00', source: 'Portal'
},
{
  id: 'PR-2026-00144', receivedAt: '2026-09-12T17:25:00', customer: 'Indra Foods',
  origin: 'Chennai', destination: 'Singapore', shipmentType: 'FCL', container: '40GP',
  weight: '15 MT', commodity: 'Food Products', assignedTo: 'Sahil', status: 'Pending',
  ageMinutes: 55, slaMinutes: 60, currency: 'USD', source: 'Email'
},
{
  id: 'PR-2026-00145', receivedAt: '2026-09-12T10:30:00', customer: 'Himachal Handicrafts',
  origin: 'Nhava Sheva', destination: 'Antwerp', shipmentType: 'LCL', container: 'LCL',
  weight: '1.8 MT', commodity: 'Handicrafts', assignedTo: 'Rahul', status: 'Confirmed',
  ageMinutes: 450, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T10:36:00', ratesFoundAt: '2026-09-12T11:00:00',
  ratesRevertedAt: '2026-09-12T11:14:00', tatMinutes: 44, source: 'Portal'
},
{
  id: 'PR-2026-00146', receivedAt: '2026-09-12T14:00:00', customer: 'Orient Electronics',
  origin: 'Mundra', destination: 'Hamburg', shipmentType: 'FCL', container: '40HC',
  weight: '13 MT', commodity: 'Electronics', assignedTo: 'Amit', status: 'Rates Available',
  ageMinutes: 150, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T14:06:00', ratesFoundAt: '2026-09-12T14:38:00',
  tatMinutes: 97, source: 'Email'
},
{
  id: 'PR-2026-00147', receivedAt: '2026-09-12T18:00:00', customer: 'SriKrishna Textiles',
  origin: 'Chennai', destination: 'Rotterdam', shipmentType: 'FCL', container: '40HC',
  weight: '20 MT', commodity: 'Textiles', assignedTo: 'Priya', status: 'Pending',
  ageMinutes: 10, slaMinutes: 60, currency: 'USD', source: 'Portal'
},
{
  id: 'PR-2026-00148', receivedAt: '2026-09-12T12:45:00', customer: 'National Spices',
  origin: 'Nhava Sheva', destination: 'Jebel Ali', shipmentType: 'LCL', container: 'LCL',
  weight: '3.0 MT', commodity: 'Spices', assignedTo: 'Neha', status: 'Quoted',
  ageMinutes: 195, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T12:50:00', ratesFoundAt: '2026-09-12T13:15:00',
  ratesRevertedAt: '2026-09-12T13:28:00', tatMinutes: 43, source: 'Email'
},
{
  id: 'PR-2026-00149', receivedAt: '2026-09-12T08:00:00', customer: 'Maha Steel',
  origin: 'Hazira', destination: 'Antwerp', shipmentType: 'FCL', container: '40HC',
  weight: '27 MT', commodity: 'Steel', assignedTo: 'Sahil', status: 'Confirmed',
  ageMinutes: 600, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T08:05:00', ratesFoundAt: '2026-09-12T08:44:00',
  ratesRevertedAt: '2026-09-12T08:58:00', tatMinutes: 58, incoterm: 'FOB', source: 'Portal'
},
{
  id: 'PR-2026-00150', receivedAt: '2026-09-12T15:50:00', customer: 'Delta Pharmaceuticals',
  origin: 'Nhava Sheva', destination: 'Singapore', shipmentType: 'FCL', container: '20GP',
  weight: '9 MT', commodity: 'Pharmaceuticals', assignedTo: 'Rahul', status: 'In Progress',
  ageMinutes: 60, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T15:55:00', source: 'Email'
},
{
  id: 'PR-2026-00151', receivedAt: '2026-09-12T13:35:00', customer: 'Coastal Fisheries',
  origin: 'Chennai', destination: 'Dubai', shipmentType: 'LCL', container: 'LCL',
  weight: '2.5 MT', commodity: 'Seafood', assignedTo: 'Amit', status: 'Quoted',
  ageMinutes: 175, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T13:40:00', ratesFoundAt: '2026-09-12T14:02:00',
  ratesRevertedAt: '2026-09-12T14:14:00', tatMinutes: 39, source: 'Portal'
},
{
  id: 'PR-2026-00152', receivedAt: '2026-09-12T11:15:00', customer: 'Vijay Engineering',
  origin: 'Kolkata', destination: 'Hamburg', shipmentType: 'FCL', container: '40HC',
  weight: '23 MT', commodity: 'Machinery', assignedTo: 'Priya', status: 'SLA Breached',
  ageMinutes: 405, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T11:20:00', source: 'Email'
},
{
  id: 'PR-2026-00153', receivedAt: '2026-09-12T16:55:00', customer: 'Pearl Gems',
  origin: 'Mundra', destination: 'Antwerp', shipmentType: 'LCL', container: 'LCL',
  weight: '0.8 MT', commodity: 'Gems & Jewellery', assignedTo: 'Neha', status: 'Pending',
  ageMinutes: 45, slaMinutes: 60, currency: 'USD', source: 'Email'
},
{
  id: 'PR-2026-00154', receivedAt: '2026-09-12T09:00:00', customer: 'Shri Ram Industries',
  origin: 'Nhava Sheva', destination: 'Rotterdam', shipmentType: 'FCL', container: '45HC',
  weight: '29 MT', commodity: 'FMCG', assignedTo: 'Sahil', status: 'Confirmed',
  ageMinutes: 540, slaMinutes: 60, currency: 'INR',
  assignedAt: '2026-09-12T09:06:00', ratesFoundAt: '2026-09-12T09:40:00',
  ratesRevertedAt: '2026-09-12T09:55:00', tatMinutes: 55, incoterm: 'FOB', source: 'Portal'
},
{
  id: 'PR-2026-00155', receivedAt: '2026-09-12T17:15:00', customer: 'Agile Shipping Co',
  origin: 'Hazira', destination: 'Los Angeles', shipmentType: 'FCL', container: '40HC',
  weight: '17 MT', commodity: 'General Cargo', assignedTo: 'Rahul', status: 'Pending',
  ageMinutes: 55, slaMinutes: 60, currency: 'USD', source: 'Email'
},
{
  id: 'PR-2026-00156', receivedAt: '2026-09-12T14:10:00', customer: 'Classic Furniture',
  origin: 'Chennai', destination: 'New York', shipmentType: 'FCL', container: '40HC',
  weight: '16 MT', commodity: 'Furniture', assignedTo: 'Amit', status: 'Rates Available',
  ageMinutes: 140, slaMinutes: 60, currency: 'USD',
  assignedAt: '2026-09-12T14:16:00', ratesFoundAt: '2026-09-12T14:50:00',
  tatMinutes: 100, source: 'Portal'
},
{
  id: 'PR-2026-00157', receivedAt: '2026-09-12T12:30:00', customer: 'Sterling Minerals',
  origin: 'Mundra', destination: 'Rotterdam', shipmentType: 'FCL', container: '20GP',
  weight: '24 MT', commodity: 'Minerals', assignedTo: 'Priya', status: 'Quoted',
  ageMinutes: 210, slaMinutes: 60, currency: 'EUR',
  assignedAt: '2026-09-12T12:36:00', ratesFoundAt: '2026-09-12T13:05:00',
  ratesRevertedAt: '2026-09-12T13:20:00', tatMinutes: 50, source: 'Email'
}];


// ============================================================
// MOCK RATES for PR-2026-00124
// ============================================================
export const mockRatesForQuery = [
{
  id: 'RT-001', queryId: 'PR-2026-00124', carrier: 'CMA CGM',
  oceanFreight: 79500, originCharges: 13000, destinationCharges: 11000, otherCharges: 1500,
  total: 105000, transitDays: 26, validityFrom: '2026-09-01', validityTo: '2026-09-30',
  service: 'FAL 1 Direct', rank: 1, currency: 'INR', recommended: true, saving: 6000
},
{
  id: 'RT-002', queryId: 'PR-2026-00124', carrier: 'MSC',
  oceanFreight: 82000, originCharges: 14500, destinationCharges: 12000, otherCharges: 2500,
  total: 111000, transitDays: 28, validityFrom: '2026-09-01', validityTo: '2026-09-30',
  service: 'SHOGUN Direct', rank: 2, currency: 'INR', recommended: false
},
{
  id: 'RT-003', queryId: 'PR-2026-00124', carrier: 'Maersk',
  oceanFreight: 84000, originCharges: 13500, destinationCharges: 11500, otherCharges: 2000,
  total: 111000, transitDays: 27, validityFrom: '2026-09-01', validityTo: '2026-09-28',
  service: 'AE-1 Direct', rank: 2, currency: 'INR', recommended: false
},
{
  id: 'RT-004', queryId: 'PR-2026-00124', carrier: 'Hapag-Lloyd',
  oceanFreight: 81000, originCharges: 14000, destinationCharges: 11500, otherCharges: 2000,
  total: 108500, transitDays: 29, validityFrom: '2026-09-01', validityTo: '2026-09-25',
  service: 'ME2 Direct', rank: 3, currency: 'INR', recommended: false
},
{
  id: 'RT-005', queryId: 'PR-2026-00124', carrier: 'COSCO',
  oceanFreight: 80000, originCharges: 14200, destinationCharges: 12500, otherCharges: 2800,
  total: 109500, transitDays: 30, validityFrom: '2026-09-01', validityTo: '2026-09-30',
  service: 'AEX Direct', rank: 4, currency: 'INR', recommended: false
},
{
  id: 'RT-006', queryId: 'PR-2026-00124', carrier: 'ONE',
  oceanFreight: 83500, originCharges: 13800, destinationCharges: 12200, otherCharges: 2500,
  total: 112000, transitDays: 27, validityFrom: '2026-09-01', validityTo: '2026-09-28',
  service: 'EC1 Direct', rank: 5, currency: 'INR', recommended: false
}];


// ============================================================
// CARRIERS
// ============================================================
export const mockCarriers = [
{ id: 'CMA', name: 'CMA CGM', logo: '🚢', avgRate: 108000, bestRateWins: 38, totalQuotes: 142, avgTransit: 26, rateCoverage: 95, performanceScore: 92, color: '#1565c0' },
{ id: 'MSC', name: 'MSC', logo: '🚢', avgRate: 112000, bestRateWins: 28, totalQuotes: 138, avgTransit: 28, rateCoverage: 98, performanceScore: 88, color: '#6a1b9a' },
{ id: 'MRK', name: 'Maersk', logo: '🚢', avgRate: 114000, bestRateWins: 22, totalQuotes: 135, avgTransit: 27, rateCoverage: 97, performanceScore: 86, color: '#01579b' },
{ id: 'HPL', name: 'Hapag-Lloyd', logo: '🚢', avgRate: 110500, bestRateWins: 25, totalQuotes: 118, avgTransit: 29, rateCoverage: 90, performanceScore: 84, color: '#e65100' },
{ id: 'CSC', name: 'COSCO', logo: '🚢', avgRate: 109500, bestRateWins: 20, totalQuotes: 110, avgTransit: 30, rateCoverage: 88, performanceScore: 82, color: '#880e4f' },
{ id: 'ONE', name: 'ONE', logo: '🚢', avgRate: 113000, bestRateWins: 15, totalQuotes: 96, avgTransit: 28, rateCoverage: 85, performanceScore: 80, color: '#e91e63' },
{ id: 'EVG', name: 'Evergreen', logo: '🚢', avgRate: 107500, bestRateWins: 12, totalQuotes: 88, avgTransit: 31, rateCoverage: 82, performanceScore: 78, color: '#2e7d32' },
{ id: 'YML', name: 'Yang Ming', logo: '🚢', avgRate: 106000, bestRateWins: 8, totalQuotes: 72, avgTransit: 32, rateCoverage: 78, performanceScore: 75, color: '#00796b' }];


// ============================================================
// RATE MASTER
// ============================================================
export const mockRateMaster = [
{ id: 'RM-001', carrier: 'CMA CGM', origin: 'Nhava Sheva', destination: 'Rotterdam', service: 'FAL 1', container: '40HC', oceanFreight: 79500, originCharges: 13000, destinationCharges: 11000, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'INR', status: 'Active' },
{ id: 'RM-002', carrier: 'MSC', origin: 'Nhava Sheva', destination: 'Rotterdam', service: 'SHOGUN', container: '40HC', oceanFreight: 82000, originCharges: 14500, destinationCharges: 12000, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'INR', status: 'Active' },
{ id: 'RM-003', carrier: 'Maersk', origin: 'Nhava Sheva', destination: 'Rotterdam', service: 'AE-1', container: '40HC', oceanFreight: 84000, originCharges: 13500, destinationCharges: 11500, validityFrom: '2026-09-01', validityTo: '2026-09-28', currency: 'INR', status: 'Expiring' },
{ id: 'RM-004', carrier: 'Hapag-Lloyd', origin: 'Nhava Sheva', destination: 'Rotterdam', service: 'ME2', container: '40HC', oceanFreight: 81000, originCharges: 14000, destinationCharges: 11500, validityFrom: '2026-09-01', validityTo: '2026-09-25', currency: 'INR', status: 'Expiring' },
{ id: 'RM-005', carrier: 'CMA CGM', origin: 'Mundra', destination: 'Hamburg', service: 'FAL 3', container: '40GP', oceanFreight: 78000, originCharges: 12500, destinationCharges: 10500, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'USD', status: 'Active' },
{ id: 'RM-006', carrier: 'MSC', origin: 'Mundra', destination: 'Hamburg', service: 'PEARL', container: '40GP', oceanFreight: 80500, originCharges: 13500, destinationCharges: 11000, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'USD', status: 'Active' },
{ id: 'RM-007', carrier: 'COSCO', origin: 'Nhava Sheva', destination: 'Antwerp', service: 'AEX', container: '40HC', oceanFreight: 80000, originCharges: 14000, destinationCharges: 12000, validityFrom: '2026-08-15', validityTo: '2026-09-15', currency: 'INR', status: 'Expiring' },
{ id: 'RM-008', carrier: 'ONE', origin: 'Chennai', destination: 'Dubai', service: 'AAX', container: '20GP', oceanFreight: 42000, originCharges: 8000, destinationCharges: 6500, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'USD', status: 'Active' },
{ id: 'RM-009', carrier: 'Evergreen', origin: 'Hazira', destination: 'Rotterdam', service: 'AEX2', container: '40HC', oceanFreight: 76000, originCharges: 13200, destinationCharges: 10800, validityFrom: '2026-08-01', validityTo: '2026-09-10', currency: 'INR', status: 'Expired' },
{ id: 'RM-010', carrier: 'Yang Ming', origin: 'Kolkata', destination: 'Singapore', service: 'KSX', container: '40GP', oceanFreight: 52000, originCharges: 9000, destinationCharges: 7500, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'USD', status: 'Active' },
{ id: 'RM-011', carrier: 'Hapag-Lloyd', origin: 'Nhava Sheva', destination: 'New York', service: 'IEX', container: '40HC', oceanFreight: 92000, originCharges: 16000, destinationCharges: 14500, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'USD', status: 'Active' },
{ id: 'RM-012', carrier: 'Maersk', origin: 'Mundra', destination: 'Dubai', service: 'MGX', container: '20GP', oceanFreight: 38000, originCharges: 7500, destinationCharges: 6000, validityFrom: '2026-09-05', validityTo: '2026-09-30', currency: 'USD', status: 'Active' },
{ id: 'RM-013', carrier: 'CMA CGM', origin: 'Chennai', destination: 'Singapore', service: 'INDAMEX', container: '40GP', oceanFreight: 48000, originCharges: 8500, destinationCharges: 7000, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'USD', status: 'Active' },
{ id: 'RM-014', carrier: 'MSC', origin: 'Nhava Sheva', destination: 'Los Angeles', service: 'INDUS', container: '40HC', oceanFreight: 98000, originCharges: 17000, destinationCharges: 15000, validityFrom: '2026-09-01', validityTo: '2026-09-28', currency: 'USD', status: 'Expiring' },
{ id: 'RM-015', carrier: 'COSCO', origin: 'Hazira', destination: 'Jebel Ali', service: 'IPX', container: '20GP', oceanFreight: 36000, originCharges: 7000, destinationCharges: 5500, validityFrom: '2026-09-01', validityTo: '2026-09-30', currency: 'USD', status: 'Active' }];


// ============================================================
// TEAM MEMBERS
// ============================================================
export const mockTeam = [
{ name: 'Sahil', assigned: 42, completed: 38, pending: 4, avgTat: 38, slaCompliance: 96.2, quotes: 35, conversionRate: 82 },
{ name: 'Rahul', assigned: 38, completed: 34, pending: 4, avgTat: 44, slaCompliance: 92.1, quotes: 30, conversionRate: 78 },
{ name: 'Amit', assigned: 35, completed: 31, pending: 4, avgTat: 46, slaCompliance: 91.4, quotes: 28, conversionRate: 75 },
{ name: 'Neha', assigned: 40, completed: 37, pending: 3, avgTat: 40, slaCompliance: 95.0, quotes: 33, conversionRate: 80 },
{ name: 'Priya', assigned: 29, completed: 26, pending: 3, avgTat: 42, slaCompliance: 93.1, quotes: 23, conversionRate: 77 }];


// ============================================================
// ANALYTICS SERIES DATA
// ============================================================
export const mockDailyVolume = [
{ date: '05 Sep', queries: 18 },
{ date: '06 Sep', queries: 22 },
{ date: '07 Sep', queries: 15 },
{ date: '08 Sep', queries: 28 },
{ date: '09 Sep', queries: 24 },
{ date: '10 Sep', queries: 31 },
{ date: '11 Sep', queries: 26 },
{ date: '12 Sep', queries: 20 }];


export const mockTATTrend = [
{ day: 'Mon', tat: 44, target: 60 },
{ day: 'Tue', tat: 48, target: 60 },
{ day: 'Wed', tat: 39, target: 60 },
{ day: 'Thu', tat: 42, target: 60 },
{ day: 'Fri', tat: 36, target: 60 },
{ day: 'Sat', tat: 38, target: 60 },
{ day: 'Sun', tat: 32, target: 60 }];


export const mockStatusDistribution = [
{ name: 'Confirmed', value: 78, color: '#16a34a' },
{ name: 'Quoted', value: 32, color: '#7c3aed' },
{ name: 'Rates Available', value: 18, color: '#0288d1' },
{ name: 'In Progress', value: 8, color: '#1565c0' },
{ name: 'Pending', value: 12, color: '#e65100' },
{ name: 'No Rate', value: 14, color: '#9e9e9e' },
{ name: 'SLA Breached', value: 6, color: '#b71c1c' }];


export const mockShipmentTypes = [
{ name: 'FCL', value: 134, color: '#1565c0' },
{ name: 'LCL', value: 50, color: '#0288d1' }];


export const mockTradeLanes = [
{ lane: 'Nhava Sheva → Rotterdam', queries: 42, avgRate: 110000, avgTat: 41 },
{ lane: 'Nhava Sheva → Hamburg', queries: 35, avgRate: 106000, avgTat: 44 },
{ lane: 'Mundra → Dubai', queries: 28, avgRate: 48000, avgTat: 38 },
{ lane: 'Nhava Sheva → New York', queries: 24, avgRate: 128000, avgTat: 46 },
{ lane: 'Chennai → Singapore', queries: 20, avgRate: 62000, avgTat: 36 },
{ lane: 'Mundra → Antwerp', queries: 18, avgRate: 108000, avgTat: 42 },
{ lane: 'Hazira → Rotterdam', queries: 16, avgRate: 104000, avgTat: 48 },
{ lane: 'Kolkata → Singapore', queries: 14, avgRate: 68000, avgTat: 40 }];


export const mockCarrierCompetitiveness = [
{ carrier: 'CMA CGM', bestWins: 38, avgRate: 108000, coverage: 95, avgTransit: 26, quotes: 142 },
{ carrier: 'MSC', bestWins: 28, avgRate: 112000, coverage: 98, avgTransit: 28, quotes: 138 },
{ carrier: 'Maersk', bestWins: 22, avgRate: 114000, coverage: 97, avgTransit: 27, quotes: 135 },
{ carrier: 'Hapag-Lloyd', bestWins: 25, avgRate: 110500, coverage: 90, avgTransit: 29, quotes: 118 },
{ carrier: 'COSCO', bestWins: 20, avgRate: 109500, coverage: 88, avgTransit: 30, quotes: 110 },
{ carrier: 'ONE', bestWins: 15, avgRate: 113000, coverage: 85, avgTransit: 28, quotes: 96 },
{ carrier: 'Evergreen', bestWins: 12, avgRate: 107500, coverage: 82, avgTransit: 31, quotes: 88 },
{ carrier: 'Yang Ming', bestWins: 8, avgRate: 106000, coverage: 78, avgTransit: 32, quotes: 72 }];


export const mockPricingFunnel = [
{ stage: 'Incoming Queries', count: 184, pct: 100, color: '#1565c0' },
{ stage: 'Assigned', count: 178, pct: 96.7, color: '#0288d1' },
{ stage: 'Rates Found', count: 156, pct: 84.8, color: '#0097a7' },
{ stage: 'Rates Quoted', count: 142, pct: 77.2, color: '#7c3aed' },
{ stage: 'Quotes Confirmed', count: 78, pct: 42.4, color: '#16a34a' },
{ stage: 'Bookings', count: 54, pct: 29.3, color: '#15803d' }];


export const mockHourlyVolume = [
{ hour: '09 AM', Mon: 8, Tue: 6, Wed: 10, Thu: 7, Fri: 9, Sat: 3, Sun: 2 },
{ hour: '10 AM', Mon: 14, Tue: 16, Wed: 12, Thu: 15, Fri: 13, Sat: 5, Sun: 3 },
{ hour: '11 AM', Mon: 18, Tue: 20, Wed: 16, Thu: 19, Fri: 17, Sat: 7, Sun: 4 },
{ hour: '12 PM', Mon: 22, Tue: 18, Wed: 20, Thu: 22, Fri: 21, Sat: 8, Sun: 5 },
{ hour: '01 PM', Mon: 16, Tue: 14, Wed: 18, Thu: 16, Fri: 15, Sat: 6, Sun: 4 },
{ hour: '02 PM', Mon: 24, Tue: 26, Wed: 22, Thu: 25, Fri: 23, Sat: 9, Sun: 5 },
{ hour: '03 PM', Mon: 20, Tue: 22, Wed: 18, Thu: 21, Fri: 19, Sat: 7, Sun: 4 },
{ hour: '04 PM', Mon: 16, Tue: 14, Wed: 17, Thu: 15, Fri: 14, Sat: 5, Sun: 3 },
{ hour: '05 PM', Mon: 10, Tue: 12, Wed: 9, Thu: 11, Fri: 8, Sat: 4, Sun: 2 },
{ hour: '06 PM', Mon: 4, Tue: 5, Wed: 3, Thu: 4, Fri: 3, Sat: 2, Sun: 1 }];


export const mockRateValidity = [
{ name: 'Valid', value: 68, color: '#16a34a' },
{ name: 'Expiring 7 days', value: 14, color: '#f59e0b' },
{ name: 'Expiring 3 days', value: 8, color: '#f97316' },
{ name: 'Expired', value: 10, color: '#ef4444' }];


export const mockRateCoverage = [
{ segment: 'FCL 40HC', found: 94, notFound: 6 },
{ segment: 'FCL 40GP', found: 90, notFound: 10 },
{ segment: 'FCL 20GP', found: 88, notFound: 12 },
{ segment: 'LCL', found: 78, notFound: 22 }];


export const mockSavingsTrend = [
{ month: 'Apr', highest: 128000, recommended: 116000, saving: 12000 },
{ month: 'May', highest: 132000, recommended: 119000, saving: 13000 },
{ month: 'Jun', highest: 130000, recommended: 118500, saving: 11500 },
{ month: 'Jul', highest: 135000, recommended: 121000, saving: 14000 },
{ month: 'Aug', highest: 133000, recommended: 120500, saving: 12500 },
{ month: 'Sep', highest: 134500, recommended: 121800, saving: 12700 }];


// ============================================================
// NOTIFICATIONS
// ============================================================
export const mockNotifications = [
{ id: 1, type: 'warning', message: 'PR-2026-00129 has been pending for 142 minutes — SLA Breached', time: '2 min ago', read: false },
{ id: 2, type: 'alert', message: '3 rates are expiring within 3 days (Maersk, COSCO, Hapag-Lloyd)', time: '8 min ago', read: false },
{ id: 3, type: 'info', message: 'CMA CGM is currently the best rate for PR-2026-00124 at ₹1,05,000', time: '22 min ago', read: false },
{ id: 4, type: 'warning', message: 'PR-2026-00143 SLA breached — assigned to Neha', time: '1h ago', read: true },
{ id: 5, type: 'success', message: 'PR-2026-00127 confirmed — Bharat Steel Corp', time: '2h ago', read: true },
{ id: 6, type: 'alert', message: '2 queries have no matching rates in Rate Master', time: '3h ago', read: true },
{ id: 7, type: 'info', message: 'New query PR-2026-00155 received from Agile Shipping Co', time: '3h ago', read: true }];


// ============================================================
// KPI SUMMARY
// ============================================================
export const mockKPIs = {
  totalQueries: 184,
  pending: 12,
  ratesAvailable: 156,
  ratesQuoted: 142,
  ratesConfirmed: 78,
  slaBreached: 6,
  avgResponseTAT: 42,
  slaCompliance: 93.4,
  trends: {
    totalQueries: +8.4,
    pending: -2.1,
    ratesAvailable: +5.2,
    ratesQuoted: +3.8,
    ratesConfirmed: +11.2,
    slaBreached: -1.5,
    avgResponseTAT: -4.3,
    slaCompliance: +1.2
  }
};