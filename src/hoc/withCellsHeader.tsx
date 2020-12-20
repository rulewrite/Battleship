import { List } from 'immutable';
import React, { ComponentType } from 'react';
import { BoardProps, getLargestCellSize } from '@Components/Board';
import { CellFactory } from '@Components/Row';

const withCellsHeader = (WrappedComponent: ComponentType<BoardProps>) => (
  props: BoardProps
) => {
  const { rows, includedRowsHeader } = props;
  const cellsHeader = List(
    [...Array(getLargestCellSize(rows))].map((dumbValue, index) => {
      if (!includedRowsHeader) {
        return CellFactory({
          key: `${index + 1}`,
        });
      }

      if (index === 0) {
        return CellFactory({
          key: ' ',
        });
      }

      return CellFactory({
        key: `${index}`,
      });
    })
  );

  return <WrappedComponent {...props} cellsHeader={cellsHeader} />;
};

export default withCellsHeader;
