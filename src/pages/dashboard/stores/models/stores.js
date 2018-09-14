import { STORE_MANAGE_LIST, STORE_MANAGE, STORE_STATUS_CHANGE } from '@/config/url'
import { getModel, postModel, onanaly } from '@/utils/net';
import { message } from 'antd';

export default {
  state: {
    stores_loading: false, // 请求列表loading状态
    stores: [],
    edit_store: {},
    operate_type: 'add', // add || update
    open: false,
    edit_loading: false,
  },
  reducers: {
    addProductGroup (state, { payload: obj }) {
      console.log('reducers', obj)
      const exist = Array.isArray(state.edit_store.group) ?
          state.edit_store.group.filter( el => el.name == obj.name || el.order === obj.order) : []
      if (exist.length > 0) {
        message.error('产品名称或排序重复！')
        return { ...state }
      } else {
        return { ...state, edit_store: {
            ...state.edit_store,
            group: state.edit_store.group ? [ ...state.edit_store.group, obj ] : [ obj ] } }
      }
    },
    deleteProductGroup (state, { payload: { name } }) {
      const temp_arr = [].concat(state.edit_store.group)
      const index = temp_arr.findIndex(el => el.name == name)
      temp_arr.splice(index, 1)
      return { ...state, edit_store: { ...state.edit_store, group: temp_arr } }
    },
    openEditModal (state, { payload: obj }) {
      return { ...state, ...obj  }
    },
    update (state, { payload: obj }) {
      console.log('update', obj)
      return { ...state, ...obj }
    },
    storeStatusChangeReducer (state, { payload: obj }) {
      const temp_arr = [].concat(state.stores)
      const index = temp_arr.findIndex(el => el._id === obj._id)
      temp_arr.splice(index, 1, { ...temp_arr[index], ...obj })
      return { ...state, stores: temp_arr }
    }
  },
  effects: {
    *getStoreList ({ payload: obj }, { put, select }) {
      yield put({ type: 'update', payload: { stores_loading: true } })
      try {
        const stores = yield fetch(STORE_MANAGE_LIST, postModel()).then(onanaly)
        stores && (yield put({ type: 'update', payload: { stores } }))
      } finally {
        yield put({ type: 'update', payload: { stores_loading: true } })
      }
    },
    *saveStoreChange ({ payload: { name } }, { put, select }) {
      yield put({ type: 'update', payload: { edit_loading: true } })
      const { edit_store, operate_type } = yield select(state => state.stores)
      try {
        const params = {  name, group: edit_store.group, _id: edit_store._id,  operate_type }
        const result = yield fetch(STORE_MANAGE, postModel(params)).then(onanaly)
        if (result) {
          yield put({ type: 'update', payload: { open: false } })
          yield put({ type: 'getStoreList' })
        }
      } finally {
        yield put({ type: 'update', payload: { edit_loading: false } })
      }
    },
    *storeStatusChange ({ payload: obj }, { put, select }) {
      console.log('llllllllllllllllll')
      const result = yield fetch(STORE_STATUS_CHANGE, postModel(obj)).then(onanaly)
      result && (yield put({ type: 'storeStatusChangeReducer', payload: obj }))
    }
  },




  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard/stores') {
          dispatch({
            type: 'getStoreList',
          });
        }
      });
    }
  },

}
