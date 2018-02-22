import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import CategorySearch from './categorySearch'
import CategoryList from './categoryList';

class Category extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        
    }

    render() {
        const that = this
        const {
            list, 
            pagination
        } = this.props.parentState.categoryInfo

        const searchProps = {
            onSearch(params) {
                const {query, pathname} = that.props.location
                that.props.dispatch(routerRedux.push({
                    pathname: pathname,
                    query: {
                        ...that.props.location.query,
                        condition: JSON.stringify(params)
                    }
                }))
            }
        }

        const listProps = {
            dataSource: list || [],
            pagination: pagination,
            rowSelection: {
              onChange: (selectedRowKeys, selectedRows) => {
                that.props.dispatch(
                {
                    type: 'boothDetail/modify',
                    payload: {
                        data: {
                            categoryList: selectedRowKeys
                        },
                        type: 'categoryInfo'
                    }
                }
                );
              },
              getCheckboxProps: record => ({
                defaultChecked: record.categoryBelong === 1,    // Column configuration not to be checked
              }),
            },
            onPageChange(page) {
                const {query, pathname} = that.props.location
                that.props.dispatch(routerRedux.push({
                    pathname: pathname,
                    query: {
                        ...that.props.location.query,
                        page: page.current,
                        pageSize: page.pageSize
                    }
                }))
            }
        }

        return (
            <div>
                <CategorySearch {...searchProps} />
                <CategoryList {...listProps} />
            </div>
        )
    }
}

export default Category
