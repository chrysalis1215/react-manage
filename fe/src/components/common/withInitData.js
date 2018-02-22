import React from 'react';

class WithInitData extends React.Component {
    initDataSync(func) {
        this.setState({
            hasData: false
        });
        (async (obj) => {
            const data = await func();
            obj.setState({
                hasData: true,
                data: data
            });
        })(this);
    }

    hasData() {
        return this.state.hasData;
    }

    getData() {
        return this.hasData() ? this.state.data : null;
    }
}

export default WithInitData
