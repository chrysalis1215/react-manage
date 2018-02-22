const Ajax = require('robe-ajax')
import {message} from 'antd';
import { getCookie, delCookie} from './helper';
import { getAuthHeader } from './auth';
const authHeader = getAuthHeader();

export default function request(url, options) {
    if (options.cross) {
        return Ajax.getJSON('http://query.yahooapis.com/v1/public/yql', {
            q: "select * from json where url='" + url + '?' + Ajax.param(options.data) + "'",
            format: 'json'
        })
    } else {
        return Ajax.ajax({
            url: url,
            method: options.method || 'get',
            data: JSON.stringify(options.data || {}),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "token": "3a90beddb879790a606bcb1141e325d9",
                "Access-Control-Allow-Credentials": "true"
            },
            withCredentials: true,
            processData: options.method === 'get',
            dataType: 'JSON'
        }).done((data, status, xhr) => {
            if (data.err === -2) {
                document.cookie='token='
                window.location.href=window.location.origin + '/#/'
            } else if (data.err === -1) {
                message.error(data.msg, 3);
            }
            return data
        })
    }
}
