// Mock API — returns fake data so all pages render content for pixel comparison

const MOCK_DATA = {
  '/user/profile': { email: 'elaarslan207@gmail.com', inviteCode: 'J5QZ7G', balance: '0.11', realName: 'Ela Arslan002' },
  '/user/getBank': { name: 'Bank of America', account: '****1234', ifsc: 'BOFAUS3N' },
  '/user/teamReport': { teamSize: 12, totalCommission: 456.78, list: [
    { email: 'user1@mail.com', commission: 120, date: '2026-06-15' },
    { email: 'user2@mail.com', commission: 85, date: '2026-06-20' },
    { email: 'user3@mail.com', commission: 45, date: '2026-07-01' },
  ]},
  '/user/depositHistory': { list: [
    { orderNo: 'DEP20260701001', amount: 500, createdAt: '2026-07-01 10:30', status: 'completed' },
    { orderNo: 'DEP20260628002', amount: 200, createdAt: '2026-06-28 14:15', status: 'completed' },
  ]},
  '/user/withdrawHistory': { list: [
    { orderNo: 'WTH20260625001', amount: 100, createdAt: '2026-06-25 09:00', status: 'completed' },
  ]},
  '/user/transactionHistory': { list: [
    { type: 'Deposit', description: 'USDT Deposit', amount: 500, date: '2026-07-01' },
    { type: 'Withdraw', description: 'Bank Withdrawal', amount: -100, date: '2026-06-25' },
    { type: 'Commission', description: 'Team Commission', amount: 45, date: '2026-07-01' },
  ]},
  '/trade/getOrder': { list: [
    { orderNo: 'ORD20260701001', amount: 500, createdAt: '2026-07-01 11:00', status: 'completed', weight: '0.0473' },
    { orderNo: 'ORD20260630001', amount: 200, createdAt: '2026-06-30 08:30', status: 'pending', weight: '0.0231' },
    { orderNo: 'ORD20260629003', amount: 350, createdAt: '2026-06-29 15:45', status: 'completed', weight: '0.0354' },
    { orderNo: 'ORD20260628002', amount: 800, createdAt: '2026-06-28 09:20', status: 'completed', weight: '0.0721' },
    { orderNo: 'ORD20260627001', amount: 150, createdAt: '2026-06-27 14:10', status: 'cancelled', weight: '0.0155' },
  ]},
  '/trade/vipList': { currentLevel: 5, progress: { current: 2500, max: 10000 }, list: [
    { level: 1, commission: '4%', min: '$20.00', max: '$499.99' },
    { level: 2, commission: '8%', min: '$500.00', max: '$2,499.99' },
    { level: 3, commission: '12%', min: '$2,500.00', max: '$9,999.99' },
    { level: 4, commission: '15%', min: '$10,000.00', max: '$10,000,000.00' },
  ]},
  '/common/banner': [{ title: 'Welcome to LBMA GOLD' }, { title: 'New VIP rewards available' }],
  '/common/pages': {},
  '/common/about': {},
  '/common/getDeposit': {},
  '/common/getETHConfig': {},
  '/common/getSupport': {},
  '/common/privacyPolicy': {},
  '/common/termsCondition': {},
  '/common/countryCode': [],
  '/trade/doOrder': { success: true },
  '/trade/rotOrder': { success: true },
  '/trade/submitOrder': { success: true },
  '/user/postDeposit': { success: true },
  '/user/postWithdraw': { success: true },
  '/user/postConvert': { success: true },
  '/user/setPassword': { success: true },
  '/user/setWithdrawPassword': { success: true },
  '/user/setName': { success: true },
  '/user/setBank': { success: true },
  '/user/setLang': { success: true },
};

export function getMock(url) {
  for (const [key, data] of Object.entries(MOCK_DATA)) {
    if (url.includes(key)) return { data };
  }
  return null; // let real API calls go through
}
