// 请求接口文件
import axios from '../api' // 倒入 api
// 反馈列表
export const SYSTEM_GETMESSAGESTATUS = data => {
    return axios({
        url: `/system/getMessageStatus?pageSize=${data.pageSize}&pageNum=${data.page}&messageStatus=${data.messageStatus}&userid=${data.userid}`,
        method: 'get'
    })
}
// 发送反馈
export const USER_ADDMESSAGE = data => {
    return axios({
        url: `/user/addMessage`,
        method: 'post',
        data
    })
}
export default {
    SYSTEM_GETMESSAGESTATUS,
    USER_ADDMESSAGE
}
