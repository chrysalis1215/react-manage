import React, { PropTypes } from 'react';
import {Row, Col, Card, Modal, Upload, Icon, Button} from 'antd';
import {hostname} from '../../../utils/hostname';
function formate(arr) {
  return arr.map((item, index)=> {
      let newItem = {};
      if (item) {
        newItem.uid = '-'+ (index + 1);
        newItem.status = 'done';
        newItem.imageId = item.imageId;
        // TODO 修改hostname
        newItem.url = hostname + item.url;
        newItem.thumbnail = hostname + item.thumbnail;
      }
      return newItem;
    })
}

class Img extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
        fileList: [],
        previewVisible: false,
        previewImage: '',
        dispatchType: ''
      }
  }

  componentWillMount() {
    // 通过路由去判断组件的父亲级state
    let dispatchType = '';
    this.setState({
      dispatchType: 'productDetail/modify'
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbnail ,
      previewVisible: true,
    });
  }

  handleChange = ({ file, fileList }) => {
    fileList.map((item)=> {
      if (!item.imageId) {
        if (item.response && item.response.data && item.response.err === 0) {
          item.imageId = item.response.data.images[0].id;
        }
      }
    })
    this.setState({ fileList  })
  }

  handleSave = () => {
    let arr =  [];
    this.state.fileList.forEach(item=> {
      if (item.imageId) {
        arr.push(item.imageId)
      }
    })
    this.props.dispatch({
      type: this.state.dispatchType,
      payload: {
        data: {
          images: arr
        },
        type: 'qualityReportPicInfo'
      }
    })
  }
  // 父组件props有更新时将调用
  // 子组件state和props时调用
  componentWillReceiveProps(nextProps) {
    if ( nextProps.parentState && nextProps.parentState.qualityReportPicInfo && nextProps.parentState.qualityReportPicInfo.length) {
      this.setState({
        fileList: formate(nextProps.parentState.qualityReportPicInfo)
      })
    }
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    // TODO 图片的删除和保存功能
    return (
      <div className="clearfix">
        <Upload
          action="/common/v1/adminImage/upload"
          listType="picture-card"
          withCredentials={true}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img  key="previewImg" alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Button
          type="primary"
          onClick={this.handleSave}>
          保存
        </Button>
      </div>
    );
  }
}


export default Img;
