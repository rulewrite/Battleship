import { fromJS, List, Record } from 'immutable';
import type { RecordOf } from 'immutable';
import { CellProps } from '@Components/row/Row';

const A_CODE = 65;
const NUBMER_OF_FLEET_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_FLEET_SIZE)];

interface PointProps extends CellProps {}

export const PointFactory = Record<PointProps>({
  key: null,
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

const fleet = (state = fromJS(initialState), action: { type: string }) => {
  return state;
};

export default fleet;
