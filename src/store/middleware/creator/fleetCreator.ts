import { List, Record } from 'immutable';
import type { RecordOf } from 'immutable';

const A_CODE = 65;
const NUBMER_OF_FLEET_SIZE = 10;
const dumbArray = [...Array(NUBMER_OF_FLEET_SIZE)];

interface PointProps {
  key: null | string;
  type: 'SEA' | 'CELL';
}

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

const fleetCreator = () => {
  return pointsRecords;
};

export default fleetCreator;
