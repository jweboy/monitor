import React from 'react';
import socket from '../util/socket';

export const initialState = {
  socket,
  scripts: [],
};

export const AppContext = React.createContext({
  initialState,
});
