import styles from './stores.css';
import { Card, Table, Tag, Icon, Button, Switch } from 'antd';
import { connect } from 'dva';
import StoreEditModal from '@/components/stores/StoreEditModal'

function Index({
  stores, edit_store, operate_type, open
}) {

  // 门店数据
 // const { stores, edit_store, operate_type, open } = window.g_app._store.getState().stores;
  const { dispatch } = window.g_app._store

  const columns = [
    {
      title: '门店名称',
      dataIndex: 'name'
    },
    {
      title: '经营项目',
      dataIndex: 'group',
      render: (text, row, index) => {
        console.log('text',text)
        const temp = [].concat(text)
        temp.sort((a,b) => a.order - b.order)
        return temp.map( (el,index) => <Tag key={index} color="#87d068">{el.order}.{el.name}</Tag>)
      }
    },
    {
      title: '经营状态',
      dataIndex: 'status',
      render: (text, row, index) => <Switch
        checkedChildren="营业中" unCheckedChildren="停业中"
        checked = {text === 'on'}
        />
    },
    {
      title: '操作',
      dataIndex: '_id',
      render: (text, row) => <span className={ styles['edit-btn'] } onClick={ () => openEditModal(row) }><Icon type="edit"></Icon>编辑</span>
    },
  ]



  const openEditModal = (obj) => {
    dispatch({
      type: 'stores/openEditModal',
      payload: {
        edit_store: obj,
        operate_type: 'edit',
        open: true
      }
    })
  }

  const closeModal = () => {
    dispatch({
      type: 'stores/openEditModal',
      payload: {
        edit_store: {},
        operate_type: 'edit',
        open: false
      }
    })
  }

  return (
    <Card className={styles.normal} bordered={ false }>
      <div style={{ marginBottom: '20px'}}><Button type="primary" icon="plus" >新增门店</Button></div>
      <Table columns={ columns } dataSource={ stores } pagination={false}></Table>

      <StoreEditModal init={edit_store} visible={open} operate_type={operate_type} close={closeModal}/>
    </Card>
  );
}

function mapStateToProps(state) {
  const { stores, edit_store, operate_type, open } = state.stores;
  console.log('open', open)
  return {
    stores, edit_store, operate_type, open
  }
}

export default connect(mapStateToProps)(Index);
