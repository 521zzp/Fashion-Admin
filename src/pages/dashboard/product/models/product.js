import { PRODUCT_MANAGE_LIST, PRO_STORE_OPTIONS } from '@/config/url'
import { postModel, analy, onanaly } from '@/utils/net';

export default {
  state: {
    list_loading: false,
    product_list: [],
    edit_info: {},
    operate_type: 'add',
    open: false,
    store_options: [], //
  },
  reducers: {
    update (state, { payload: obj }) {
      return { ...state, ...obj }
    }
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
      list && (yield put({ type: 'update', payload: list }))
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
