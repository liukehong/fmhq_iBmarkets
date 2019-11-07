// 请求接口文件
import axios from '../api' // 倒入 api
// 新闻列表
export const SYSTEM_GETNEWS = data => {
    return axios({
        url: `/system/getNews?pageSize=${data.pageSize}&pageNum=${data.page}&newsLanguage=${data.newsLanguage}`,
        method: 'get'
    })
}
// 添加新闻
export const SYSTEM_SETNEWS = data => {
    return axios({
        url: `/system/setNews`,
        method: 'post',
        data
    })
}
// 删除新闻
export const SYSTEM_DELETENEWS = data => {
    return axios({
        url: `/system/deleteNews`,
        method: 'post',
        data
    })
}
// 节目列表
export const SYSTEM_GETPROGRAMS = data => {
    return axios({
        url: `/system/getPrograms?pageSize=${data.pageSize}&pageNum=${data.page}`,
        method: 'get'
    })
}
// 获取最新一个节目
export const SYSTEM_GETNEWPROGRAM = () => {
    return axios({
        url: `/system/getNewProgram`,
        method: 'get',
    })
}
// 删除节目
export const SYSTEM_DELETEPROGRAM = (data) => {
    return axios({
        url: `/system/deleteProgram`,
        method: 'post',
        data
    })
}
export default {
    SYSTEM_GETNEWS,
    SYSTEM_SETNEWS,
    SYSTEM_DELETENEWS,
    SYSTEM_GETPROGRAMS,
    SYSTEM_GETNEWPROGRAM,
    SYSTEM_DELETEPROGRAM
}
