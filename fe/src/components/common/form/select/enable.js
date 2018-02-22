import React from 'react';
import CommonApiSelectComponent from './commonApiSelectComponent';

class Enable extends CommonApiSelectComponent {
    constructor(props) {
        const p = Promise.resolve({
            data: [{
                id: 1,
                name: '是'
            }, {
                id: 0,
                name: '否'
            }]
        });

        super(props, 
            () => {return p},
            (item) => {return item.id.toString()},
            (item) => {return item.name});
    }
}

export default Enable;
