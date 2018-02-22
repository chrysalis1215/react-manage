import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryBusinessScope} from '../../../../services/common';

class MultipleBusinessScope extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryBusinessScope, 
            (item) => {return item.id.toString()}, 
            (item) => {return item.name},
            null,
            (input) => {
                return input.map((item) => {
                    return item.toString()
                });
            },
            (output) => {
                return output.map((item) => {
                    return parseInt(item)
                });
            });
    }
}

export default MultipleBusinessScope;
