import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'

import Search from '../../../components/category/normal/search'
import Modal from '../../../components/category/normal/modal';
import List from '../../../components/category/normal/list';

const BoothProduct = ({location, dispatch, categoryNormalList, loading}) => {
    const {list, pagination, currentItem, modalType, modalVisible} = categoryNormalList;
    const {field, keyword} = location.query
    function handleDelete(id) {
        dispatch({
            type: 'booth/delete',
            payload: id,
        });
    }


    /**
     * 定义添加搜索属性
     */
    const searchProps = {
        field,
        keyword,
        onSearch(params) {
            params ? dispatch(routerRedux.push({
                pathname: '/category/normal/list',
                query: params
            })) : dispatch(routerRedux.push({
                pathname: '/category/normal/list'
            }))
        },
        onAdd() {
            dispatch({
                type: 'categoryNormalList/showModal',
                payload: {
                    modalType: 'create'
                }
            })
        }

    }

    /**
     * 定义添加用户组件属性
     */
    const modalProps = {
        currentItem: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `categoryNormalList/${modalType}`,
                payload: data
            })
        },
        onCancel() {
            dispatch({
                type: 'categoryNormalList/hideModal'
            })
        }
    }

    /**
     * 定义列表组件的属性
     */
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
        },
        handleDelete(id) {
            dispatch({
                type: 'booth/delete',
                payload: {
                    id: id
                },
            });
        },
        handleEdit(item) {
            dispatch({
                type: 'booth/edit',
                payload: {
                    currentItem: item
                }
            })
        }

    }

    return (
        <div className='content-inner'>
            <Search {...searchProps} />
            <Modal {...modalProps} />
            <List {...listProps} />
        </div>
    );
};

BoothProduct.propTypes = {
    categoryNormalList: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({categoryNormalList, loading}) {
    return {
        categoryNormalList,
        loading: loading.models.categoryNormalList
    };
}

// export default Products;
export default connect(mapStateToProps)(BoothProduct);

