import CommonSearchByValue from './commonSearchByValue'
import {searchByCategoryName} from '../../../../services/common'

class SearchByCategoryName extends CommonSearchByValue {
    constructor(props) {
        super(props, {
            api: searchByCategoryName,
            parse: (categorySearchName) => {
                return {
                    boothName: this.state.boothName,
                    searchName: categorySearchName
                }
            }
        });
    }

    componentWillReceiveProps(next) {
        if (next && 'boothName' in next) {
            this.setState({
                boothName: next.boothName
            });
        }
    }
}

export default SearchByCategoryName
