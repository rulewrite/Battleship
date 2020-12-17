import { fromJS, List, Map } from 'immutable';

const A_CODE = 65;
const NUBMER_OF_BOARD_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_BOARD_SIZE)];

interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K): T[K];
}

interface Cell {
  isClicked: boolean;
}

export type Columns = List<
  ImmutableMap<{
    key: string;
    cell: Cell;
  }>
>;

export type Rows = List<
  ImmutableMap<{
    key: string;
    columns: Columns;
  }>
>;

const columns = dumbArray.reduce<Columns>((columns, dumbValue, index) => {
  return columns.push(
    Map({
      key: String(index + 1),
      cell: {
        isClicked: false,
      },
    })
  );
}, List());

const rows = dumbArray.reduce<Rows>((rows, dumbValue, index) => {
  return rows.push(
    Map({
      key: String.fromCharCode(A_CODE + index),
      columns,
    })
  );
}, List());

// TODO: 희소 행렬에 맞는 자료 구조로 변경
const initialState = rows;

const board = (state = fromJS(initialState), action: { type: string }) => {
  return state;
};

export default board;
