import { arrAddKey } from '@/utils/tool'

export default {
  state: {
    stores: [
      {
        name: '嘉定白银路店',
        group: [
          {
            "name": "洗发",
            "order": 1
          },
          {
            "name": "理发",
            "order": 4
          },
          {
            "name": "造型",
            "order": 3
          },
          {
            "name": "美白",
            "order": 2
          }
        ],
        status: 'on',
        addr: '嘉定区白银路200号',
        key: 0
      },
    ],
    edit_store: {},
    operate_type: 'add', // add || update
    open: false,
  },
  reducers: {
    openEditModal (state, { payload: obj }) {
      console.log('look')
      console.log(obj)
      return { ...state, ...obj  }
    }

  }
}
