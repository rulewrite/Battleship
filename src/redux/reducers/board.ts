import { fromJS, Map } from 'immutable';

const A_CODE = 65;
const NUBMER_OF_BOARD_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_BOARD_SIZE)];

interface Cell {
  isClicked: boolean;
}

export type Columns = Map<string, Cell>;

export type Rows = Map<string, Columns>;

const columns = dumbArray.reduce<Columns>((columns, value, index) => {
  return columns.set(String(index + 1), {
    isClicked: false,
  });
}, Map());

const rows: Rows = dumbArray.reduce<Rows>((rows, value, index) => {
  return rows.set(String.fromCharCode(A_CODE + index), columns);
}, Map());

// TODO: 희소 행렬에 맞는 자료 구조로 변경
const initialState = rows;

const board = (state = fromJS(initialState), action: { type: string }) => {
  return state;
};

export default board;
