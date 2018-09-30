import {Upload, Icon, message, Form} from 'antd';
import { Component  } from 'react';
import { PRO_IMAGE_UPLOAD } from '@/config/url'
import styles from './ImageUpload.less'


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('只能上传jpg，png格式图片！');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过2M!');
  }
  return isJPG && isLt2M;
}

class ImageUpload extends  Component{
  state = {
    loading: false,
    imageUrl: this.props.imageUrl
  };


  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.result.img_url
      this.props.updateImage(imageUrl)
      this.setState({
        //imageUrl,
        loading: false,
      })
     /* getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));*/
    }
  }

  render () {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <div style={{textAlign: 'center'}}>
        <Upload
          name="image"
          listType="picture-card"
          className={ styles['avatar-uploader'] }
          showUploadList={false}
          action={ PRO_IMAGE_UPLOAD }
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {this.props.imageUrl ? <img src={ '/assets/pujin/pro-image/' + this.props.imageUrl} className={styles['product-image']} /> : uploadButton}
        </Upload>
      </div>

    )
  }

}

export default ImageUpload;
