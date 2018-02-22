import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryDeliveryLine} from '../../../../services/common';

class DeliveryLine extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryDeliveryLine, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name ?  item.name + item.detail : '其他'});
    }
}

export default DeliveryLine;
