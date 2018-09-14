import { Modal, Form, Input, InputNumber, Button, Tag } from 'antd';
import styles from './ProductModal.less'

const FormItem = Form.Item;

function ProductModal({
  init = {},
  visible = true,
  loading,
  operate_type,
  ok,
  close,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  }
}) {

  const title =  operate_type === 'add' ? '新增产品' : '编辑产品信息'

  const onOk = () => {
    validateFields((err, values) => {
      if (!err) {
        console.log('values', values)
        ok(values)
        //ok({ content: values, operate_type, type })
      }
    });
  }

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
        <FormItem label="产品名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator('name', {
            initialValue: init.name,
            rules: [
              { required: true, message: '产品名称不能为空!', whitespace: true },
            ],
          })(
            <Input placeholder="请输入产品名称" />
          )}
        </FormItem>
        <FormItem label="所属门店" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator('name', {
            initialValue: init.name,
            rules: [
              { required: true, message: '请选择所属门店!', whitespace: true },
            ],
          })(
            <Input placeholder="请输入产品名称" />
          )}
        </FormItem>

      </Form>
    </Modal>
  )
}

export default Form.create()(ProductModal)
