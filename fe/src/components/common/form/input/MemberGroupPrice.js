import React, { PropTypes } from 'react';
import MemberGroup from '../select/memberGroup';
import {Row, Col, Card, Modal, Icon, Input, Button} from 'antd';

class MemberGroupPrice extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: {}
        }
    }

    getKeys() {
        let obj = this.state.value;
        let keys = [];
        for (let item in obj) {
            if (obj.hasOwnProperty(item)) {
                keys.push(item);
            }
        }

        return keys;
    }

    componentWillReceiveProps(next) {
        if (next && 'value' in next) {
            this.setState({
                value: next.value
            });
        }
    }

    handleChange = (e) =>{
        let key = e.target.getAttribute('data-id');
        const value = this.state.value;

        value[key] = e.target.value;

        this.setState({
            value: value
        });
        this.props.onChange(this.state.value);
    }

    onSelectGroup(value, option) {
        const v = this.p.state.value;
        v[value] = '';

        this.p.setState({
            value: v
        });
        return value;
    }

    onDeselectGroup(value, option) {
        const v = this.p.state.value;
        delete v[value];

        this.p.setState({
            value: v
        });
    }

    render() {
        const inputGroup = [];
        for (let item in this.state.value) {
            if (this.state.value.hasOwnProperty(item)) {
                            //addonBefore={item} 
                inputGroup.push(
                    <div style={{marginBottom: 10}}>
                        <Input 
                            type="hidden"
                            key={item} 
                            value={this.state.value[item]} 
                            data-id={item} 
                            onChange={this.handleChange} />
                    </div>
                );
            }
        }

        /*
                    <MemberGroup 
                        p={this} 
                        placeholder="请选择" 
                        multiple={true} 
                        value={this.getKeys()} 
                        onSelect={this.onSelectGroup}
                        onDeselect={this.onDeselectGroup} />
        */
        return (
            <div>
                <div style={{marginBottom: 10}}>

                </div>

                {inputGroup}
            </div>
        );
    }
}


export default MemberGroupPrice;
