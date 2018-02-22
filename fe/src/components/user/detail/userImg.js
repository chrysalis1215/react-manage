import React, { PropTypes } from 'react';
import {Button, Tag, Row, Col} from 'antd';
import Img from './Img'

class UserImg extends React.Component{
    constructor(props) { 
        super(props)
        this.state= {
          images: [],
          imagesList: [],
          headImage: [],
          headImageList: [],
          hasInit: false
        }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.parentState && nextProps.parentState.picInfo && nextProps.parentState.picInfo.headImage) {
        let {picInfo} = nextProps.parentState;
        let headImageList = [];
        if (!this.state.hasInit) {
          if (JSON.stringify(picInfo.headImage) !=='{}') {
            headImageList.push(picInfo.headImage)
          }
          this.setState({
            hasInit: true,
            images: picInfo.images,
            headImage: headImageList
           })
        }
      }
    }
    handleImageChange = (data) => {
      this.setState({
        imagesList: data
      });
    }

    handleHeadImgChange = (data) => {
      this.setState({
        headImageList: data
      })
    }

    handleSave = (e) => {
        // TODO 获取默认值修改
        let data = {};
        data.id = this.props.parentState.picInfo.id;
        data.images = this.state.imagesList;
        data.headImage = this.state.headImageList.length ? this.state.headImageList[0] : -1;
        this.props.dispatch({
            type: 'userDetail/modify',
            payload: {
                data: data,
                type: 'picInfo'
            }
        })
    }

    render() {
        const headImage = this.state.headImage;
        const images = this.state.images;
        return (
          <div>
            <Row>
                <Col span={3}>用户头像</Col>
                <Col span={18}>
                    <Img key="head" images={ headImage} length={1} handleImageChange={this.handleHeadImgChange} />
                </Col>
            </Row>
            <Row>
                <Col span={3}>用户图片</Col>
                <Col span={18}>
                    <Img ket="normal" images={ images } length={100} handleImageChange={this.handleImageChange} />
                </Col>
            </Row>

            <Button
                type="primary"
                onClick={this.handleSave}>
                保存
            </Button>
          </div>
        );
    }
}


export default UserImg;
