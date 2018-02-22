/**
 * @fileOverview 分类管理－商家分类
 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import BoothSearch from '../../../components/category/booth/search'
import BoothModal from '../../../components/category/booth/modal';
import BoothList from '../../../components/category/booth/list';

const CategoryBoothList = ({location, dispatch, categoryBoothList, loading}) => {
    const {list, pagination, currentItem, modalType, modalVisible, businessScope} = categoryBoothList;
    const {field, keyword} = location.query;
    function handleDelete(id) {
        dispatch({
            type: 'categoryBoothList/delete',
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
                pathname: '/category/booth/list',
                query: params
            })) : dispatch(routerRedux.push({
                pathname: '/category/booth/list'
            }))
        },
        onAdd() {
            dispatch({
                type: 'categoryBoothList/showModal',
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
                type: `categoryBoothList/${modalType}`,
                payload: data
            })
        },
        onCancel() {
            dispatch({
                type: 'categoryBoothList/hideModal'
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
            <BoothSearch {...searchProps} />
            <BoothModal {...modalProps} />
            <BoothList {...listProps} />
        </div>
    );
};

CategoryBoothList.propTypes = {
    categoryBoothList: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({categoryBoothList, loading}) {
    return {
        categoryBoothList,
        loading: loading.models.categoryBoothList
    };
}

// export default Products;
export default connect(mapStateToProps)(CategoryBoothList);
