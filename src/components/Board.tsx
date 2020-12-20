import React, { ComponentType, CSSProperties } from 'react';
import { compose } from 'redux';
import { Panel, Row } from '@Components';
import { withRowsHeader, withCellsHeader } from '@Hoc';
import { Cells } from '@Components/Row';
import { List, Record, RecordOf } from 'immutable';

interface RowProps {
  key: null | string;
  cells: Cells;
}

export const RowFactory = Record<RowProps>({
  key: null,
  cells: List([]),
});

export type Rows = List<RecordOf<RowProps>>;

export interface BoardProps {
  includedRowsHeader?: boolean;
  cellsHeader?: Cells;
  rows: Rows;
}

const getGridItemStyle = (cellSize: number): CSSProperties => {
  if (!cellSize) {
    return {};
  }

  if (cellSize === Infinity) {
    return {};
  }

  const gridItemWidthPercentage = 100 / cellSize;
  return {
    maxWidth: `${gridItemWidthPercentage}%`,
    flexBasis: `${gridItemWidthPercentage}%`,
  };
};

export const getLargestCellSize = (rows: Rows): number => {
  return rows.reduce((largestCellSize, row) => {
    const size = row.get('cells')?.size;
    if (largestCellSize < size) {
      return size;
    }
    return largestCellSize;
  }, 0);
};

const Board = ({ rows, cellsHeader }: BoardProps) => {
  const largestCellSize = getLargestCellSize(rows);
  const gridItemStyle = getGridItemStyle(largestCellSize);

  return (
    <Panel>
      {cellsHeader && <Row cells={cellsHeader} gridItemStyle={gridItemStyle} />}

      {rows.map((row) => {
        const key = row.get('key');
        const cells = row.get('cells');

        return <Row key={key} cells={cells} gridItemStyle={gridItemStyle} />;
      })}
    </Panel>
  );
};

export default compose<ComponentType<BoardProps>>(
  withRowsHeader,
  withCellsHeader
)(Board);
