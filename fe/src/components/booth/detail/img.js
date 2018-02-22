import React, { PropTypes } from 'react';
import {Row, Col, Card, Modal, Upload, Icon} from 'antd';
import {hostname} from '../../../utils/hostname';
function formate(arr) {
  return arr.map((item, index)=> {
      let newItem = {};
      newItem.uid = '-'+ index;
      // TODO 修改hostname
      newItem.url = hostname + item.url;
      newItem.thumbnail = hostname + item.thumbnail;
      return newItem;
    })
}

class Img extends React.Component{
  constructor(props) {
      super(props)

      this.state = {
        fileList: formate(props.picInfo ||props.parentState.picInfo || []),
        previewVisible: false,
        previewImage: '',
      }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbnail ,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  componentWillMount() {
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/common/v1/adminImage/upload"
          listType="picture-card"
          withCredentials={true}
          defaultFileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
        <Row  type="flex" justify="space-around" >
        {
          fileList.map((item, index)=> {
              return <Col key={index} span={8}>
                          <img onClick={()=> this.handlePreview(item)} src={item.thumbnail} alt={item.imageName} />
                      </Col>
          }) 
        }
        </Row>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img  key="previewImg" alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


export default Img;
