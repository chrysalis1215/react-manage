import CommonApiSelectComponent from './commonApiSelectComponent';
import {queryMemberGroup} from '../../../../services/common';

class MemberGroup extends CommonApiSelectComponent {
    constructor(props) {
        super(props, 
            queryMemberGroup, 
            (item) => {return item.name}, 
            (item) => {return item.name},
            null,
            (input) => {return input},
            (output) => {return output});
    }
}

export default MemberGroup;
