// 请求接口文件
import axios from '../api' // 倒入 api
// 系统公告列表
export const SYSTEM_GETSYSTEMANNOUNCEMENTS = data => {
    return axios({
        url: `/system/getSystemAnnouncements?pageNum=${data.page}&pageSize=${data.pageSize}`,
        method: 'get',
    })
}
// 新增系统公告
export const SYSTEM_SETSYSTEMANNOUNCEMENT = data => {
    return axios({
        url: `/system/setSystemAnnouncement`,
        method: 'post',
        data
    })
}
// 新增系统公告
export const SYSTEM_DELETESYSTEMANNOUNCEMENT = data => {
    return axios({
        url: `/system/deleteSystemAnnouncement`,
        method: 'post',
        data
    })
}
export default {
    SYSTEM_GETSYSTEMANNOUNCEMENTS,
    SYSTEM_SETSYSTEMANNOUNCEMENT,
    SYSTEM_DELETESYSTEMANNOUNCEMENT
}
