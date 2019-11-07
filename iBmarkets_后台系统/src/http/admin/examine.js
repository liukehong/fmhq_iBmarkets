// 请求接口文件
import axios from '../api' // 倒入 api
// 出金列表
export const SYSTEM_GETWITHDRAWALAPPLYS = data => {
    return axios({
        url: `/system/getWithdrawalApplys?pageSize=${data.pageSize}&pageNum=${data.page}&withdrawalApplyType=${data.withdrawalApplyType}&withdrawalApplyStatus=${data.withdrawalApplyStatus}&account=${data.account}&spare1=${data.spare1}`,
        method: 'get'
    })
}
// 出金审核
export const SYSTEM_WITHDRAWALREVIEW = data => {
    return axios({
        url: `/system/walletWithdrawalReview`,
        method: 'post',
        data
    })
}
// 入金申请列表
export const LOGGING_GETDEPOSITAPPLICATIONS = data => {
    return axios({
        url: `/logging/getDepositApplications?pageSize=${data.pageSize}&pageNum=${data.page}&depositApplicationStatus=${data.depositApplicationStatus}&userAccount=${data.userAccount}`,
        method: 'get',
    })
}
// 入金审核
export const SYSTEM_DEPOSITREVIEW = data => {
    return axios({
        url: `/system/depositReview`,
        method: 'post',
        data
    })
}
export default {
    SYSTEM_GETWITHDRAWALAPPLYS,
    SYSTEM_WITHDRAWALREVIEW,
    LOGGING_GETDEPOSITAPPLICATIONS,
    SYSTEM_DEPOSITREVIEW
}
