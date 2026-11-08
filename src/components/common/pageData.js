export const currency = (n) =>
  new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 2,
  }).format(n);
export const initialLots = [
  {
    id: 'LOT-26081',
    product: 'Amoxicilline 500 mg',
    sku: 'AMX-500',
    supplier: 'PharmaDistrib',
    quantity: 48,
    expiry: '2026-11-21',
    received: '2026-06-12',
    status: 'Expire bientôt',
  },
  {
    id: 'LOT-26094',
    product: 'Paracétamol 1 g',
    sku: 'PAR-1000',
    supplier: 'Atlas Médical',
    quantity: 120,
    expiry: '2026-12-03',
    received: '2026-07-02',
    status: 'À surveiller',
  },
  {
    id: 'LOT-26102',
    product: 'Ibuprofène 400 mg',
    sku: 'IBU-400',
    supplier: 'PharmaDistrib',
    quantity: 64,
    expiry: '2027-01-15',
    received: '2026-08-15',
    status: 'Conforme',
  },
  {
    id: 'LOT-26114',
    product: 'Vitamine C 1000 mg',
    sku: 'VIT-C-1K',
    supplier: 'Santé Plus',
    quantity: 90,
    expiry: '2027-03-08',
    received: '2026-08-29',
    status: 'Conforme',
  },
  {
    id: 'LOT-26055',
    product: 'Oméprazole 20 mg',
    sku: 'OME-020',
    supplier: 'Atlas Médical',
    quantity: 18,
    expiry: '2026-11-12',
    received: '2026-05-14',
    status: 'Expire bientôt',
  },
];
export const initialOrders = [
  {
    id: 'CMD-2026-048',
    supplier: 'PharmaDistrib',
    date: '08 nov. 2026',
    lines: 8,
    amount: 8420,
    status: 'À recevoir',
  },
  {
    id: 'CMD-2026-047',
    supplier: 'Atlas Médical',
    date: '07 nov. 2026',
    lines: 12,
    amount: 12650,
    status: 'Confirmée',
  },
  {
    id: 'CMD-2026-046',
    supplier: 'Santé Plus',
    date: '05 nov. 2026',
    lines: 5,
    amount: 3940,
    status: 'Brouillon',
  },
  {
    id: 'CMD-2026-045',
    supplier: 'PharmaDistrib',
    date: '02 nov. 2026',
    lines: 10,
    amount: 10320,
    status: 'Reçue',
  },
];
export const products = [
  { id: 'p1', name: 'Paracétamol 1 g', sku: 'PAR-1000', price: 18.5, stock: 120 },
  { id: 'p2', name: 'Amoxicilline 500 mg', sku: 'AMX-500', price: 42, stock: 48 },
  { id: 'p3', name: 'Ibuprofène 400 mg', sku: 'IBU-400', price: 24, stock: 64 },
  { id: 'p4', name: 'Vitamine C 1000 mg', sku: 'VIT-C-1K', price: 36, stock: 90 },
  { id: 'p5', name: 'Oméprazole 20 mg', sku: 'OME-020', price: 29.9, stock: 18 },
  { id: 'p6', name: 'Sérum physiologique', sku: 'SER-500', price: 12, stock: 75 },
];
export const salesData = [
  { day: 'Lun', sales: 4200 },
  { day: 'Mar', sales: 5600 },
  { day: 'Mer', sales: 4900 },
  { day: 'Jeu', sales: 7100 },
  { day: 'Ven', sales: 6300 },
  { day: 'Sam', sales: 8900 },
  { day: 'Dim', sales: 6800 },
];
export const statusClass = (s) =>
  s.toLowerCase().replaceAll(' ', '-').replace('à-', 'a-').replace('é', 'e').replace('ç', 'c');
