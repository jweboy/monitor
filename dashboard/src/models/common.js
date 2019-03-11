export default {
  state: {
    leftbar: [],
  },
  reducers: {
    leftbar(state, payload) {
      const currIndex = state.leftbar.findIndex((item) => {
        return item.type === payload.type;
      });
      if (currIndex < 0) {
        state.leftbar = [...state.leftbar, ...[payload]];
      }
      return state;
    },
  },
};
