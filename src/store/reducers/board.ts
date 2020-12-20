import { fromJS, List, Record } from 'immutable';
import type { RecordOf } from 'immutable';

const A_CODE = 65;
const NUBMER_OF_BOARD_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_BOARD_SIZE)];

type PointProps = {
  key: null | string;
  isClicked: boolean;
  type: 'SEA' | 'CELL';
};

export const PointFactory = Record<PointProps>({
  key: null,
  isClicked: false,
  type: 'CELL',
});

export type Point = RecordOf<PointProps>;

export type Points = List<Point>;

const points: Points = List(
  dumbArray.map((dumbValue, index) => {
    return PointFactory({
      key: String(index + 1),
      type: 'SEA',
    });
  })
);

type PointsRecordProps = {
  key: null | string;
  points: Points;
};

export const PointsRecordFactory = Record<PointsRecordProps>({
  key: null,
  points: List([]),
});

export type PointsRecord = RecordOf<PointsRecordProps>;

export type PointsRecords = List<PointsRecord>;

const pointsRecords: PointsRecords = List(
  dumbArray.map((dumbValue, index) => {
    return PointsRecordFactory({
      key: String.fromCharCode(A_CODE + index),
      points,
    });
  })
);

// TODO: 희소 행렬에 맞는 자료 구조로 변경
const initialState = { pointsRecords };

const board = (state = fromJS(initialState), action: { type: string }) => {
  return state;
};

export default board;
