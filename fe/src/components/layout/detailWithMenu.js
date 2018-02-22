import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Spin, Menu, Modal } from 'antd';
import { queryToSearch } from '../../utils/tools';

class DetailWithMenu extends React.Component {
    /**
     * @abstract
     * @return react component
     */
    getChildComponents() {
        return [];
    }

    /**
     * @abstract
     */
    getChildMenus() {
        return [];
    }

    /**
     * @abstract
     */
    getLocation() {
        return {
            pathname: '',
            query: {}
        };
    }

    /**
     * @abstract
     */
    getQueryKeys() {
        return [];
    }

    getMissingKeys() {
        let keys = [];
        let loc = this.getLocation();
        this.getQueryKeys().forEach((key) => {
            let val = loc.query[key];
            if (!val) {
                keys.push(key);
            }
        });

        return keys;
    }

    getCommonQuery() {
        let query = {};
        let loc = this.getLocation();
        this.getQueryKeys().forEach((name) => {
            let val = loc.query[name];
            if (val) {
                query[name] = val;
            }
        });

        return query;
    }

    showKeysMissingModal() {
        Modal.error({
            title: '无法加载数据',
            content: '缺少参数',
            okText: '返回',
            onOk: () => {
                this.onKeysMissing()
            }
        });
    }

    /**
     * @abstract
     */
    onKeysMissing() {
    }

    getCommonSearch() {
        return queryToSearch(this.getCommonQuery());
    }

    componentDidMount() {
        if (this.getMissingKeys().length > 0) {
            this.showKeysMissingModal();
        }
    }

    render() {
        const search = this.getCommonSearch();
        const childComponents = this.getChildComponents();

        return (
        <div className='content-inner'>
            <div style={{marginBottom: 20}}>
                <Menu
                    selectedKeys={[this.getLocation().pathname]}
                    mode="horizontal">
                    {
                        this.getChildMenus().map((item, index)=> {
                            const s = item.search ? search + '&' + item.search : search;
                            return (
                                <Menu.Item style={{marginRight: 20}} key={item.pathname}>
                                    <Link to={item.pathname + s}>
                                        <span>{item.title}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
            <div>
                <Spin tip='加载中...' spinning={this.props.loading} size='large'>
                    {childComponents}
                </Spin>
            </div>
        </div>
        );
    }
}

export default DetailWithMenu;
