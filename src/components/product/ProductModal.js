import { Modal, Form, Input, InputNumber, Row ,Col, message, Cascader  } from 'antd';
import styles from './ProductModal.less'
import ImageUpload from './ImageUpload';

const FormItem = Form.Item;

function ProductModal({
  init = {},
  updateImage,
  visible = true,
  loading,
  operate_type,
  store_options=[],
  ok,
  close,
  img_url,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  }
}) {

  const title =  operate_type === 'add' ? '新增产品' : '编辑产品信息'

  const onOk = () => {
    if (img_url) {
      validateFields((err, values) => {
        if (!err) {
          console.log('values', values)
          ok(values)
        }
      });
    } else {
      message.error('请先上传图片！')
    }

  }

  const options = store_options.map(el => {
    const children = el.group.map(item => {
      return { value: item.name, label: item.name }
    })
    return {
      value: el.name,
      label: el.name,
      children
    }
  })

  return (
    <Modal
      title={ title }
      maskClosable = { false }
      visible={ visible }
      onOk={ onOk }
      onCancel={ close }
      afterClose = { () => resetFields() }
      okText="保存"
      cancelText="取消"
      confirmLoading={ false }
    >
      <Form>
        <ImageUpload imageUrl={img_url} updateImage={updateImage}/>
        <FormItem label="产品名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator('name', {
            initialValue: init.name,
            rules: [
              { required: true, message: '产品名称不能为空!' },
            ],
          })(
            <Input placeholder="请输入产品名称" />
          )}
        </FormItem>
        <FormItem label="所属门店" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator('store', {
            initialValue: init.store,
            rules: [
              { required: true, message: '请选择门店产品类别!' },
            ],
          })(
            <Cascader options={options}  placeholder="门店&产品类别" />
          )}
        </FormItem>
        <FormItem label="产品描述" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator('description', {
            initialValue: init.description,
            rules: [
              { required: true, message: '组内排序不能为空!' },
            ],
          })(
            <Input placeholder="产品描述" />
          )}
        </FormItem>
        <Row>
          <Col span={8}>
            <FormItem label="排序" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('product_order', {
                initialValue: init.product_order,
                rules: [
                  { required: true, message: '组内排序不能为空!' },
                ],
              })(
                <InputNumber placeholder="组内排序" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="原价" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('original_price', {
                initialValue: init.original_price,
                rules: [
                  { required: true, message: '原价不能为空!' },
                ],
              })(
                <InputNumber placeholder="原价" />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="现价" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              {getFieldDecorator('now_price', {
                initialValue: init.now_price,
                rules: [
                  { required: true, message: '现价不能为空!' },
                ],
              })(
                <InputNumber placeholder="现价" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Form.create()(ProductModal)
