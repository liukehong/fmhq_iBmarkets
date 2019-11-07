import Vue from 'vue'
import Router from 'vue-router'
// 容器
import Main from '@/views/Main'

// 记录页面
import History_Page from '@/views/Other/Index'

// 登录页
import Login from '@/views/Login/Index'
// 管理员登录页
import Admin_login from '@/views/Login/Admin_index'
// 首页
import Home from '@/views/User/Home/index'
// 我的账户
import my_account from '@/views/User/my_account/index'
// 我的钱包
import my_wallet from '@/views/User/my_wallet/index'

// RP充值
import add_rp from '@/views/User/wallet/addRp/index'
// 提币申请
import apply_coin from '@/views/User/wallet/applyCoin/index'
// 提币申请
import transfer_exchange from '@/views/User/wallet/transferExchange/index'






// 钱包明细
import wallet_list from '@/views/User/wallet_list/index'
// mt4账号
import mt4_account from '@/views/User/mt4_account/index'
// 购买配套
import product_buy from '@/views/User/product/buy/index'
// 配套列表
import product_list from '@/views/User/product/list/index'
// 配套日志
import product_record from '@/views/User/product/record/index'
// 解约记录
import product_rescission from '@/views/User/product/rescission/index'
// 我的下级
import my_child from '@/views/User/my_child/index'
// 发送反馈
import feedback_manage from '@/views/User/feedback_manage/index'
// 系统公告
import notice from '@/views/User/notice/index'
// 注册会员
import member from '@/views/User/member/index'
// 首页
const ONE_ROUTER = {
  path: 'user',
  name: 'oneRouter',
  component: Main,
  children: [
    {
      path: '/user/home',
      name: 'home',
      component: Home
    },
    {
      path: '/user/my_account',
      name: 'my_account',
      component: my_account
    },
    {
      path: '/user/my_wallet',
      name: 'my_wallet',
      component: my_wallet
    },
    {
      path: '/user/add_rp',
      name: 'add_rp',
      component: add_rp
    },
    {
      path: '/user/apply_coin',
      name: 'apply_coin',
      component: apply_coin
    },
    {
      path: '/user/transfer_exchange',
      name: 'transfer_exchange',
      component: transfer_exchange
    },
    {
      path: '/user/wallet_list',
      name: 'wallet_list',
      component: wallet_list
    },
    {
      path: '/user/mt4_account',
      name: 'mt4_account',
      component: mt4_account
    },
    {
      path: '/user/product_buy',
      name: 'product_buy',
      component: product_buy
    },
    {
      path: '/user/product_list',
      name: 'product_list',
      component: product_list
    },
    {
      path: '/user/product_record',
      name: 'product_record',
      component: product_record
    },
    {
      path: '/user/product_rescission',
      name: 'product_rescission',
      component: product_rescission
    },
    {
      path: '/user/my_child',
      name: 'my_child',
      component: my_child
    },
    {
      path: '/user/feedback_manage',
      name: 'feedback_manage',
      component: feedback_manage
    },
    {
      path: '/user/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/user/member',
      name: 'member',
      component: member
    },
  ]
}


Vue.use(Router)
// 用户登陆
const LOGIN_USER = {
  path: '/',
  name: 'login',
  component: Login,
  children: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Login
    },
  ]
}
// 历史记录
const HISTORY_PAGE = {
  path: '/history',
  name: 'history',
  component: History_Page,
}
// 管理员登录
const LOGIN_ADMIN = {
  path: '/admin_login',
  name: 'admin',
  component: Admin_login,
}

// 注册会员
const MEMBER = {
  path: '/user',
  name: 'member',
  component: Main,
  children: [
   
  ]
}

