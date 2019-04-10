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
      return {
        ...state,
        isKilled: payload,
      };
    },
  },
  effects: {
    increateAsync(payload) {
      this.task.scriptList(payload);
    },
  },
};
