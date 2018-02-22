function deleteEmptyProperty(object){
    for (var i in object) {
        var value = object[i];
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                if (value.length == 0) {
                    delete object[i];
                    continue;
                }
            }
            deleteEmptyProperty(value);
            if (isEmpty(value)) {
                delete object[i];
            }
        } else {
            if (value === '' || value === null || value === undefined) {
                delete object[i];
            } 
        }
    }
}

function queryToSearch(queryObject) {
    let strs = [];
    for (var key in queryObject) {
        strs.push(key + '=' + queryObject[key])
    }

    return strs.length > 0 ? '?' + strs.join('&') : '?';
}

function isEmpty(object) {
    for (var name in object) {
        return false;
    }
    return true;
}

module.exports = {
    deleteEmptyProperty: deleteEmptyProperty,
    queryToSearch: queryToSearch,
}
