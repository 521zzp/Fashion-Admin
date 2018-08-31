

export default {
  state: {
    count: 0
  },
  reducers: {
    update (state, { payload: obj }) {
      return { ...state, ...obj }
    },
    countAdd (state) {
      return { ...state, count: state.count + 1 }
    },
    countDown (state) {
      return { ...state, count: state.count - 1 }
    }
  }

}
