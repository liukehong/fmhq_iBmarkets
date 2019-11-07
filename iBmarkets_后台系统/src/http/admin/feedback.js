// 请求接口文件
import axios from '../api' // 倒入 api
// 反馈列表
export const SYSYTEM_GETMESSAGESTATUS = data => {
    return axios({
        url: `/system/getMessageStatus?pageSize=${data.pageSize}&pageNum=${data.page}&messageStatus=${data.messageStatus}&userid=${data.userid}`,
        method: 'get'
    })
}
// 用户反馈内容
export const SYSTEM_REPLY = data => {
    return axios({
        url: `/system/reply`,
        method: 'post',
        data
    })
}
export default {
    SYSYTEM_GETMESSAGESTATUS,
    SYSTEM_REPLY
}
