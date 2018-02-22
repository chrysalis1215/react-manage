import { routerRedux } from 'dva/router'
import { message } from 'antd'
import {login, userInfo, logout} from '../services/app'
import {parse} from 'qs'
import {getCookie, delCookie} from '../utils/helper'
import menuFromPath from '../utils/menuFromPath'
import config from '../utils/config'

export default {
    namespace: 'app',
    state: {
        login: false,
        loading: false,
        user: {
            name: '吴彦祖'
        },
        validated: false,
        validate: true,
        validateMsg: '',
        alertMsg: '',
        alertType: '',
        showAlert: false,
        redirectUrl: '',
        loginButtonLoading: false,
        menuPopoverVisible: false,
        siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
        darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
        isNavbar: document.body.clientWidth < 769,
        navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]') //侧边栏菜单打开的keys
    },
    subscriptions: {
        setup ({dispatch, history}) {
            history.listen((location) => {
                const titles = menuFromPath({path: location.pathname}).filter(item => item !== null);
                document.title = config.pageTitle(titles.join('/'));

                let token = getCookie('token')
                if (!token || token == '') {
                    dispatch({type: 'logoutSuccess'})
                    if (location.pathname !== '/') {
                        dispatch(routerRedux.push('/'))
                    }
                } else {    
                    dispatch({type: 'loginSuccess'})
                    if (location.pathname === '/') {
                        dispatch(routerRedux.push('/redirect'))
                    }
                }
            })
            window.onresize = function () {
                dispatch({type: 'changeNavbar'})
            }
        },
    },
    effects: {
        *login ({
            payload
        }, args) {
            let {call, put} = args
            yield put({type: 'showLoginButtonLoading'})

            const data = yield call(login, parse(payload))
            if (data.err === 0) {
                yield put(routerRedux.replace({
                    pathname: '/redirect'
                }))
                yield put({type: 'loginSuccess'})
            } else {
                yield put({
                    type: 'loginFail',
                    payload: {
                        msg: data.msg
                    }
                })
            }
        },
        *logout ({
            payload
        }, {call, put}) {
            const data = yield call(logout, parse(payload))
            if (data.err === 0) {
                document.cookie = 'token='
                yield put({
                    type: 'logoutSuccess'
                })
                yield put(routerRedux.replace({
                    pathname: '/'
                }))
            }
        },
        *switchSider ({
            payload
        }, {put}) {
            yield put({
                type: 'handleSwitchSider'
            })
        },
        *changeTheme ({
            payload
        }, {put}) {
            yield put({
                type: 'handleChangeTheme'
            })
        },
        *changeNavbar ({
            payload
        }, {put}) {
            if (document.body.clientWidth < 769) {
                yield put({type: 'showNavbar'})
            } else {
                yield put({type: 'hideNavbar'})
            }
        },
        *switchMenuPopver ({
            payload
        }, {put}) {
            yield put({
                type: 'handleSwitchMenuPopver'
            })
        }
    },
    reducers: {
        modifySuccess (state, action) {
            let {tip} = action.payload;
            message.success(tip || '保存成功', 3);
            return state;
        },
        modifyFail (state, action) {
            let {tip} = action.payload;
            message.error(tip || '保存失败', 3);
            return state;
        },
        showError (state, action) {
            let {msg} = action.payload;
            message.error(msg || '系统错误，请稍后再试', 3);
            return state;
        },
        loginSuccess (state, action) {
            const token = getCookie('token')
            const username = token.split(':')[0]
            return {
                ...state,
                user: {
                    name: username
                },
                login: true,
                loginButtonLoading: false
            }
        },
        logoutSuccess (state) {
            return {
                ...state,
                login: false
            }
        },
        loginFail (state, action) {
            return {
                ...state,
                login: false,
                loginButtonLoading: false,
                validated: true,
                validate: false,
                validateMsg: action.payload.msg
            }
        },
        showLoginButtonLoading (state) {
            return {
                ...state,
                loginButtonLoading: true
            }
        },
        showLoading (state) {
            return {
                ...state,
                loading: true
            }
        },
        hideLoading (state) {
            return {
                ...state,
                loading: false
            }
        },
        handleSwitchSider (state) {
            localStorage.setItem('antdAdminSiderFold', !state.siderFold)
            return {
                ...state,
                siderFold: !state.siderFold
            }
        },
        handleChangeTheme (state) {
            localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
            return {
                ...state,
                darkTheme: !state.darkTheme
            }
        },
        showNavbar (state) {
            return {
                ...state,
                isNavbar: true
            }
        },
        hideNavbar (state) {
            return {
                ...state,
                isNavbar: false
            }
        },
        handleSwitchMenuPopver (state) {
            return {
                ...state,
                menuPopoverVisible: !state.menuPopoverVisible
            }
        },
        handleNavOpenKeys(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        redirectUrl(state, action) {
            return {
                ...state,
                redirectUrl: action.payload
            }
        }
    }
}
