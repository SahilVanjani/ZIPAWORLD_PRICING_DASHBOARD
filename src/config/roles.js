export const ROLES = {
  OPS_MANAGER: {
    id: 'OPS_MANAGER',
    name: 'Operations Manager',
    user: 'Rohit Singh',
    access: 'Full Access (Ocean + Air)',
    permissions: {
      ocean: true,
      air: true
    }
  },
  OCEAN_EXEC: {
    id: 'OCEAN_EXEC',
    name: 'Ocean Exec',
    user: 'Gagan Kaushik',
    access: 'Access: Ocean Only',
    permissions: {
      ocean: true,
      air: false
    }
  },
  AIR_EXEC: {
    id: 'AIR_EXEC',
    name: 'Air Exec',
    user: 'Priyanshi Chakravorty',
    access: 'Access: Air Only',
    permissions: {
      ocean: false,
      air: true
    }
  },
  ALL_EXEC: {
    id: 'ALL_EXEC',
    name: 'All Exec',
    user: 'Gagan Kaushik',
    access: 'Access: Ocean + Air Exec',
    permissions: {
      ocean: true,
      air: true
    }
  }
};
