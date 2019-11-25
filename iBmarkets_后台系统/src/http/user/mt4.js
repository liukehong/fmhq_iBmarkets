// 请求接口文件
import axios from '../api' // 倒入 api
// 退款
export const MATCHING_REFUND = data => {
    return axios({
        url: `/matching/refund`,
        method: 'post',
        data
    })
}
// 退款(银行卡)
export const MATCHING_REFUNDBANK = data => {
    return axios({
        url: `/matching/refundBank`,
        method: 'post',
        data
    })
}
// mt4申请列表
export const SYSTEM_GETWIDTHDRAWALAPPLYS = data => {
    return axios({
        url: `/system/getWithdrawalApplys?withdrawalApplyType=${data.withdrawalApplyType}&withdrawalApplyStatus=${data.withdrawalApplyStatus}&account=${data.account}&pageNum=${data.page}&pageSize=${data.pageSize}&startTime=${data.startTime||''}&endTime=${data.endTime||''}`,
        method: 'get',
    })
}
// MT4提现
export const MATCHING_MT4WITHDRAW = data => {
    return axios({
        url: `/matching/mt4Withdraw`,
        method: 'post',
        data
    })
}
// 配套日志
export const LOGGING_USERMATCHINGLOG = data => {
    return axios({
        url: `/logging/userMatchingLog?userMatchingId=${data.userMatchingId}&pageNum=${data.page}&pageSize=${data.pageSize}&umLogBehavior=${data.umLogBehavior}`,
        method: 'get',
    })
}
// 业绩查询
export const LOGGING_GETMONTHSUPERUSERPERFORMANCE = data => {
    return axios({
        url: `/logging/getMonthSuperUserPerformance?account=${data.account}&type=${data.type}&date=${data.date}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get',
    })
}
// 业绩明细
export const LOGGING_GETPERFORMANCEDETAIL = data => {
    return axios({
        url: `/logging/getPerformanceDetail?account=${data.account}&type=${data.type}&date=${data.date}&startTime=${data.startTime}&endTime=${data.endTime}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        method: 'get',
    })
}
export default {
    MATCHING_REFUND,
    SYSTEM_GETWIDTHDRAWALAPPLYS,
    MATCHING_REFUNDBANK,
    MATCHING_MT4WITHDRAW,
    LOGGING_USERMATCHINGLOG,
    LOGGING_GETMONTHSUPERUSERPERFORMANCE,
    LOGGING_GETPERFORMANCEDETAIL
}
