import { Map, List, Record } from 'immutable';
import type { RecordOf } from 'immutable';
import { CellProps } from '@Components/Row';

const A_CODE = 65;
const NUBMER_OF_FLEET_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_FLEET_SIZE)];

interface PointProps extends CellProps {}

const PointFactory = Record<PointProps>({
  key: null,
  type: 'CELL',
});

type Point = RecordOf<PointProps>;

type Points = List<Point>;

const points: Points = List(
  dumbArray.map((dumbValue, index) => {
    return PointFactory({
      key: String(index + 1),
      type: 'SEA',
    });
  })
);

interface PointsRecordProps {
  key: null | string;
  points: Points;
}

const PointsRecordFactory = Record<PointsRecordProps>({
  key: null,
  points: List([]),
});

type PointsRecord = RecordOf<PointsRecordProps>;

export type Fleet = List<PointsRecord>;

const pointsRecords: Fleet = List(
  dumbArray.map((dumbValue, index) => {
    return PointsRecordFactory({
      key: String.fromCharCode(A_CODE + index),
      points,
    });
  })
);

// TODO: 희소 행렬에 맞는 자료 구조로 변경
const initialState: Map<string, Fleet> = Map({
  player: pointsRecords,
  computer: pointsRecords,
});

const fleet = (state = initialState, action: { type: string }) => {
  return state;
};

export default fleet;
