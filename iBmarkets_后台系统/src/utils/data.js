/**
*工具类
*/
const data = {
    // url: 'https://login.ib-markets.com',
    url: (function (num) {
        switch (num) {
            case 0:
                // 线上环境
                return "https://login.ib-markets.com"
                break;
            case 1:
                // 测试地址
                return "https://test.ib-markets.com"
                break;
            case 2:
                // 本地
                return "http://192.168.1.123:8088"
                break;
            default:
                return "http://192.168.1.123:8088"
        }
    })(0),
    path: (function (num) {
        switch (num) {
            case 0:
                // 线上环境
                return "https://api.ib-markets.com:18875/IBMarkets"
                break;
            case 1:
                // 测试地址
                return "https://api.ib-markets.com:18871/IBMarketsTest"
                break;
            case 2:
                // 陈
                return "http://192.168.1.123:8088"
                break; 0
            default:
                return "http://192.168.1.123:8088"
        }
    })(0),
    phone: [
        "+1", "+1242", "+1246", "+1264", "+1268", "+1340", "+1345", "+1441", "+1473", "+1649", "+1664", "+1671",
        "+1758", "+1767", "+1784", "+1809", "+1868", "+1869", "+1876", "+20", "+212", "+213", "+216", "+218", "+220", "+221",
        "+222", "+223", "+224", "+225", "+226", "+227", "+228", "+229", "+230", "+231", "+232", "+233", "+234", "+235", "+236", "+237",
        "+238", "+239", "+240", "+241", "+242", "+243", "+244", "+247", "+248", "+249", "+250", "+251", "+253", "+254", "+255", "+256",
        "+257", "+258", "+260", "+261", "+262", "+263", "+264", "+265", "+266", "+267", "+268", "+269", "+27", "+298",
        "+297", "+299", "+30", "+31", "+32", "+33", "+34", "+350", "+351", "+352", "+353", "+354", "+355", "+356", "+357",
        "+358", "+359", "+36", "+370", "+371", "+372", "+373", "+374", "+375", "+376", "+377", "+378", "+380", "+381",
        "+382", "+383", "+385", "+386", "+387", "+389", "+40", "+41", "+420", "+421", "+423", "+43", "+44", "+45", "+46",
        "+47", "+48", "+501", "+502", "+503", "+504", "+505", "+506", "+507", "+509", "+51", "+52", "+53", "+54", "+55",
        "+56", "+57", "+58", "+590", "+591", "+592", "+593", "+594", "+595", "+596", "+597", "+598", "+599", "+60", "+61",
        "+62", "+63", "+64", "+65", "+66", "+670", "+673", "+675", "+676", "+678", "+679", "+682", "+684", "+685", "+687",
        "+689", "+7", "+81", "+82", "+84", "+852", "+853", "+855", "+856", "+86", "+880", "+886", "+90", "+91", "+92", "+93", "+94",
        "+95", "+960", "+961", "+962", "+963", "+964", "+965", "+966", "+967", "+968", "+970", "+971", "+972", "+973", "+974",
        "+975", "+976", "+977", "+98", "+992", "+993", "+994", "+995", "+996", "+998",
    ],
    // 菜单列表
    menuList: function (type, _this) {
        let obj = {
            '0': [
                {
                    name: _this.$t('menu.systemHome'), // 系统首页
                    icon: 'el-icon-menu',
                    haschildren: false,
                    index: '/user/home',
                },
                {
                    name: _this.$t('menu.myAccount'), // 我的账户
                    icon: 'el-icon-document',
                    haschildren: false,
                    index: '/user/my_account',
                },
                /* {
                    name: _this.$t('menu.myWallet'), // 我的钱包
                    icon: 'el-icon-goods',
                    haschildren: false,
                    index: '/user/my_wallet',
                }, */
                {
                    name: _this.$t('menu.myWallet'), // 我的钱包
                    icon: 'el-icon-goods',
                    haschildren: true,
                    index: 'wallet',
                    list: [
                        {
                            name: _this.$t('title.ap'), // RP充值
                            haschildren: false,
                            index: '/user/add_rp',
                        },
                        {
                            name: _this.$t('title.applyCoin'), // 提币申请
                            haschildren: false,
                            index: '/user/apply_coin',
                        },
                        {
                            name: _this.$t('title.exchange'), // 转账/CP兑换
                            haschildren: false,
                            index: '/user/transfer_exchange',
                        },
                    ]
                },
                {
                    name: _this.$t('menu.walletLog'), // 钱包明细
                    icon: 'el-icon-date',
                    haschildren: false,
                    index: '/user/wallet_list',
                },
                /* {
                    name: _this.$t('menu.MT4Account'), // MT4账号
                    icon: 'el-icon-document',
                    haschildren: false,
                    index: '/user/mt4_account',
                }, */
                {
                    name: _this.$t('menu.productManage'), // 配套管理
                    icon: 'el-icon-document',
                    haschildren: true,
                    index: 'product',
                    list: [
                        {
                            name: _this.$t('menu.productBuy'), // 购买配套
                            haschildren: false,
                            index: '/user/product_buy',
                        },
                        {
                            name: _this.$t('menu.productList'), // 配套列表
                            haschildren: false,
                            index: '/user/product_list',
                        },
                        {
                            name: _this.$t('menu.productLog'), // 配套日志
                            haschildren: false,
                            index: '/user/product_record',
                        },
                        {
                            name: _this.$t('menu.rescission'), // 解约记录
                            haschildren: false,
                            index: '/user/product_rescission',
                        },
                    ]
                },
                {
                    name: _this.$t('menu.regMember'), // 注册会员
                    icon: 'el-icon-news',
                    haschildren: false,
                    index: '/user/member',
                },
                {
                    name: _this.$t('menu.myChild'), // 我的下级
                    icon: 'el-icon-star-off',
                    haschildren: false,
                    index: '/user/my_child',
                },
                {
                    name: _this.$t('menu.sendFeedback'), // 发送反馈
                    icon: 'el-icon-message',
                    haschildren: false,
                    index: '/user/feedback_manage',
                },
                {
                    name: _this.$t('menu.notice'), // 系统公告
                    icon: 'el-icon-setting',
                    haschildren: false,
                    index: '/user/notice',
                },
            ],
            '1': [
                {
                    name: _this.$t('menu.memberList'), // 会员列表
                    haschildren: false,
                    index: '/admin/user_manage',
                    icon: 'el-icon-s-data',
                    list: []
                },
                {
                    name: _this.$t('menu.performanceSearch1'), // 业绩查询
                    haschildren: false,
                    index: '/admin/achievement_search',
                    icon: 'el-icon-s-data',
                    list: []
                },
                {
                    name: _this.$t('menu.regMember'), // 注册会员
                    haschildren: false,
                    index: '/admin/user_reg',
                    icon: 'el-icon-user',
                    list: []
                },
                {
                    name: _this.$t('menu.financialInventory'), // 财务盘点
                    haschildren: false,
                    index: '/admin/financial_inventory',
                    icon: 'el-icon-c-scale-to-original',
                    list: []
                },
                {
                    name: _this.$t('menu.performanceSearch'), // 业绩查询
                    haschildren: false,
                    index: '/admin/performance_search',
                    icon: 'el-icon-data-line',
                    list: []
                },
                {
                    name: _this.$t('menu.transfer'), // 财务
                    haschildren: true,
                    index: 'transfer',
                    icon: 'el-icon-document',
                    list: [
                        {
                            name: _this.$t('menu.transferManage'), // 财务转账
                            haschildren: false,
                            index: '/admin/transfer_manage',
                        },
                        {
                            name: _this.$t('menu.transferList'), // 转账列表
                            haschildren: false,
                            index: '/admin/transfer_list',
                        },
                    ]
                },
                {
                    name: _this.$t('menu.cash'), // 出金
                    haschildren: true,
                    index: 'cash',
                    icon: 'el-icon-coin',
                    list: [
                        {
                            name: _this.$t('menu.cashReview'), // MT4出金审核
                            haschildren: false,
                            index: '/admin/cash_review',
                        },
                        {
                            name: _this.$t('menu.cashRecord'), // MT4出金记录
                            haschildren: false,
                            index: '/admin/cash_record',
                        },
                        {
                            name: _this.$t('menu.cpCashReview'), // CP出金审核
                            haschildren: false,
                            index: '/admin/cp_cash_review',
                        },
                        {
                            name: _this.$t('menu.cpCashRecord'), // MT4出金记录
                            haschildren: false,
                            index: '/admin/cp_cash_record',
                        },
                    ]
                },
                /* {
                    name: _this.$t('menu.enterCash'), // 入金审核
                    haschildren: false,
                    index: '/admin/enter_cash',
                    icon: 'el-icon-document',
                    list: []
                }, */
                {
                    name: _this.$t('menu.walletLog'), // 钱包明细
                    haschildren: false,
                    index: '/admin/wallet_list',
                    icon: 'el-icon-wallet',
                    list: []
                },
                {
                    name: _this.$t('menu.orderSearch'), // 订单查询
                    haschildren: false,
                    index: '/admin/order_search',
                    icon: 'el-icon-s-order',
                    list: []
                },
                /* {
                    name: '配套管理',
                    haschildren: false,
                    index: '/admin/product_manage',
                    icon: 'el-icon-document',
                    list: []
                }, */
                {
                    name: _this.$t('menu.newsManage'), // 新闻管理
                    haschildren: false,
                    index: '/admin/news_manage',
                    icon: 'el-icon-news',
                    list: []
                },
                {
                    name: _this.$t('menu.programManage'), // 节目管理
                    haschildren: false,
                    index: '/admin/program_manage',
                    icon: 'el-icon-news',
                    list: []
                },
                {
                    name: _this.$t('menu.adminFeedback'), // 用户反馈
                    haschildren: false,
                    index: 'admin_feedback',
                    icon: 'el-icon-message',
                    list: []
                },
                {
                    name: _this.$t('menu.noticeList'), // 系统公告
                    haschildren: false,
                    index: 'notice_list',
                    icon: 'el-icon-s-opportunity',
                    list: []
                },
                {
                    name: _this.$t('menu.newFingerGuide'), // 新手指南
                    haschildren: false,
                    index: 'new_finger_guide',
                    icon: 'el-icon-document',
                    list: []
                },
                {
                    name: _this.$t('menu.profitAllocation'), // 收益配置
                    haschildren: false,
                    index: 'profit_allocation',
                    icon: 'el-icon-edit-outline',
                    list: []
                },
                {
                    name: _this.$t('menu.matchingInquiries'), // 配套查询
                    haschildren: false,
                    index: 'matching_inquiries',
                    icon: 'el-icon-search',
                    list: []
                },
            ]
        }
        return obj[type]
    }
}
export default data