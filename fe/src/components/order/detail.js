import React, { PropTypes } from 'react';
import { Spin, Table, From, Button, Icon, Row, Col, Anchor } from 'antd';
import styles from './detail.less';

class OrderDetail extends React.Component {
    render() {

        const productColumns = [
            {
                title: '序号',
                key: 'index',
                dataIndex: 'index',
            },
            {
                title: '商品编号',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '商品名称',
                key: 'name',
                dataIndex: 'name',
                render: (text, record) => {
                    if (record.isSummary) {
                        return  '';
                    }
                    let href = `#/product/detail/baseInfo?productId=${record.id}`;
                    return (
                        <span>
                            <a href={href}>{record.name}</a>
                        </span>
                    );
                }
            },
            {
                title: '零拣/整件',
                key: 'stockName',
                dataIndex: 'stockName',
            },
            {
                title: '单位',
                key: 'stockUnit',
                dataIndex: 'stockUnit',
            },
            {
                title: '数量',
                key: 'sourceNumber',
                dataIndex: 'sourceNumber',
            },
            {
                title: '称重',
                key: 'number',
                dataIndex: 'number',
            },
            {
                title: '原价',
                key: 'sourcePrice',
                dataIndex: 'sourcePrice',
                render: (text, record) => {
                    if (record.isSummary) {
                        return '';
                    }
                    return record.sourcePrice;
                }
            },
            {
                title: '单价',
                key: 'price',
                dataIndex: 'price'
            },
            {
                title: '金额',
                key: 'subTotal',
                render: (text, record) => {
                    return record.subTotal;
                }
            },
            {
                title: '需要称重',
                key: 'weighing',
                render: (text, record) => {
                    if (!record.isSummary && record.weighing === 1) {
                        return <Icon type="check" />
                    } else {
                        return '';
                    }
                }
            }
        ];
        const {data} = this.props;

        let summary = {
            index: '合计',
            isSummary: true,
            subTotal: data.totalMoney
        };
        let idx = 1;
        let products = [];

        if (data.orderProducts) {
            products = data.orderProducts.map((item) => {
                return {
                    index: (idx++).toString(),
                    ...item
                }
            });
            if (data.orderProducts.length > 0) {
                products.push(summary);
            }
        }

        return (
        <div>
            <Spin tip='加载中...' spinning={this.props.loading} size='large'>
            <Row className={styles.main}>
                <Col span={1}/>
                <Col span={22}>
                    <Row type="flex" className={styles.row}>
                        <Col span={24} className={styles.title}>{data.title}</Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={8}>订单号：{data.orderNumber}</Col>
                        <Col span={8}>订单日期：{data.createTime}</Col>
                        <Col span={8}>商家：{data.boothInfo.name}</Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={8}>店名：{data.userName}</Col>
                        <Col span={8}>注册手机号：{data.userPhone}</Col>
                        <Col span={8}>订单状态：{data.orderStatus}</Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={8}>收货人：{data.contactName}</Col>
                        <Col span={8}>收货手机号：{data.contactPhone}</Col>
                        <Col span={8}>付款方式：{data.paymentMode}</Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={8}>配送中心：{data.distributionCenter}</Col>
                        <Col span={8}>打印状态：{data.printStatus}</Col>
                        <Col span={8}>客户群：{data.agentMemberGroup}</Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={8}>配送路线：{data.deliveryLine}</Col>
                        <Col span={8}>配送员姓名：{data.dispatchName}</Col>
                        <Col span={8}>配送员手机：{data.dispatchPhone}</Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={16}>收货地址：{data.contactAddress}</Col>
                        <Col span={8}>配送时段：{data.receivingTime}</Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={24}> 
                            <Table
                                dataSource={products}
                                pagination={false}
                                columns={productColumns}
                                rowKey={record => record.id + record.stockName}
                                bordered={true} />
                        </Col>
                    </Row>

                    <Row type="flex" className={styles.row}>
                        <Col span={16}>
                            <Row type="flex" className={styles.row}>
                                <Col span={12}>
                                    客户备注：{data.remarksMessage}
                                </Col>
                                <Col span={12}>
                                    框号：{data.basketInfo}
                                </Col>
                            </Row>

                            <Row type="flex" className={styles.row}>
                                <Col span={24}>
                                    系统备注：{data.sysRemarksMessage}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row type="flex" justify="center" align="middle" className={styles.submitRow}>
                                <Col span={3}>
                                    <Button type="primary"
                                        disabled={true}
                                        size="large">提交</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={1}/>
            </Row>
            </Spin>
        </div>
        );
    }
}

export default OrderDetail;
