// 请求接口文件
import axios from '../api' // 倒入 api
// 用户列表
export const USER_GETUSERINFOS = data => {
    return axios({
        url: `/user/getUserInfoAlls2?pageSize=${data.pageSize}&pageNum=${data.page}&account=${data.account}&type=${data.type}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
// 业绩查询
export const USER_GETUSERINFOALLS = data => {
    return axios({
        url: `/user/getUserInfoAlls?pageSize=${data.pageSize}&pageNum=${data.page}&account=${data.account}&type=${data.type}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
// 注册新会会员
export const USER_REGISTERED = data => {
    return axios({
        url: `/user/registered`,
        method: 'post',
        data
    })
}
// 管理员更新用户注册信息
export const USER_UPDATEUSERINFOSUPER = data => {
    return axios({
        url: `/user/updateUserInfoSuper`,
        method: 'post',
        data
    })
}
// 管理员查询用户信息
/* export const USER_GETUSERINFOS = data => {
    return axios({
        url: `/user/getUserInfos?userId=${data.userId}`,
        method: 'get'
    })
} */
// 管理员后台登陆普通用户账号
export const USER_LOGINTEST = data => {
    return axios({
        url: `/user/loginTest?account=${data.account}`,
        method: 'get'
    })
}
// 管理员重置密码
export const USER_RESETPASSWORD = data => {
    return axios({
        url: `/user/resetPassword`,
        method: 'post',
        data
    })
}
// 用户信息 Excel下载
export const FILE_DOWNLOADUSEREXCE = data => {
    console.log(JSON.parse(data.token),11122)
    let token = JSON.parse(data.token);
    return axios({
        // url: `/file/downloadUserExce?token=${token}`,
        url: `/file/downloadUserExce`,
        method: 'post',
        data,
        type: 'blob'
    })
}
// 获取直推奖励配置
export const SYSTEM_GETACTIVERETURN = data => {
    return axios({
        url: `/system/getActiveReturn?pageSize=${data.pageSize}&pageNum=${data.page}`,
        method: 'get'
    })
}
// 获取团队奖励配置
export const SYSTEM_GETGRADEPROFITMAPPER = data => {
    return axios({
        url: `/system/getGradeProfitMapper?pageSize=${data.pageSize}&pageNum=${data.page}`,
        method: 'get'
    })
}
// 获取团队奖励配置
export const SYSTEM_GETMATCHINGPROFITMAPPER = data => {
    return axios({
        url: `/system/getMatchingProfitMapper?pageSize=${data.pageSize}&pageNum=${data.page}`,
        method: 'get'
    })
}
// 修改直推奖励配置
export const SYSTEM_UPDATEACTIVERETURN = data => {
    return axios({
        url: `/system/updateActiveReturn`,
        method: 'post',
        data
    })
}
// 修改团队奖励配置
export const SYSTEM_UPDATEGRADEPROFITMAPPER = data => {
    return axios({
        url: `/system/updateGradeProfitMapper`,
        method: 'post',
        data
    })
}
// 修改配套等级奖励配置
export const SYSTEM_UPDATEMACHINGPROFITMAPPER = data => {
    return axios({
        url: `/system/updateMatchingProfitMapper`,
        method: 'post',
        data
    })
}
// 获取该用户已被分配好的权限
export const SYSTEM_GETUSERPERMISSIONALL = data => {
    return axios({
        url: `/system/getUserPermissionAll?userId=${data.userId}`,
        method: 'get'
    })
}
// 修改用户权限
export const SYSTEM_UPDATEUSERPERMISSION = data => {
    return axios({
        url: `/system/updateUserPermission`,
        method: 'post',
        data
    })
}
// 获取所有用户的所有配套信息
export const MATCHING_GETALLUSERMATCHING = data => {
    return axios({
        url: `/matching/getAllUserMatching?pageSize=${data.pageSize}&pageNum=${data.page}&userAccount=${data.userAccount}`,
        method: 'get'
    })
}
// 管理员手动添加MT4收益配置
export const MATCHING_ADDMT4PROFIT = data => {
    return axios({
        url: `/matching/addMt4Profit`,
        method: 'post',
        data
    })
}
export default {
    USER_GETUSERINFOS,
    USER_GETUSERINFOALLS,
    USER_REGISTERED,
    USER_UPDATEUSERINFOSUPER,
    USER_LOGINTEST,
    USER_RESETPASSWORD,
    FILE_DOWNLOADUSEREXCE,
    SYSTEM_GETACTIVERETURN,
    SYSTEM_UPDATEACTIVERETURN,
    SYSTEM_GETGRADEPROFITMAPPER,
    SYSTEM_UPDATEGRADEPROFITMAPPER,
    SYSTEM_GETMATCHINGPROFITMAPPER,
    SYSTEM_UPDATEMACHINGPROFITMAPPER,
    SYSTEM_GETUSERPERMISSIONALL,
    SYSTEM_UPDATEUSERPERMISSION,
    MATCHING_GETALLUSERMATCHING,
    MATCHING_ADDMT4PROFIT
}
