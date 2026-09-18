function generateMockQueries(count, isExport) {
  const airports = isExport ? ['DEL', 'BOM', 'MAA', 'BLR', 'HYD'] : ['DXB', 'DOH', 'FRA', 'LHR', 'AMS', 'CDG', 'SIN', 'HKG', 'JFK', 'ORD', 'YYZ'];
  const destinations = isExport ? ['DXB', 'DOH', 'FRA', 'LHR', 'AMS', 'CDG', 'SIN', 'HKG', 'JFK', 'ORD', 'YYZ'] : ['DEL', 'BOM', 'MAA', 'BLR', 'HYD'];
  const customers = ['ABC Industrial Components Pvt Ltd', 'Nehal Naturals', 'GlobalTech Components', 'Shree Exports', 'Apex Electronics India', 'Vardhman Textiles', 'Prime Auto Components', 'Zenith Pharma Logistics', 'Nova Engineering', 'Arvind International'];
  const commodities = ['Garments', 'Auto Components', 'Electronics', 'Pharmaceuticals', 'Engineering Parts', 'Samples', 'Textiles', 'Machinery Parts', 'Medical Equipment', 'Industrial Components'];
  const statuses = ['Pending', 'Rate Available', 'Quoted', 'Confirmed', 'Closed'];

  const queries = [];
  const typeStr = isExport ? 'EXP' : 'IMP';

  for (let i = 1; i <= count; i++) {
    const origin = airports[Math.floor(Math.random() * airports.length)];
    const dest = destinations[Math.floor(Math.random() * destinations.length)];
    const pieces = Math.floor(Math.random() * 50) + 1;
    const grossWeight = Math.floor(Math.random() * 1500) + 20; 
    
    // Generate realistic dimensions for volumetric weight
    const l = Math.floor(Math.random() * 100) + 40;
    const w = Math.floor(Math.random() * 100) + 40;
    const h = Math.floor(Math.random() * 100) + 40;
    
    const volWeight = (l * w * h * pieces) / 6000;
    const chargeableWeight = Math.max(grossWeight, volWeight);
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const ageMinutes = Math.floor(Math.random() * 300) + 5; // 5 mins to 5 hours

    queries.push({
      id: `AIR-${typeStr}-26${String(i).padStart(3, '0')}`,
      receivedAt: new Date(Date.now() - ageMinutes * 60000).toISOString(),
      customer: customers[Math.floor(Math.random() * customers.length)],
      type: isExport ? 'Export' : 'Import',
      origin,
      destination: dest,
      commodity: commodities[Math.floor(Math.random() * commodities.length)],
      pieces,
      grossWeight,
      dimensions: `${l}x${w}x${h} cm`,
      volumetricWeight: volWeight,
      chargeableWeight,
      service: Math.random() > 0.3 ? 'Standard' : 'Express',
      ageMinutes,
      status,
      assignedTo: ['Sahil', 'Rahul', 'Amit', 'Neha', 'Priya'][Math.floor(Math.random() * 5)],
    });
  }
  
  // Sort by age (newest first for Pending)
  return queries.sort((a, b) => (new Date(b.receivedAt) - new Date(a.receivedAt)));
}

export const airExportQueries = generateMockQueries(50, true);
export const airImportQueries = generateMockQueries(50, false);
