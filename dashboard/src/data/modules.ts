export type ModuleStatus = 'complete' | 'pending' | 'locked';

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: ModuleStatus;
  link?: string;
}

const modules: Module[] = [
  {
    id: 'dex',
    title: 'DEX',
    description: 'Decentralized exchange',
    progress: 80,
    status: 'pending',
  },
  {
    id: 'cashier',
    title: 'Cashier',
    description: 'Asset-backed cashier system',
    progress: 50,
    status: 'pending',
  },
  {
    id: 'registry',
    title: 'Token Registry',
    description: 'Registry of real-world assets',
    progress: 30,
    status: 'locked',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Blockchain explorer',
    progress: 100,
    status: 'complete',
  },
];

export default modules;
