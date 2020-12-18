import { fromJS, List, Record } from 'immutable';
import type { RecordOf } from 'immutable';

const A_CODE = 65;
const NUBMER_OF_BOARD_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_BOARD_SIZE)];

interface Column {
  key: null | string;
  isClicked: boolean;
}

export const ColumnRecord = Record<Column>({
  key: null,
  isClicked: false,
});

export type Columns = List<RecordOf<Column>>;

const columns: Columns = List(
  dumbArray.map((dumbValue, index) => {
    return ColumnRecord({
      key: String(index + 1),
    });
  })
);

interface Row {
  key: null | string;
  columns: Columns;
}

const RowRecord = Record<Row>({
  key: null,
  columns: List([]),
});

export type Rows = List<RecordOf<Row>>;

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
