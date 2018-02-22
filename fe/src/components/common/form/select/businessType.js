import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryBusinessType} from '../../../../services/common';

class BusinessType extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryBusinessType, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name});
    }
}

export default BusinessType;
