import React from 'react';
import { AppContext } from '../../store';

export default function Consumer(ChildComponent) {
  const ConsumerComponent = () => {
    return <AppContext.Consumer>{(props) => <ChildComponent {...props} />}</AppContext.Consumer>;
  };

  ConsumerComponent.displayName = 'ConsumerComponent';

  return ConsumerComponent;
}
