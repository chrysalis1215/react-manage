import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryBusinessArea} from '../../../../services/common';

class BusinessArea extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryBusinessArea, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name});
    }
}

export default BusinessArea;
