import React, { ComponentType } from 'react';
import { BoardProps } from '@Components/Board';
import { RecordOf } from 'immutable';
import { CellFactory, CellProps } from '@Components/Row';

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
    CellFactory({
      key: rowKey,
    })
  );
  const rowWithRowsHeader = rows.map((row, rowIndex) => {
    const rowHeader = rowsHeader.get(rowIndex);

    const cells = row.get('cells');
    return row.set('cells', cells.unshift(rowHeader as RecordOf<CellProps>));
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
    CellFactory({
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
