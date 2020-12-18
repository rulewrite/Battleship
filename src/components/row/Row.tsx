import React from 'react';
import { Grid } from '@material-ui/core';
import { Sea, Cell } from '@Components';
import { Columns } from '@Reducers/board';

const mapTypeToInnerComponent = new Map<string, React.ComponentType>([
  ['cell', Cell],
  ['sea', Sea],
]);

const Row = ({
  columns,
  gridItemStyle,
}: {
  columns: Columns;
  gridItemStyle: React.CSSProperties;
}) => {
  return (
    <Grid container>
      {columns.map((column) => {
        const key = column.get('key');
        const type = column.get('type');

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
