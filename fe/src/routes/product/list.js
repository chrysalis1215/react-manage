import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ProductList from '../../components/product/list';
import ProductSearch from '../../components/product/search';
import Modal from '../../components/product/modal';


const Product = ({location, dispatch, product, loading}) => {
    const {
        list=[], 
        pagination, 
        currentItem, 
        modalType, 
        modalVisible
    } = product;

    const searchProps = {
        onSearch(params) {
            const state = params ? {
                pathname: '/product/list',
                query: params
            } : {
                pathname: '/product/list'
            };

            dispatch(routerRedux.push(state));
        },
        onAdd() {
            dispatch({
                type: 'product/showModal',
                payload: {
                    modalType: 'create'
                }
            })
        }
    };

    /**
     * 定义添加用户组件属性
     */
    const modalProps = {
        currentItem: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `product/${modalType}`,
                payload: data
            })
        },
        onCancel() {
            dispatch({
                type: 'product/hideModal'
            })
        }
    }

    const listProps = {
        loading: loading,
        dataSource: list,
        pagination: pagination,
        onPageChange(page) {
            const {query, pathname} = location;
            dispatch(routerRedux.push({
                pathname: pathname,
                query: {
                    ...query,
                    page: page.current,
                    pageSize: page.pageSize
                }
            }));
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

    };

    return (
        <div className='content-inner'>
            <ProductSearch {...searchProps} />
            <Modal {...modalProps} />
            <ProductList {...listProps} />
        </div>
    );
}

Product.propTypes = {
    product: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({product, loading}) {
    return {
        product,
        loading: loading.models.product
    };
}

// export default Products;
export default connect(mapStateToProps)(Product);
