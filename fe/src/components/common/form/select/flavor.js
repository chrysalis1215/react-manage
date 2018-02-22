import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryFlavor} from '../../../../services/common';

class Flavor extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryFlavor, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name});
    }
}

export default Flavor;
