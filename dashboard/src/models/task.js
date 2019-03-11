export default {
  state: {
    scripts: [],
  },
  reducers: {
    scriptList(state, payload) {
      state.scripts = [...state.scripts, ...payload];
      return state;
    },
  },
  effects: {
    increateAsync(payload) {
      this.task.scriptList(payload);
    },
  },
};
