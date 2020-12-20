import React from 'react';
import { Grid } from '@material-ui/core';
import { Cell } from '@Components';
import { List, Record, RecordOf } from 'immutable';

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

        return (
          <Cell key={key} type={type} gridItemStyle={gridItemStyle}>
            {key}
          </Cell>
        );
      })}
    </Grid>
  );
};

export default Row;
