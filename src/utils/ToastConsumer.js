import React from 'react';

import { AppContext } from '../components/App';

// this could be useful in renders, to avoid HOC

const ToastConsumer = ({ children }) => (
  <AppContext.Consumer>
    {context => children(context)}
  </AppContext.Consumer>
);

// Higher Order Component, vast majority of cases

export const withToast = (Comp) => (props) => (
  <ToastConsumer>
    {context => <Comp context={context} {...props} />}
  </ToastConsumer>
);