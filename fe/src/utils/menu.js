module.exports = [
{
    key: 'booth',
    name: '商家管理',
    icon: 'team',
    clickable:false,
    child: [
        {
            key: 'list',
            name: '商家列表',
        },
        {
            key: 'detail',
            name: '商家详情',
            show: false,
            clickable: false,
            child: [
                {
                    key: 'baseInfo',
                    name: '基本信息',
                },
                {
                    key: 'gps',
                    name: '地理信息'
                },
                {
                    key: 'category',
                    name: '分类信息'
                },
                {
                    key: 'product',
                    name: '商品列表'
                },
                {
                    key: 'img',
                    name: '商家图片'
                },
                {
                    key: 'h5',
                    name: '商家H5'
                }
            ]
        }
    ]
},
{
    key: 'category',
    name: '分类管理',
    icon: 'appstore-o',
    clickable: false,
    child: [
        {
            key: 'booth',
            name: '商家分类',
            child: [
                {
                    key: 'list',
                    name: '分类列表',
                    show: false
                },{
                    key: 'detail',
                    name: '分类详情',
                    show: false,
                    clickable: false,
                    child: [
                        {
                            key: 'baseInfo',
                            name: '基本信息'
                        },
                        {
                            key: 'product',
                            name: '关联商品'
                        },
                        {
                            key: 'img',
                            name: '分类图片'
                        },
                        {
                            key: 'booth',
                            name: '关联商家'
                        },
                    ]
                }
            ]
        },
        {
            key: 'normal',
            name: '一般分类',
            child: [
                {
                    key: 'list',
                    name: '分类列表',
                    show: false
                },{
                    key: 'detail',
                    name: '分类详情',
                    show: false,
                    clickable: false,
                    child: [
                        {
                            key: 'baseInfo',
                            name: '基本信息'
                        },
                        {
                            key: 'product',
                            name: '关联商品'
                        },
                        {
                            key: 'img',
                            name: '分类图片'
                        },
                    ]
                }
            ]
        },
    ]
},
{
    key: 'product',
    name: '商品管理',
    icon: 'inbox',
    child: [
        {
            key: 'list',
            name: '商品列表'
        },
        {
            key: 'detail',
            name: '商品详情',
            show: false,
            clickable: false,
            child: [
                {
                    key: 'baseInfo',
                    name: '基本信息'
                },
                {
                    key: 'retailInfo',
                    name: '商品零拣'
                },
                {
                    key: 'wholesaleInfo',
                    name: '商品整件'
                },
                {
                    key: 'boothCategoryInfo',
                    name: '商家分类'
                },
                {
                    key: 'commonCategoryInfo',
                    name: '一般分类'
                },
                {
                    key: 'picInfo',
                    name: '图片信息'
                },
                {
                    key: 'qualityReportPicInfo',
                    name: '质检报告'
                },
                {
                    key: 'h5Info',
                    name: 'h5页面'
                }
            ]
        }
    ]
},
// {
//     key: 'sale',
//     name: '销售管理',
//     icon: 'area-chart',
//     child: [
//         {
//             key: 'order',
//             name: '订单管理'
//         },
//         {
//             key: 'coupon',
//             name: '优惠券'
//         },
//         {
//             key: 'recharge',
//             name: '充值'
//         },
//         {
//             key: 'marketing',
//             name: '营销策略'
//         }]
// },
{
    key: 'user',
    name: '用户中心',
    icon: 'user',
    child: [
        {
            key: 'list',
            name: '用户列表'
        },
        {
            key: 'detail',
            show: false,
            name: '用户详情',
            clickable: false,
            child: [
                {
                    key: 'baseInfo',
                    show: false,
                    name: '基本信息',
                },
                {
                    key: 'gps',
                    show: false,
                    name: '地理信息'
                },
                {
                    key: 'img',
                    show: false,
                    name: '图片信息'
                },
                {
                    key: 'rechargeCardInfo',
                    show: false,
                    name: '充值记录'
                },
                {
                    key: 'rechargeCardUsed',
                    show: false,
                    name: '消费记录'
                }
            ]
        }]
},
{
    key: 'order',
    name: '订单管理',
    icon: 'shopping-cart',
    child: [
        {
            key: 'list',
            name: '订单列表'
        },
        {
            key: 'rechargeCard',
            name: '充值卡',
            icon: 'credit-card',
            child: [
                {
                    key: 'list',
                    name: '充值卡信息管理'
                },
                {
                    key: 'detail',
                    name: '充值卡详情',
                    show: false,
                    clickable: false,
                    child: [
                        {
                            key: 'baseInfo',
                            name: '基本信息',
                            show: false
                        }
                    ]
                },
                {
                    key: 'salesList',
                    name: '充值卡销售记录'
                }
            ]
        },
        {
            key: 'detail',
            name: '订单详情',
            clickable: false,
            show: false
        }
    ]
}]