/* ==================管理员新增路由========= */
// 用户管理
import user_manage from '@/views/Admin/user_manage/user_manage/index'
// 业绩查询
import achievement_search from '@/views/Admin/achievement_search/achievement_search/index'
// 注册会员
import user_reg from '@/views/Admin/user_reg/index'
// 财务盘点
import financial_inventory from '@/views/Admin/financial_inventory/index'
// 业绩查询
import performance_search from '@/views/Admin/performance_search/index'
// MT4出金审核
import cash_review from '@/views/Admin/cash/cash_review/index'
// CP出金审核
import cp_cash_review from '@/views/Admin/cash/cp_cash_review/index'
// MT4出金记录
import cash_record from '@/views/Admin/cash/cash_record/index'
// CP出金记录
import cp_cash_record from '@/views/Admin/cash/cp_cash_record/index'
// 入金审核
import enter_cash from '@/views/Admin/enterCash/index'
// 财务转账
import transfer_manage from '@/views/Admin/transfer/transfer_manage/index'
// 财务列表
import transfer_list from '@/views/Admin/transfer/transfer_list/index'
// 钱包明细
import admin_wallet_list from '@/views/Admin/wallet_list/index'
// 订单查询
import order_search from '@/views/Admin/order_search/index'
// 配套管理
import product_manage from '@/views/Admin/product_manage/index'
// 新闻管理
import news_manage from '@/views/Admin/news_manage/index'
// 节目管理
import program_manage from '@/views/Admin/program_manage/index'
// 系统公告
import notice_list from '@/views/Admin/notice_list/index'
// 反馈信息
import admin_feedback from '@/views/Admin/admin_feedback/index'
// 新手指南
import new_finger_guide from '@/views/Admin/new_finger_guide/index'
// 收益配置
import profit_allocation from '@/views/Admin/profit_allocation/index'
// 配套查询
import matching_inquiries from '@/views/Admin/matching_inquiries/index'
/* ==================管理员新增路由========= */
// 管理员路由
const ADMIN_ROUTER = {
  path: '/admin',
  name: 'admin',
  component: Main,
  children: [
    {
      path: '/admin/user_manage',
      name: 'user_manage',
      component: user_manage
    },
    {
      path: '/admin/achievement_search',
      name: 'achievement_search',
      component: achievement_search
    },
    {
      path: '/admin/user_reg',
      name: 'user_reg',
      component: user_reg
    },
    {
      path: '/admin/financial_inventory',
      name: 'financial_inventory',
      component: financial_inventory
    },
    {
      path: '/admin/performance_search',
      name: 'performance_search',
      component: performance_search
    },
    {
      path: '/admin/cash_review',
      name: 'cash_review',
      component: cash_review
    },
    {
      path: '/admin/cp_cash_review',
      name: 'cp_cash_review',
      component: cp_cash_review
    },
    {
      path: '/admin/cash_record',
      name: 'cash_record',
      component: cash_record
    },
    {
      path: '/admin/cp_cash_record',
      name: 'cp_cash_record',
      component: cp_cash_record
    },
    {
      path: '/admin/enter_cash',
      name: 'enter_cash',
      component: enter_cash
    },
    {
      path: '/admin/transfer_manage',
      name: 'transfer_manage',
      component: transfer_manage
    },
    {
      path: '/admin/transfer_list',
      name: 'transfer_list',
      component: transfer_list
    },
    {
      path: '/admin/order_search',
      name: 'order_search',
      component: order_search
    },
    {
      path: '/admin/wallet_list',
      name: 'admin_wallet_list',
      component: admin_wallet_list
    },
    {
      path: '/admin/product_manage',
      name: 'product_manage',
      component: product_manage
    },
    {
      path: '/admin/news_manage',
      name: 'news_manage',
      component: news_manage
    },
    {
      path: '/admin/program_manage',
      name: 'program_manage',
      component: program_manage
    },
    {
      path: '/admin/notice_list',
      name: 'notice_list',
      component: notice_list
    },
    {
      path: '/admin/admin_feedback',
      name: 'admin_feedback',
      component: admin_feedback
    },
    {
      path: '/admin/new_finger_guide',
      name: 'new_finger_guide',
      component: new_finger_guide
    },
    {
      path: '/admin/profit_allocation',
      name: 'profit_allocation',
      component: profit_allocation
    },
    {
      path: '/admin/matching_inquiries',
      name: 'matching_inquiries',
      component: matching_inquiries
    },
  ]
}
export default new Router({
  routes: [
    HISTORY_PAGE,
    LOGIN_ADMIN,
    LOGIN_USER,
    ONE_ROUTER,
    MEMBER,
    ADMIN_ROUTER
  ]
})
