import { init } from '@rematch/core';
import task from '../models/task';
import common from '../models/common';

const rootStore = init({
  models: {
    task,
    common,
  },
});

export default rootStore;
