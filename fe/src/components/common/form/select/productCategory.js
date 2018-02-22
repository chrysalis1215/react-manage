import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryProductCategory} from '../../../../services/common';

class ProductCategory extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryProductCategory, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name});
    }
}

export default ProductCategory;
