// 请求接口文件
import axios from '../api' // 倒入 api
// 支付
export const CLOUNDWALLETAPI_PAY = data => {
    return axios({
        url: `/cloudWalletApi/pay`,
        method: 'post',
        data
    })
}
// 转账
export const WALLET_TRANSFERACCOUNTS = data => {
    return axios({
        url: `/wallet/transferAccounts`,
        method: 'post',
        data
    })
}
// 退款
export const WALLET_REFOND = data => {
    return axios({
        url: `/wallet/refund`,
        method: 'post',
        data
    })
}
// 充值明细 
export const LOGGING_SELECTORDERUSER = data => {
    return axios({
        url: `/logging/selectOrderUser?pageNum=${data.page}&pageSize=${data.pageSize}&startTime=${data.startTime||''}&endTime=${data.endTime||''}`,
        method: 'get',
    })
}
// 转账明细
export const LOGGING_SELECTWALLETLOGTRANSFER = data => {
    return axios({
        url: `/logging/selectWalletLogTransfer?pageNum=${data.page}&pageSize=${data.pageSize}&account=${data.account}&walletLogType=${data.walletLogType}&startTime=${data.startTime}&endTime=${data.endTime}&walletType=${data.walletType}`,
        method: 'get',
    })
}
// 退款(银行卡)
export const WALLET_REFONDBANK = data => {
    return axios({
        url: `/wallet/refundBank`,
        method: 'post',
        data
    })
}
// 钱包流水
export const LOGGING_GETUSERWALLETLOGS = data => {
    return axios({
        url: `/logging/getUserWalletLogs?pageNum=${data.page}&pageSize=${data.pageSize}&userAccount=${data.userAccount}&walletLogType=${data.walletLogType}&behavior=${data.behavior}&walletType=${data.walletType}&startTime=${data.startTime||''}&endTime=${data.endTime||''}`,
        method: 'get',
    })
}
// cp转rp
export const WALLET_CPTORP = data => {
    return axios({
        url: `/wallet/cpToRp`,
        method: 'post',
        data
    })
}
export default {
    CLOUNDWALLETAPI_PAY,
    WALLET_TRANSFERACCOUNTS,
    WALLET_REFOND,
    LOGGING_SELECTORDERUSER,
    LOGGING_SELECTWALLETLOGTRANSFER,
    WALLET_REFONDBANK,
    LOGGING_GETUSERWALLETLOGS,
    WALLET_CPTORP
}
