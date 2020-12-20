import React from 'react';
import { Grid } from '@material-ui/core';
import { Sea, Cell } from '@Components';
import { Points } from '@Reducers/board';

const mapTypeToInnerComponent = new Map<string, React.ComponentType>([
  ['CELL', Cell],
  ['SEA', Sea],
]);

const Row = ({
  cells,
  gridItemStyle,
}: {
  cells: Points;
  gridItemStyle: React.CSSProperties;
}) => {
  return (
    <Grid container>
      {cells.map((cell) => {
        const key = cell.get('key');
        const type = cell.get('type');

        const InnerComponent = mapTypeToInnerComponent.get(type);

        if (!InnerComponent) {
          return null;
        }

        return (
          <Grid item key={key} style={gridItemStyle}>
            <InnerComponent>{key}</InnerComponent>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Row;
