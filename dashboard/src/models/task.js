export default {
  state: {
    scripts: [],
    isKilled: true,
  },
  reducers: {
    scriptList(state, payload) {
      state.scripts = [...state.scripts, ...payload];
      return state;
    },
    currentProcessStatus(state, payload) {
      state.isKilled = payload;
      return state;
    },
  },
  effects: {
    increateAsync(payload) {
      this.task.scriptList(payload);
    },
  },
};
