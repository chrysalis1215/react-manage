import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import BoothSearch from '../../components/booth/search'
import BoothModal from '../../components/booth/modal';
import BoothList from '../../components/booth/list';

const Booth = ({location, dispatch, booth, loading}) => {
    const {list, pagination, currentItem, modalType, modalVisible, businessScope} = booth;
    const {field, keyword} = location.query

    /**
     * 定义添加搜索属性
     */
    const boothSearchProps = {
        field,
        keyword,
        businessScope,
        onSearch(params) {
            params ? dispatch(routerRedux.push({
                pathname: '/booth/list',
                query: params
                
            })) : dispatch(routerRedux.push({
                pathname: '/booth/list'
            }))
        },

        onAdd() {
            dispatch({
                type: 'booth/showModal',
                payload: {
                    modalType: 'create'
                }
            })
        }
    }


    /**
     * 定义添加用户组件属性
     */
    const boothModalProps = {
        currentItem: modalType === 'create' ? {} : currentItem,
        type: modalType,
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `booth/${modalType}`,
                payload: data
            })
        },
        onCancel() {
            dispatch({
                type: 'booth/hideModal'
            })
        }
    }
    /**
     * 定义列表组件的属性
     */
    const boothListProps = {
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
            <BoothSearch {...boothSearchProps} />
            <BoothModal {...boothModalProps} />
            <BoothList {...boothListProps} />
        </div>
    );
};

Booth.propTypes = {
    booth: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func
}

function mapStateToProps({booth, loading}) {
    return {
        booth,
        loading: loading.models.booth
    };
}

// export default Products;
export default connect(mapStateToProps)(Booth);
