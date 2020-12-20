import React, { ComponentType } from 'react';
import { PointFactory, Point } from '@Reducers/fleet';
import { BoardProps } from '@Components/board/Board';

const withRowsHeader = (WrappedComponent: ComponentType<BoardProps>) => ({
  rows,
  cellsHeader,
  ...otherProps
}: BoardProps) => {
  const otherPropsWithIncludeRowsHeader = {
    ...otherProps,
    includedRowsHeader: true,
  };

  const rowKeys = rows.map((row) => row.get('key'));
  const rowsHeader = rowKeys.map((rowKey) =>
    PointFactory({
      key: rowKey,
    })
  );
  const rowWithRowsHeader = rows.map((row, rowIndex) => {
    const rowHeader = rowsHeader.get(rowIndex);

    const points = row.get('points');
    return row.set('points', points.unshift(rowHeader as Point));
  });

  if (!cellsHeader) {
    return (
      <WrappedComponent
        {...otherPropsWithIncludeRowsHeader}
        rows={rowWithRowsHeader}
      />
    );
  }

  const cellsHeaderWithRowHeader = cellsHeader.unshift(
    PointFactory({
      key: ' ',
    })
  );
  return (
    <WrappedComponent
      {...otherPropsWithIncludeRowsHeader}
      rows={rowWithRowsHeader}
      cellsHeader={cellsHeaderWithRowHeader}
    />
  );
};

export default withRowsHeader;
