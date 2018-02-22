import React, { PropTypes } from 'react';
import {Row, Col, Card} from 'antd';
import {hostname} from '../../../utils/hostname'

class Img extends React.Component{
  constructor(props) {
      super(props)
  }

  render() {
    const imgs = this.props.parentState.picInfo || [];
    return (
      <div>
        {
          imgs.map((item, index)=> {
              return <Card style={{margin: 10}}  key={index} >
                  <Row>
                      <Col span={8}>
                          <img height={180} width={180} src={hostname + item.url} alt={item.imageName} />
                      </Col>
                      <Col span={16}>
                          <h2>{item.imageName}</h2>
                          <p>图片测试地址：{item.url}</p>
                          <p>优先级: {item.priority}</p>
                      </Col>
                  </Row>
              </Card>
          }) 
        }
      </div>
    );
  }
}

export default Img;
