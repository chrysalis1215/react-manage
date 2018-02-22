/**
 * Created by xunzhi on 2017/6/15.
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import List from '../../components/rechargeCard/list';
import Modal from '../../components/rechargeCard/createCardModal';
import {Button, Row, Col} from 'antd';

const RechargeCardList = ({location, dispatch, rechargeCardList, loading}) => {
    const {
        list,
        pagination,
        modalType,
        modalVisible
    } = rechargeCardList;

    const addButton = {
        onAdd() {
            dispatch({
                type: 'rechargeCardList/showModal',
                payload: {
                    modalType: 'create'
                }
            })
        }
    }

    const modalProps = {
        currentItem: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `rechargeCardList/${modalType}`,
                payload: data
            })
        },
        onCancel() {
            dispatch({
                type: 'rechargeCardList/hideModal'
            })
        },
    }

    const listProps = {
        loading: loading,
        dataSource: list,
        pagination: pagination,
        onPageChange(page) {
            const {query, pathname} = location
            dispatch(routerRedux.push({
                pathname: pathname,
                query: {
                    ...query,
                    page: page.current,
                    pageSize: page.pageSize
                }
            }))
        }
    }

    return (
        <div className='content-inner'>
            <Row style={{margin: 20}}>
                <Button
                    type="primary"
                    style={{marginLeft: 8}}
                    onClick={addButton.onAdd}>
                    添加
                </Button>
            </Row>
            <Modal {...modalProps}/>
            <List {...listProps} />
        </div>
    );
}

RechargeCardList.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({rechargeCardList, loading}) {
    return {
        rechargeCardList,
        loading: loading.models.rechargeCardList
    };
}

// export default Products;
export default connect(mapStateToProps)(RechargeCardList);

