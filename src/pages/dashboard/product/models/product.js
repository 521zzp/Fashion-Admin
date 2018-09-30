import { PRODUCT_MANAGE_LIST, PRO_STORE_OPTIONS, PRO_INFO_SAVE } from '@/config/url'
import { postModel, analy, onanaly } from '@/utils/net';

export default {
  state: {
    list_loading: false,
    product_list: [],
    edit_info: {},
    img_url: '',
    operate_type: 'add',
    open: false,
    store_options: [], //
  },
  reducers: {
    update (state, { payload: obj }) {
      console.log('update', obj)
      return { ...state, ...obj }
    },
  },
  effects: {
    *getProductList ({ payload: obj }, { put, select }) {
      yield put({ type: 'update', payload: { list_loading: true } })
      try {
        const product_list = yield fetch(PRODUCT_MANAGE_LIST, postModel()).then(analy)
        product_list && (yield put({ type: 'update', payload: { product_list } }))
      } finally {
        yield put({ type: 'update', payload: { list_loading: false } })
      }
    },
    *getProductStoreOptions ({ payload: obj }, { put, select }) {
      const list = yield fetch(PRO_STORE_OPTIONS, postModel()).then(onanaly)
      list && (yield put({ type: 'update', payload: { store_options: list } }))
    },
    *saveProductInfo ({ payload: obj }, { put, select }) {
      console.log('aaaaaaaaaaaaaaaaaaaaa', obj)
      const { description, name, product_order, original_price, now_price, store } = obj
      const { operate_type, store_options, img_url, edit_info } = yield select(state => state.product)
      console.log(operate_type, store_options)
      const store_id = store_options.filter(el => el.name === store[0])[0]._id
      const group = store_options.filter(el => el.name === store[0])[0].group.filter(item => item.name === store[1])[0]

      const params = {
        name,
        product_order,
        store_id,
        store: store[0],
        original_price,
        now_price,
        description,
        img: img_url,
        group
      }
      const _id = edit_info._id
      console.log('params______________', params)
      const result = yield fetch(PRO_INFO_SAVE, postModel({ operate_type, _id, params })).then(onanaly)
      console.log('result', result)
      if (result) {
        yield put({
          type: 'update',
          payload: {
            img_url: '',
            edit_info: {},
            open: false
          }
        })
        yield put({ type: 'getProductList' })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard/product') {
          dispatch({
            type: 'getProductList',
          });
          dispatch({
            type: 'getProductStoreOptions',
          });
        }
      });
    }
  },
}
