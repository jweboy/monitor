export default {
  state: {
    menu: [],
  },
  reducers: {
    getMenuList(state, payload) {
      return state + payload;
    },
  },
  // effects: (dispatch) => ({
  //   async increateAsync(payload) {
  //     const asyncFetch = () => new Promise((resolve) => setTimeout(resolve, 1000));
  //     await asyncFetch();
  //     dispatch.task.getMenuList(payload);
  //     //   this.getMenuList(payload);
  //   },
  // }),
};
