import CommonSearchByValue from './commonSearchByValue'
import {searchByBoothName} from '../../../../services/common'

class SearchByBoothName extends CommonSearchByValue {
    constructor(props) {
        super(props, {
            api: searchByBoothName,
            parse: (value) => {return {searchName: value}}
        });
    }
}

export default SearchByBoothName
