// 请求接口文件
import axios from './api' // 倒入 api
// 获取父级推荐码
export const VERIFICATION_SENDCODE = data => {
    return axios({
        url: `/verification/sendCode?phoneAreaCode=${data.phoneAreaCode}&key=${data.key}&type=${data.type}`,
        method: 'get',
    })
}
// 登录后根据已知该用户信息进行发送验证码
export const VERIFICATION_SENDCODES = data => {
    return axios({
        url: `/verification/sendCodes?type=${data.type}`,
        method: 'get',
    })
}
// 校验验证码 (需要token)
export const VERIFICATION_CODEVERIFICATIONS = data => {
    return axios({
        url: `/verification/codeVerifications?code=${data.code}&type=${data.type}`,
        method: 'get',
    })
}
export default {
    VERIFICATION_SENDCODE,
    VERIFICATION_SENDCODES,
    VERIFICATION_CODEVERIFICATIONS
}
