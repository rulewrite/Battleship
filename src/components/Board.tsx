import React, { ComponentType, CSSProperties } from 'react';
import { compose } from 'redux';
import { Panel, Row } from '@Components';
import { withRowsHeader, withCellsHeader } from '@Hoc';
import { Cells } from '@Components/Row';
import { List, Record, RecordOf } from 'immutable';
import { Fleet } from '@Creator/fleetCreator';
import { connect, ConnectedProps } from 'react-redux';
import { createFleet } from '@Actions';
import { State } from '@Reducers';

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
  id: string;
}

const getCellStyle = (cellSize: number): CSSProperties => {
  if (!cellSize) {
    return {};
  }

  if (cellSize === Infinity) {
    return {};
  }

  const cellWidthPercentage = 100 / cellSize;
  return {
    maxWidth: `${cellWidthPercentage}%`,
    flexBasis: `${cellWidthPercentage}%`,
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

const connector = connect(
  (state: State) => {
    const playerFleet: Fleet = state.getIn(['fleet', 'player']);

    if (!playerFleet) {
      return {
        rows: List([]),
      };
    }

    return {
      rows: playerFleet.map((pointsRecord) => {
        return RowFactory({
          key: pointsRecord.get('key'),
          cells: pointsRecord.get('points'),
        });
      }),
    };
  },
  {
    createFleet,
  }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type ComposedProps = BoardProps &
  PropsFromRedux & {
    includedRowsHeader?: boolean;
    cellsHeader?: Cells;
  };

const Board = ({ id, rows, cellsHeader, createFleet }: ComposedProps) => {
  React.useEffect(() => {
    createFleet(id);
  }, [createFleet, id]);

  if (!rows) {
    return null;
  }

  const largestCellSize = getLargestCellSize(rows);
  const cellStyle = getCellStyle(largestCellSize);

  return (
    <Panel>
      {cellsHeader && <Row cells={cellsHeader} cellStyle={cellStyle} />}

      {rows.map((row) => {
        const key = row.get('key');
        const cells = row.get('cells');

        return <Row key={key} cells={cells} cellStyle={cellStyle} />;
      })}
    </Panel>
  );
};

export default compose<ComponentType<BoardProps>>(
  connector,
  withRowsHeader,
  withCellsHeader
)(Board);
