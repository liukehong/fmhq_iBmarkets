// 请求接口文件
import axios from '../api' // 倒入 api
// 用户钱包信息
export const WALLET_GETUSERWALLET = data => {
    return axios({
        url: `/wallet/getUserWallet`,
        method: 'get'
    })
}
// 获取当前用户配套信息
export const MATCHING_GETMYMATCHING = data => {
    return axios({
        url: `/matching/getMyMatching?pageNum=${data.page}&pageSize=${data.pageSize}`,
        method: 'get'
    })
}
// 获取所有配套信息
export const MATCHING_GETMATCHINGS = data => {
    return axios({
        url: `/matching/getMatchings`,
        method: 'get'
    })
}
// 配套购买或升级
export const MATCHING_BUYMATCHINGS = data => {
    return axios({
        url: `/matching/buyMatchings`,
        method: 'post',
        data
    })
}
// 获取当前用户个人信息 user/getUserInfo
export const USER_GETUSERINFO = data => {
    return axios({
        url: `/user/getUserInfo`,
        method: 'get'
    })
}
// 更新用户基础信息
export const USER_UPDATEUSERINFO = data => {
    return axios({
        url: `/user/updateUserInfo`,
        method: 'post',
        data
    })
}
// 修改手机号 
export const USER_UPDATEPHONE = data => {
    return axios({
        url: `/user/updatePhone`,
        method: 'post',
        data
    })
}
// 修改邮箱 
export const USER_UPDATEEMAIL = data => {
    return axios({
        url: `/user/updateEmail`,
        method: 'post',
        data
    })
}
// 修改密码 
export const USER_UPDATEPASSWORD = data => {
    return axios({
        url: `/user/updatePassword`,
        method: 'post',
        data
    })
}
// 上级注册
export const USER_REGISTERRDS = data => {
    return axios({
        url: `/user/registereds`,
        method: 'post',
        data
    })
}
// 根据推荐码获得账户
export const USER_GETCODEUSER = data => {
    return axios({
        url: `/user/getCodeUser?code=${data.code}`,
        method: 'get',
    })
}
// 新手指南下载
export const FILE_DOWNLOADNOVICEFILE = data => {
    return axios({
        url: `/file/downloadNoviceFile`,
        method: 'get',
    })
}

export default {
    WALLET_GETUSERWALLET,
    MATCHING_GETMYMATCHING,
    MATCHING_BUYMATCHINGS,
    USER_GETUSERINFO,
    USER_UPDATEUSERINFO,
    USER_UPDATEPHONE,
    USER_UPDATEEMAIL,
    MATCHING_GETMATCHINGS,
    USER_REGISTERRDS,
    USER_GETCODEUSER,
    FILE_DOWNLOADNOVICEFILE
}
