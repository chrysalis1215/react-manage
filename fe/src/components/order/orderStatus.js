import CommonApiSelectComponent from '../common/form/select/commonApiSelectComponent';

class OrderStatus extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            () => {
                return Promise.resolve({data: [
                    {
                        id: 0,
                        name: '未付款'
                    },
                    {
                        id: 1,
                        name: '已支付'
                    },
                    {
                        id: 2,
                        name: '货到付款'
                    },
                    {
                        id: 3,
                        name: '货到未结算'
                    },
                    {
                        id: 4,
                        name: '已结算'
                    },
                    {
                        id: 5,
                        name: '有效订单'
                    },
                    {
                        id: 6,
                        name: '已取消'
                    },
                ]});
            },
            (item) => {return item.id.toString()}, 
            (item) => {return item.name});
    }
}

export default OrderStatus;
