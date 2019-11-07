// 将axios封装成插件
// 普通用户
import lkh_user from './lkh_user'
// 通用接口
import lkh_common from './lkh_common'
// 钱包
import lkh_wallet from './lkh_wallet'
// 申请/审核
import lkh_apply from './lkh_apply'
// 配套
import lkh_matching from './lkh_matching'
// 反馈
import lkh_feedback from './lkh_feedback'
// 管理员
import lkh_admin from './lkh_admin'




// 通用
import common from './common';
// 验证码
import code from './code';
/* =================用户============= */ 
// 反馈
import user_feedback from './user/feedback';
// 我的账户
import user_account from './user/account';
// mt4账号
import user_mt4 from './user/mt4';
// 我的钱包
import user_wallet from './user/wallet';
// 系统公告
import user_system from './user/system';
// 首页
import user_home from './user/home';
// 银行卡
import user_bank from './user/bank';
/* =================管理员============= */ 
import admin_userInfo from './admin/userInfo';
import admin_report from './admin/report';
import admin_examine from './admin/examine';
import admin_news from './admin/news';
import admin_feedback from './admin/feedback';

let apis = {
    ...lkh_user,
    ...lkh_common,
    ...lkh_wallet,
    ...lkh_apply,
    ...lkh_matching,
    ...lkh_feedback,
    ...lkh_admin,


    ...common,
    ...code,
    ...user_feedback,
    ...user_account,
    ...user_mt4,
    ...user_wallet,
    ...user_system,
    ...user_home,
    ...user_bank,
    ...admin_userInfo,
    ...admin_report,
    ...admin_examine,
    ...admin_news,
    ...admin_feedback
}
const install = Vue => {
    if (install.installed) 
        return;
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        // 注意哦，此处挂载在 Vue 原型的 $api 对象上
        $api: {
            get() {
                return apis
            }
        }
    })
}
export default install