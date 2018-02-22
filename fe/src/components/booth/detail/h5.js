import React, { PropTypes } from 'react';
import {Button, Input} from 'antd'

class H5 extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            h5Info: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.parentState && nextProps.parentState.h5Info) {
          this.setState({
            h5Info: nextProps.parentState.h5Info
          })
        }
    }

    handleSave =() => {
        let data = this.state.h5Info;
        this.props.dispatch({
          type: 'boothDetail/modify',
          payload: {
            data: data,
            type: 'h5Info'
          }
        })
    }
    onChange =(e) => {
        this.setState({
            h5Info: {
                ...this.state.h5Info,
                h5Content: e.target.value
            }
        })
    }
    render() {
        return (
            <div>
                <Input 
                    type="textarea" 
                    rows={4}
                    onChange={this.onChange}
                    value = {this.state.h5Info.h5Content}
                    defaultValue={this.state.h5Info.h5Content}/>
                <Button
                  type="primary"
                  onClick={this.handleSave}>
                  保存
                </Button>
            </div>
        );
    }
}


export default H5;
