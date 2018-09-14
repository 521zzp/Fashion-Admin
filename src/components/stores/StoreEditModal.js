import { Modal, Form, Input, InputNumber, Button, Tag } from 'antd';
import styles from './StoreEditModal.less'
import index from "../../pages/dashboard/stores";

const FormItem = Form.Item;

function StoreEditModal({
  init = {},
  visible,
  operate_type,
  ok,
  addProductGroup,
  deleteProductGroup,
  close,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  }
}) {

  console.log('visible', visible)

  const onOk = () => {
    validateFields(['name'],(err, values) => {
      if (!err) {
        console.log('values', values)
        ok(values)
        //ok({ content: values, operate_type, type })
      }
    });
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const add = () => {
    validateFields(['product_name', 'order' ], function (err, values) {
      if (!err){
        console.log('add values', values)
        addProductGroup({
          name: values.product_name,
          order: values.order
        })
      }
    })
  }

  const title =  operate_type === 'add' ? '新增门店' : '编辑门店信息'

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
        <FormItem label="门店名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {getFieldDecorator('name', {
            initialValue: init.name,
            rules: [
              { required: true, message: '编号不能为空!', whitespace: true },
            ],
          })(
            <Input placeholder="请输入门店名称" />
          )}
        </FormItem>
        <div className={styles['product-group']}>
          <span className={ styles.title }>下属产品：</span>
          <div className={styles.group}>
            { Array.isArray(init.group) && init.group.map(
              (el,index) => <Tag key={index} closable onClose={ () => deleteProductGroup(el.name) }>{ el.order } | { el.name }</Tag>) }
          </div>
        </div>
        <div>
          <div className={ styles['product-wrap'] }>
            <FormItem label="产品" { ...formItemLayout }>
              {getFieldDecorator('product_name', {
                rules: [
                  { required: true, message: '请选择关联类型!' },
                ],
              })(
                <Input placeholder="产品名称 " />
              )}
            </FormItem>
          </div>
          <div className={ styles['product-wrap'] }>
            <FormItem label="排序" { ...formItemLayout }>
              {getFieldDecorator('order', {
                rules: [
                  { required: true, message: '请输入组内排序!' },
                ],
              })(
                <InputNumber min={1} max={1000} step={1} placeholder="组内排序 " />
              )}
            </FormItem>
          </div>
          <Button style={{width: '100%'}} type="dashed" icon="plus" onClick={ add }>添加至产品</Button>
        </div>

      </Form>
    </Modal>
  )


}


export default Form.create()(StoreEditModal)
