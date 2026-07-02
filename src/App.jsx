import { Routes, Route, Navigate } from 'react-router-dom';
import { getToken } from './api';
import Layout from './components/Layout';
import InnerLayout from './components/InnerLayout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Record from './pages/Record';
import My from './pages/My';
import Profile from './pages/Profile';
import Password from './pages/Password';
import WithdrawPassword from './pages/WithdrawPassword';
import About from './pages/About';
import QnA from './pages/QnA';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Language from './pages/Language';
import Service from './pages/Service';
import Convert from './pages/Convert';
import Invite from './pages/Invite';
import TeamReport from './pages/TeamReport';
import Order from './pages/Order';
import Shop from './pages/Shop';
import Realname from './pages/Realname';
import Bank from './pages/Bank';
import Deposit from './pages/Deposit';
import DepositForm from './pages/DepositForm';
import DepositWallet from './pages/DepositWallet';
import Deposits from './pages/Deposits';
import DepositHistory from './pages/DepositHistory';
import Withdrawal from './pages/Withdrawal';
import WithdrawalType from './pages/WithdrawalType';
import WithdrawalUSDT from './pages/WithdrawalUSDT';
import WithdrawalHistory from './pages/WithdrawalHistory';
import TransactionLogs from './pages/TransactionLogs';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

function PrivateRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const token = getToken();
  if (token) return <Navigate to="/home" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/register/:inviteCode" element={<PublicRoute><Register /></PublicRoute>} />
      </Route>

      {/* Private routes — with bottom nav */}
      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/record" element={<Record />} />
        <Route path="/my" element={<My />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:tier" element={<Shop />} />
        <Route path="/team-report" element={<TeamReport />} />
        <Route path="/transaction-logs" element={<TransactionLogs />} />
      </Route>

      {/* Private routes — no bottom nav (inner pages) */}
      <Route element={<PrivateRoute><InnerLayout /></PrivateRoute>}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<Password />} />
        <Route path="/withdraw-password" element={<WithdrawPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/q-n-a" element={<QnA />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/language" element={<Language />} />
        <Route path="/service" element={<Service />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:orderNumber" element={<Order />} />
        <Route path="/realname" element={<Realname />} />
        <Route path="/bank" element={<Bank />} />
        <Route path="/bank/:wallettype" element={<Bank />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/deposit-form" element={<DepositForm />} />
        <Route path="/deposit-wallet" element={<DepositWallet />} />
        <Route path="/deposits/:type" element={<Deposits />} />
        <Route path="/deposit-history" element={<DepositHistory />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/withdrawalType" element={<WithdrawalType />} />
        <Route path="/withdrawalUSDT" element={<WithdrawalUSDT />} />
        <Route path="/withdrawal-history" element={<WithdrawalHistory />} />
        <Route path="/account" element={<Account />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
