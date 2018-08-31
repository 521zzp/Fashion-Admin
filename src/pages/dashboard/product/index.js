import { Card, Table, Tag, Icon, Button, Switch } from 'antd';

export default function () {

  const columns = [
    {
      title: '图片',
      dataIndex: 'img'
    },
    {
      title: '项目名称',
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
      dataIndex: 'on_sell'
    },
    {
      title: '操作',
      dataIndex: '_id'
    }
  ]

  return (
    <Card bordered={false}>
      <div style={{ marginBottom: '20px'}}><Button type="primary" icon="plus" >新增产品</Button></div>
      <Table columns={ columns } dataSource={ [] } pagination={false}></Table>
    </Card>
  )
}
