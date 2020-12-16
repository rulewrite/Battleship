import React from 'react';
import { Container } from '@material-ui/core';
import { Cell } from './components';

const App = () => {
  return (
    <Container component="main">
      <Cell />
      <Cell />
      <Cell />
    </Container>
  );
};

export default App;
