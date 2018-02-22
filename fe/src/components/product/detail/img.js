/**
 * 商品零检和证检查的图片控件
 * 参考common下的Img控件
 * 
 */
import React, { PropTypes } from 'react';
import {Row, Col, Card, Modal, Upload, Icon, Button} from 'antd';
import {hostname} from '../../../utils/hostname';
function formate(arr) {
  return arr.map((item, index)=> {
      let newItem = {};
      newItem.uid = '-'+ (index + 1);
      newItem.status = 'done';
      newItem.imageId = item.id;
      // TODO 修改hostname
      newItem.url = hostname + item.url;
      newItem.thumbnail = hostname + item.thumbnail;
      return newItem;
    })
}

function formateSavedValue(arr) {
  let result = [];
  arr.forEach(item=> {
      if (item.imageId) {
        result.push(item.imageId)
      }
  })
  return result;
}

class Img extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
        fileList: [],
        previewVisible: false,
        previewImage: '',
        dispatchType: 'productDetail/modify',
        type: '',
        hasInit: false
      }
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
          item.url = hostname + item.response.data.images[0].url;
        }
      }
    })
    this.setState({ fileList  })
    
    this.props.handleImageChange(formateSavedValue(this.state.fileList));

  }

  handleImageChange = () => {
    
  }
  // 父组件props有更新时将调用
  // 子组件state和props时调用
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps && nextProps && nextProps.images.length) {
      if (!this.state.hasInit) {
          this.setState({
            fileList: formate(nextProps.images),
            hasInit: true
          })
        this.props.handleImageChange(formateSavedValue(this.state.fileList));
      }
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
      </div>
    );
  }
}



export default Img;