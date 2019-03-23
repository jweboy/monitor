export default {
  state: {
    leftbar: [],
  },
  reducers: {
    leftbar(state, payload) {
      // console.warn(state, payload);
      // const currIndex = state.leftbar.findIndex((item) => {
      //   return item.type === payload.type;
      // });
      // if (currIndex < 0) {
      //   const leftbar = [...leftbar, ...[payload]];
      // }
      const leftbar = [payload];
      return Object.assign({}, state, { leftbar });
    },
  },
};
