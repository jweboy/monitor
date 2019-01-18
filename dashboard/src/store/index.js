import React from 'react';
import Socket from '../util/socket';

export const initialState = {
  socket: new Socket(),
};

export const AppContext = React.createContext({
  initialState,
});
