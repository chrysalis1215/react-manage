// 商品列表详情，等待被修改

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import Search from './consumeSearch'
import List from './consumeList';

class InfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: null
        };
    }

    render() {
        const that = this;

        const {
            list,
            pagination
        } = this.props.parentState.rechargeCardUsed;

        const searchProps = {
            onSearch(params) {
                const {query, pathname} = that.props.location
                let req = params ? {
                    ...query,
                    condition: JSON.stringify(params)
                } : {
                    ...query
                }
                that.props.dispatch(routerRedux.push({
                    pathname: pathname,
                    query: req
                }))
            }
        }


        let listProps = {
            dataSource: list || [],
            pagination: pagination,
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

        // 先不做搜索

        return (
            <div>
                <Search {...searchProps} />
                <List {...listProps} />
            </div>
        )
    }
}

export default InfoList
