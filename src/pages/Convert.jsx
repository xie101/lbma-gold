import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notyf } from '../utils/notify';
import { postConvert, getProfile } from '../api';
import Loading from '../components/Loading';


export default function Convert() {
  const nav = useNavigate();
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [initLoading, setInitLoading] = useState(true);
  useEffect(() => { getProfile().then(r => setProfile(r.data?.data || r.data || {})).catch(() => {}).finally(() => setInitLoading(false)); }, []);
  if (initLoading) return <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10"><Loading /></div>;

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!amount) { notyf.error('Enter amount'); return; }
    if (!password) { notyf.error('Enter withdrawal password'); return; }
    setLoading(true);
    try {
      await postConvert({ amount: Number(amount), password });
      notyf.success(`Converted ${amount} USDT`);
      setAmount(''); setPassword('');
    } catch (err) { notyf.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Convert to Gold</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl p-4 mb-4">
          <p className="text-gray-400 text-xs mb-1">Your Balance</p>
          <h2 className="text-[var(--brand)] text-2xl font-bold">${(Number(profile?.balance || 0) - Number(profile?.frozen_balance || 0)).toFixed(2)}</h2>
        </div>
        <div className="bg-[#0a1a3a] rounded-xl p-4">
          <form onSubmit={handleConvert}>
            {/* Enter Amount */}
            <div className="mb-4">
              <label className="text-gray-400 text-xs block mb-2">Enter Amount</label>
              <div className="flex items-center bg-[#0a0e1a] rounded-lg border border-[#374151] overflow-hidden">
                <span className="text-gray-400 text-sm pl-3">$</span>
                <input type="number" required min="1"
                  className="flex-1 bg-transparent text-white text-sm px-2 py-2.5 outline-none"
                  value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.0000" />
              </div>
            </div>

            {/* Convert to — MUI OutlinedInput disabled, shrunk label */}
            <div className="mb-4">
              <div className="MuiFormControl-root MuiTextField-root css-oet9r2" style={{ width: '100%' }}>
                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-disabled MuiFormLabel-filled css-1k49zai"
                  data-shrink="true">
                  Convert to
                </label>
                <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-disabled MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall css-z9nme8">
                  <input disabled type="text"
                    className="MuiInputBase-input MuiOutlinedInput-input Mui-disabled MuiInputBase-inputSizeSmall css-17opruk"
                    defaultValue="Balance" />
                  <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline css-nqlg3w">
                    <legend className="css-14lo706"><span>Convert to</span></legend>
                  </fieldset>
                </div>
              </div>
            </div>

            {/* Withdrawal Password — MUI OutlinedInput, NOT shrunk */}
            <div className="mb-4">
              <div className="MuiFormControl-root MuiTextField-root css-oet9r2" style={{ width: '100%' }}>
                <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required css-9nbiok"
                  data-shrink="false" htmlFor="conv-pw">
                  Withdrawal Password<span aria-hidden="true" className="MuiFormLabel-asterisk css-1xpaobf"> *</span>
                </label>
                <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall css-z9nme8">
                  <input id="conv-pw" required type="password"
                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall css-17opruk"
                    value={password} onChange={e => setPassword(e.target.value)} />
                  <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline css-nqlg3w">
                    <legend className="css-yjsfm1"><span>Withdrawal Password</span></legend>
                  </fieldset>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-[44px] rounded-xl bg-[var(--brand)] text-[#1a1a2e] font-bold text-sm disabled:opacity-50 border-none cursor-pointer">
              {loading ? 'Converting...' : 'Convert Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
