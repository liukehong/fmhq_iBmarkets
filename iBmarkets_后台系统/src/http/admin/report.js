// 请求接口文件
import axios from '../api' // 倒入 api
// 反馈列表
export const LOGGIN_GETDEPOSIT = data => {
    return axios({
        url: `/logging/getDeposit?type=${data.type}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
// 业绩查询
export const LOGGIN_GETSUPERUSERPERFORMANCE = data => {
    return axios({
        url: `/logging/getSuperUserPerformance?pageSize=${data.pageSize}&pageNum=${data.page}&account=${data.account}`,
        method: 'get'
    })
}
// 订单列表
export const LOGGING_SELECTSUPERORDERUSER = data => {
    return axios({
        url: `/logging/selectSuperOrderUser?pageSize=${data.pageSize}&pageNum=${data.page}&account=${data.account}&status=${data.status}&userId=${data.userId}&startTime=${data.startTime}&endTime=${data.endTime}&orderCurrencyType=${data.orderCurrencyType}&type=${data.type}`,
        method: 'get'
    })
}
export default {
    LOGGIN_GETDEPOSIT,
    LOGGIN_GETSUPERUSERPERFORMANCE,
    LOGGING_SELECTSUPERORDERUSER
}
