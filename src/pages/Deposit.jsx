import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { getDepositConfig } from '../api';

export default function Deposit() {
  const nav = useNavigate();
  const [copied, setCopied] = useState(false);
  const [addr, setAddr] = useState('');
  const canvasRef = useRef(null);
  useEffect(() => {
    getDepositConfig().then(r => setAddr(r.data?.data?.address || '')).catch(() => {});
  }, []);
  useEffect(() => {
    if (addr && canvasRef.current) QRCode.toCanvas(canvasRef.current, addr, { width: 128 }).catch(() => {});
  }, [addr]);

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-[#0a0e1a] pb-10">
      <div className="flex items-center px-4 pt-3 pb-4">
        <span className="text-white cursor-pointer text-lg" onClick={() => nav(-1)}><i className="fa-solid fa-chevron-left"></i></span>
        <span className="flex-1 text-center text-white font-bold text-base">Deposit</span>
        <span className="w-[18px]"></span>
      </div>
      <div className="px-4 mt-2">
        <div className="bg-[#0a1a3a] rounded-xl p-4">
          <h3 className="text-white text-sm font-bold text-center mb-3">Make Payment to Address:</h3>
          <div className="flex justify-center mb-3">
            <div className="bg-white p-2 rounded-lg">
              <canvas ref={canvasRef} height="128" width="128" style={{ height: 128, width: 128 }}></canvas>
            </div>
          </div>
          <h4 className="text-[var(--brand)] text-center text-sm font-bold mb-4">USDT-TRC</h4>

          <div className="mb-4">
            <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-oet9r2" style={{ width: '100%' }}>
              <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-disabled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined css-9nbiok"
                data-shrink="false">
                Wallet Address
              </label>
              <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary Mui-disabled MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd css-sbcktk">
                <input disabled readOnly type="text"
                  className="MuiInputBase-input MuiOutlinedInput-input Mui-disabled MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd css-1jf37tt"
                  value={addr} />
                <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd MuiInputAdornment-outlined MuiInputAdornment-sizeSmall css-1ti6y9h">
                  <span className="text-[var(--brand)] cursor-pointer text-xs" onClick={() => { navigator.clipboard.writeText(addr); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                    {copied ? 'Copied!' : 'copy'}
                  </span>
                </div>
                <fieldset aria-hidden="true" className="MuiOutlinedInput-notchedOutline css-nqlg3w">
                  <legend className="css-yjsfm1"><span>Wallet Address</span></legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
