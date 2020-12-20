import { List } from 'immutable';
import React, { ComponentType } from 'react';
import { PointFactory } from '@Reducers/fleet';
import { BoardProps, getLargestCellSize } from '@Components/board/Board';

const withCellsHeader = (WrappedComponent: ComponentType<BoardProps>) => (
  props: BoardProps
) => {
  const { rows, includedRowsHeader } = props;
  const cellsHeader = List(
    [...Array(getLargestCellSize(rows))].map((dumbValue, index) => {
      if (!includedRowsHeader) {
        return PointFactory({
          key: `${index + 1}`,
        });
      }

      if (index === 0) {
        return PointFactory({
          key: ' ',
        });
      }

      return PointFactory({
        key: `${index}`,
      });
    })
  );

  return <WrappedComponent {...props} cellsHeader={cellsHeader} />;
};

export default withCellsHeader;
