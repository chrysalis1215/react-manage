import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryBusinessScope} from '../../../../services/common';

class BusinessScope extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryBusinessScope, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name});
    }
}

export default BusinessScope;
