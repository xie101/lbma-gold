export const fmtUSD = (v) => Number(v || 0).toFixed(2);
export const fmtAvail = (profile) => (Number(profile?.balance || 0) - Number(profile?.frozen_balance || 0)).toFixed(2);
