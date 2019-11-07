// 请求接口文件
import axios from '../api' // 倒入 api
// 团队当前业绩查询
export const LOGGING_ISPERFORMANCE = data => {
    return axios({
        url: `/logging/isPerformance?account=${data.account}`,
        method: 'get'
    })
}
// 查询下属
export const USER_GETSYBORDINATE = data => {
    let account = data.account;
    return axios({
        url: `/user/getSubordinate?account=${account}`,
        method: 'get'
    })
}
// 获取新闻列表
export const SYSTEM_GETNEWS = data => {
    return axios({
        url: `/system/getNews?pageSize=${data.pageSize}&pageNum=${data.page}&newsLanguage=${data.newsLanguage}`,
        method: 'get'
    })
}
// 获取收益
export const LOGGING_SELECTINCOMES = data => {
    return axios({
        url: `/logging/selectIncomes`,
        method: 'get'
    })
}
// 用户升级达标信息
export const USER_USERUPGRADEINFO = () => {
    return axios({
        url: `/user/userUpgradeInfo`,
        method: 'get'
    })
}
export default {
    LOGGING_ISPERFORMANCE,
    USER_GETSYBORDINATE,
    SYSTEM_GETNEWS,
    LOGGING_SELECTINCOMES,
    USER_USERUPGRADEINFO
}
