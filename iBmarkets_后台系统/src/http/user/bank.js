// 请求接口文件
import axios from '../api' // 倒入 api
// 获取用户所有银行卡
export const BANK_GETUSERBANKS = data => {
    return axios({
        url: `/bank/getUserBanks`,
        method: 'get',
    })
}
// 添加银行卡
export const BANK_ADDUSERBANK = data => {
    return axios({
        url: `/bank/addUserBank`,
        method: 'post',
        data
    })
}
// 删除银行卡
export const BANK_DELETEUSERBANK = data => {
    return axios({
        url: `/bank/deleteUserBank`,
        method: 'post',
        data
    })
}
// 获取所有系统银行卡
export const BANK_GETSYSTEMBANK = data => {
    return axios({
        url: `/bank/getSystemBank`,
        method: 'get',
    })
}
// 银行支付入金申请
export const CLOUNDWALLETAPI_BANKPAY = data => {
    return axios({
        url: `/cloudWalletApi/bankPay`,
        method: 'post',
        data
    })
}

export default {
    BANK_GETUSERBANKS,
    BANK_ADDUSERBANK,
    BANK_DELETEUSERBANK,
    BANK_GETSYSTEMBANK,
    CLOUNDWALLETAPI_BANKPAY
}
