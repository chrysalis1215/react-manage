import menu from './menu';

function keyMappedMenu(menus) {
    let m = {};
    (menus || []).forEach((item) => {
        if (!(item.key in m)) {
            m[item.key] = {
                ...item,
                child: keyMappedMenu(item.child)
            };
        }
    });
    return m;
}

const keyMappedMenus = keyMappedMenu(menu);

export default function menuFromPath(options) {
    const {path, item = 'name'} = options;
    let cur = keyMappedMenus;
    return (path || "").split('/')
        .filter(item => item !== '')
        .map(key => {
            let value = null;
            if (key in cur) {
                value = cur[key][item];
                cur = cur[key].child;
            }
            return value || null;
        });
}