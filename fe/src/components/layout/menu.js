import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { menu } from '../../utils'

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, siderFold, parentPath) {
    parentPath = parentPath || '/';
    return menuArray.map((item) => {
        if (item.show === false) {
            return null;
        }

        let subMenus = [];
        let hasSubMenu = false;
        if (item.child) {
            subMenus = getMenus(item.child, siderFold, parentPath + item.key + '/');
            if (subMenus.length > 0) {
                hasSubMenu = true;
            }
        }

        let key = parentPath + item.key;
        if (hasSubMenu) {
            return <Menu.SubMenu
                    key={key}
                    title={<span>{item.icon ? <Icon type={item.icon} /> : ''}
                        {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
                    </span>}>
                    {subMenus}
                </Menu.SubMenu>;
        } else {
            return <Menu.Item key={key}>
                    <Link to={parentPath + item.key}>
                        {item.icon ? <Icon type={item.icon} /> : ''}
                        {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
                    </Link>
                </Menu.Item>;
        }
    }).filter(item => item !== null);
}

function Menus ({ siderFold, darkTheme, location, handleClickNavMenu}) {
    const menuItems = getMenus(menu, siderFold);

    let selectedKeys = [];
    let keys = location.pathname.split('/').filter((item) => {return item != ''});
    for (let i in keys) {
        selectedKeys.push('/' + keys.slice(0, keys.length - i).join('/'));
    }

    return (
        <Menu
            mode={siderFold ? 'vertical' : 'inline'}
            theme={darkTheme ? 'dark' : 'light'}
            onClick={handleClickNavMenu}
            defaultOpenKeys={selectedKeys}
            defaultSelectedKeys={selectedKeys}>
            {menuItems}
        </Menu>
    )
}

export default Menus
