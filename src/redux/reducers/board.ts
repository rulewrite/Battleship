import { fromJS, Map } from 'immutable';

const A_CODE = 65;
const NUBMER_OF_BOARD_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_BOARD_SIZE)];

interface Cell {
  isClicked: boolean;
}

type Column = Map<string, Cell>;

export type Row = Map<string, Column>;

const column = dumbArray.reduce<Column>((column, value, index) => {
  return column.set(String(index + 1), {
    isClicked: false,
  });
}, Map());

const row: Row = dumbArray.reduce<Row>((row, value, index) => {
  return row.set(String.fromCharCode(A_CODE + index), column);
}, Map());

// TODO: 희소 행렬에 맞는 자료 구조로 변경
const initialState = row;

const board = (state = fromJS(initialState), action: { type: string }) => {
  return state;
};

export default board;
