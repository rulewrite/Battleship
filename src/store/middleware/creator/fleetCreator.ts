import { List, Record, Range } from 'immutable';
import type { RecordOf } from 'immutable';

const A_CODE = 65;

interface PointProps {
  key: null | string;
  type: 'SEA' | 'CELL';
}

const PointFactory = Record<PointProps>({
  key: null,
  type: 'CELL',
});

type Points = List<RecordOf<PointProps>>;

interface PointsRecordProps {
  key: null | string;
  points: Points;
}

const PointsRecordFactory = Record<PointsRecordProps>({
  key: null,
  points: List([]),
});

export type Fleet = List<RecordOf<PointsRecordProps>>;

const fleetCreator = (size: number = 10): Fleet => {
  const range = Range(1, size);
  const points: Points = range
    .map((id) => {
      return PointFactory({
        key: String(id),
        type: 'SEA',
      });
    })
    .toList();

  return range
    .map((id) => {
      return PointsRecordFactory({
        key: String.fromCharCode(A_CODE + id),
        points,
      });
    })
    .toList();
};

export default fleetCreator;
