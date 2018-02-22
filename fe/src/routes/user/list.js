import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from '../../components/user/list'
import UserSearch from '../../components/user/search'
import UserModal from '../../components/user/modal'

function User ({ location, dispatch, user, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType } = user
  const { field, keyword } = location.query

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `user/${modalType}`,
        payload: data
      })
    },
    onCancel () {
      dispatch({
        type: 'user/hideModal'
      })
    }
  }

  const userListProps = {
    dataSource: list,
    loading: loading,
    pagination: pagination,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname: pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        }
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'user/delete',
        payload: id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }

  const userSearchProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
        var param = {};
        for (var key in fieldsValue) {
            if (fieldsValue[key] !== undefined) {
                param[key] = fieldsValue[key];
            }
        }
      dispatch(routerRedux.push({
        pathname: '/user/list',
        query: {
          ...param,
          curPage: pagination.curPage,
          numPerPage: pagination.numPerPage
        }
      }))
    },
    onAdd () {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />

  return (
    <div className='content-inner'>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps ({ user, loading }) {
  return { 
        user,
        loading: loading.models.user
  }
}

export default connect(mapStateToProps)(User)
