import { fromJS, List, Record } from 'immutable';
import type { RecordOf } from 'immutable';

const A_CODE = 65;
const NUBMER_OF_BOARD_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_BOARD_SIZE)];

type ColumnProps = {
  key: null | string;
  isClicked: boolean;
  type: 'sea' | 'cell';
};

export const ColumnRecord = Record<ColumnProps>({
  key: null,
  isClicked: false,
  type: 'cell',
});

export type Column = RecordOf<ColumnProps>;

export type Columns = List<Column>;

const columns: Columns = List(
  dumbArray.map((dumbValue, index) => {
    return ColumnRecord({
      key: String(index + 1),
      type: 'sea',
    });
  })
);

type RowProps = {
  key: null | string;
  columns: Columns;
};

export const RowRecord = Record<RowProps>({
  key: null,
  columns: List([]),
});

export type Row = RecordOf<RowProps>;

export type Rows = List<Row>;

const rows: Rows = List(
  dumbArray.map((dumbValue, index) => {
    return RowRecord({
      key: String.fromCharCode(A_CODE + index),
      columns,
    });
  })
);

// TODO: 희소 행렬에 맞는 자료 구조로 변경
const initialState = { rows };

const board = (state = fromJS(initialState), action: { type: string }) => {
  return state;
};

export default board;
