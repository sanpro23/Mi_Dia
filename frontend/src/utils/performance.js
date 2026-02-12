import { React } from 'react';

export const ReactMemo = React.memo;

export const createMemoizedComponent = (Component, areEqual = null) => {
  return React.memo(Component, areEqual);
};