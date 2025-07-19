export interface Allocation {
  name: string;
  value: number;
}

export interface FundingData {
  totalAdvanced: number;
  revenue: number;
  reimbursement: number;
  allocations: Allocation[];
}

export const funding: FundingData = {
  totalAdvanced: 50000,
  revenue: 12000,
  reimbursement: 8000,
  allocations: [
    { name: 'Development', value: 30000 },
    { name: 'Legal', value: 5000 },
    { name: 'Operations', value: 15000 },
  ],
};
