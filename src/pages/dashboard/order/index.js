import { Card, Table, Tag, Icon, Button, Switch } from 'antd';


export default function () {

  const columns = [
    {
      title: '订单编号',
      dataIndex: '_id'
    },
    {
      title: '消费类型',
      dataIndex: 'title'
    },
    {
      title: '相关产品',
      dataIndex: 'product'
    },
    {
      title: '支付方式',
      dataIndex: 'pay_way'
    },
    {
      title: '原价',
      dataIndex: 'price'
    },
    {
      title: '折扣',
      dataIndex: 'discount'
    },
    {
      title: '实际支付',
      dataIndex: 'cost'
    }
  ]

  return (
    <Card bordered={false}>
      <Table columns={ columns } dataSource={ [] } ></Table>
    </Card>
  )
}
