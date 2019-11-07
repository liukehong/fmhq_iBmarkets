// 请求接口文件
import axios from './api' // 倒入 api
// 获取父级推荐码
export const USER_GETUSERCODE = data => {
    return axios({
        url: `/user/getUserCode?userAccount=${data}`,
        method: 'get',
    })
}
// 用户登录
export const USER_LOGIN = data => {
    return axios({
        url: `/user/login?account=${data.account}&password=${data.password}&capText=${data.capText}&timestamp=${data.timestamp}`,
        method: 'get',
    })
}
// 管理员登录
export const USER_LOGINADMIN = data => {
    return axios({
        url: `/user/loginAdmin?account=${data.account}&password=${data.password}&capText=${data.capText}&timestamp=${data.timestamp}`,
        method: 'get',
    })
}
// 获取汇率
export const SYSTEM_EXCHANGERATE = () => {
    return axios({
        url: `/system/exchangeRate`,
        method: 'get',
    })
}
// 用户登出
export const USER_LOGOUT = () => {
    return axios({
        url: `/user/logout`,
        method: 'get',
    })
}
// 超级管理员转账
export const WALLET_SUPERTRANSFERACCOUNTS = (data) => {
    return axios({
        url: `/wallet/supertransferAccounts`,
        method: 'post',
        data
    })
}
// 获取美元兑人民币汇率
export const SYSTEM_EXCHANGERATERMB = () => {
    return axios({
        url: `/system/exchangeRateRmb`,
        method: 'get',
    })
}
export default {
    USER_GETUSERCODE,
    USER_LOGIN,
    USER_LOGINADMIN,
    SYSTEM_EXCHANGERATE,
    USER_LOGOUT,
    WALLET_SUPERTRANSFERACCOUNTS,
    SYSTEM_EXCHANGERATERMB
}
