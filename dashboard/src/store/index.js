import React from 'react';

export const initialState = {
  socket: null,
};

export const AppContext = React.createContext({
  initialState,
});
