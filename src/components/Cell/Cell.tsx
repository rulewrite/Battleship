import { Grid } from '@material-ui/core';
import CellBase from './CellBase';
import Sea from './Sea';
import React from 'react';

const mapTypeToInnerComponent = new Map<string, React.ComponentType>([
  ['CELL', CellBase],
  ['SEA', Sea],
]);

interface CellProps {
  key: null | string;
  type: 'SEA' | 'CELL';
  gridItemStyle: React.CSSProperties;
}

const Cell: React.ComponentType<CellProps> = ({
  type,
  gridItemStyle,
  children,
}) => {
  const InnerComponent = mapTypeToInnerComponent.get(type);

  if (!InnerComponent) {
    return null;
  }

  return (
    <Grid item style={gridItemStyle}>
      <InnerComponent>{children}</InnerComponent>
    </Grid>
  );
};

export default Cell;
