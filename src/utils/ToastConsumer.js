import React from 'react';

import { AppContext } from '../App';

const ToastConsumer = ({ children }) => (
  <AppContext.Consumer>
    {context => children(context)}
  </AppContext.Consumer>
);

// Higher Order Component

export const withToast = (Comp) => (props) => (
  <ToastConsumer>
    {context => <Comp context={context} {...props} />}
  </ToastConsumer>
);