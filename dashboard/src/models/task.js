export default {
  state: {
    menu: [],
  },
  reducers: {
    getMenuList(state, payload) {
      // console.warn(state, payload);
      state.menu.push(payload);
      return { ...state };
    },
  },
  effects: {
    increateAsync(payload) {
      // const asyncFetch = () => new Promise((resolve) => setTimeout(resolve, 1000));
      // await asyncFetch();
      this.task.getMenuList(payload);
      //   this.getMenuList(payload);
    },
  },
};
