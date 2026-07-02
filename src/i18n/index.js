import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: { translation: { app_name: 'LBMA GOLD', home: 'Home', package_gold: 'Package Gold', transaction: 'Transaction', profile: 'Profile', login: 'Login', register: 'Register', email: 'Email', password: 'Password', forgot_password: 'Forgot Password?', dont_have_account: "Don't have an account?", have_account: 'Already have an account?', login_now: 'Login now', register_now: 'Register now', terms_agree: 'By Continuing you agree to the', terms_service: 'Terms of Service', privacy_policy: 'Privacy Policy', and: 'and', deposit: 'Deposit', withdraw: 'Withdraw', withdrawals: 'withdrawals', deposit_history: 'Deposit history', withdrawal_history: 'withdrawal history', my_wallet: 'MY WALLET', security_settings: 'Security Settings', personal_center: 'Personal center', system_functions: 'System functions', regarding_data: 'Regarding data', about: 'About', qa: 'Q&A', tc: 'T&C', language: 'Language', customer_service: 'Customer service', log_out: 'Log out', invite_code: 'Invite Code', gold_price_quotes: 'GOLD PRICE QUOTES', level: 'LEVEL', current_level: 'current level', next_level_away: 'next level away', commission: 'Commission', min: 'Min', max: 'Max', upgrade_now: 'Upgrade now', history: 'History', top_up: 'Top up', submit: 'Submit', cancel: 'Cancel', confirm: 'Confirm', loading: 'Loading...', success: 'Success', error: 'Error', no_data: 'No data', copy: 'Copy', copied: 'Copied', all: 'All', order_no: 'Order No', amount: 'Amount', status: 'Status', date: 'Date', action: 'Action', detail: 'Detail', team_report: 'Team Report', invite_friends: 'Invite Friends', convert: 'Convert', usdt_convert: 'USDT Convert', realname: 'Real Name Verification', bank: 'Bank Card', password_manage: 'Change Password', withdraw_password: 'Withdraw Password', service: 'Service', shop: 'Shop', order: 'Order', transaction_logs: 'Transaction Logs', account: 'Account' } },
  zh: { translation: { app_name: 'LBMA GOLD', home: '首页', package_gold: '套餐黄金', transaction: '交易记录', profile: '个人中心', login: '登录', register: '注册', email: '邮箱', password: '密码', forgot_password: '忘记密码？', dont_have_account: '还没有账号？', have_account: '已有账号？', login_now: '立即登录', register_now: '立即注册', terms_agree: '继续即表示您同意', terms_service: '服务条款', privacy_policy: '隐私政策', and: '和', deposit: '充值', withdraw: '提现', withdrawals: '提现', deposit_history: '充值记录', withdrawal_history: '提现记录', my_wallet: '我的钱包', security_settings: '安全设置', personal_center: '个人中心', system_functions: '系统功能', regarding_data: '相关数据', about: '关于', qa: '常见问题', tc: '条款条件', language: '语言', customer_service: '客服', log_out: '退出登录', invite_code: '邀请码', gold_price_quotes: '黄金报价', level: '等级', current_level: '当前等级', next_level_away: '距离下一级', commission: '佣金', min: '最低', max: '最高', upgrade_now: '立即升级', history: '历史记录', top_up: '充值', submit: '提交', cancel: '取消', confirm: '确认', loading: '加载中...', success: '成功', error: '错误', no_data: '暂无数据', copy: '复制', copied: '已复制', all: '全部', order_no: '订单号', amount: '金额', status: '状态', date: '日期', action: '操作', detail: '详情', team_report: '团队报表', invite_friends: '邀请好友', convert: '兑换', usdt_convert: 'USDT兑换', realname: '实名认证', bank: '银行卡', password_manage: '修改密码', withdraw_password: '提现密码', service: '客服', shop: '商城', order: '订单', transaction_logs: '交易记录', account: '账户' } }
};

const savedLang = localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  });

export default i18n;
