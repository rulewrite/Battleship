import React from 'react';
import { Grid } from '@material-ui/core';
import { Sea, Cell } from '@Components';
import { List, Record, RecordOf } from 'immutable';

const mapTypeToInnerComponent = new Map<string, React.ComponentType>([
  ['CELL', Cell],
  ['SEA', Sea],
]);

export interface CellProps {
  key: null | string;
  type: 'SEA' | 'CELL';
}

export const CellFactory = Record<CellProps>({
  key: null,
  type: 'CELL',
});

export type Cells = List<RecordOf<CellProps>>;

const Row = ({
  cells,
  gridItemStyle,
}: {
  cells: Cells;
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
