import { Card, Table, Tag, Icon, Button, Switch } from 'antd';
import { connect } from 'dva';
import { arrAddKey } from '@/utils/tool'
import ProductModal from '@/components/product/ProductModal'

function Index ({
  dispatch,
  list_loading,
  product_list,
  edit_info,
  operate_type,
  open,
  img_url,
  store_options
}) {

  // 新增产品打开弹窗
  const openAddModal = () => {
    dispatch({
      type: 'product/update',
      payload: {
        operate_type: 'add',
        img_url: '',
        edit_info: {},
        open: true
      }
    })
  }

  // 关闭窗口
  const closeProductModal = () => {
    dispatch({
      type: 'product/update',
      payload: {
        open: false
      }
    })
  }

  // 编辑产品更新信息
  const editProdctModal = (row, index) => {
    const obj = {
      name: row.name,
      store: [ row.store, row.group.name ],
      description: row.description,
      product_order: row.product_order,
      original_price: row.original_price,
      now_price: row.now_price,
      _id: row._id
    }
    const img_url = row.img
    dispatch({
      type: 'product/update',
      payload: {
        operate_type: 'update',
        edit_info: obj,
        img_url,
        open: true,
      }
    })
  }

  // 切换产品状态
  const switchProductStatus = (id, status) => {

  }

  // 保存产品信息
  const saveProductInfo = (obj) => {
    dispatch({
      type: 'product/saveProductInfo',
      payload: obj
    })
  }

  const columns = [
    {
      title: '图片',
      dataIndex: 'img'
    },
    {
      title: '产品名称',
      dataIndex: 'name'
    },
    {
      title: '门店',
      dataIndex: 'store'
    },
    {
      title: '类型',
      dataIndex: 'group'
    },
    {
      title: '组内排序',
      dataIndex: 'product_order'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '原价',
      dataIndex: 'original_price'
    },
    {
      title: '现价',
      dataIndex: 'now_price'
    },
    {
      title: '状态',
      dataIndex: 'on_sell',
      render: (text, row) => <Switch
        checkedChildren="上架中" unCheckedChildren="已下架"
        onChange={ (checked) => switchProductStatus(row._id, checked) }
        checked = {text === 'on'}
      />
    },
    {
      title: '操作',
      dataIndex: '_id',
      render: (text, row, index) =>
        <span style={{ color: '#40a9ff', cursor: 'pointer' }} onClick={ () => editProdctModal(row, index)}>
          <Icon type="edit"></Icon>编辑</span>
    }
  ]

  const updateImage = (img_url) => {
    console.log(img_url)
    dispatch({
      type: 'product/update',
      payload: {
        img_url
      }
    })
  }

  return (
    <Card bordered={false}>
      <div style={{ marginBottom: '20px'}}><Button type="primary" icon="plus" onClick={openAddModal}>新增产品</Button></div>
      <Table columns={ columns } dataSource={ arrAddKey(product_list) } pagination={false} loading={ list_loading }></Table>
      <ProductModal close={ closeProductModal } store_options={store_options}
        ok={saveProductInfo} init={edit_info}
        img_url={ img_url } visible={open} updateImage={updateImage}/>
    </Card>
  )
}


function mapStateToProps(state) {
  const { list_loading, product_list, edit_info, operate_type, img_url, open, store_options } = state.product;
  return {
    list_loading,
    product_list,
    edit_info,
    operate_type,
    img_url,
    open,
    store_options,
  }
}

export default connect(mapStateToProps)(Index);
