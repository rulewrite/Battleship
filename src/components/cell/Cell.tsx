import React from 'react';
import Sea from '../sea/Sea';

const Cell = () => {
  return (
    <Sea
      onClick={() => {
        console.log(123);
      }}
    >
      A
    </Sea>
  );
};

export default Cell;
