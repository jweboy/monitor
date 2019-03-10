import { init } from '@rematch/core';
import task from '../models/task';

const rootStore = init({
  models: {
    task,
  },
});

export default rootStore;
