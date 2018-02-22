import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryDistributionCenter} from '../../../../services/common';

class DistributionCenter extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryDistributionCenter, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name == '' ? '其他' : item.name});
    }
}

export default DistributionCenter;
