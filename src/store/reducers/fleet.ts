import { Map } from 'immutable';
import { Action } from '@Actions';
import { CREATE_FLEET } from '@ActionTypes';
import { Fleet } from '@Creator/fleetCreator';

// TODO: 희소 행렬에 맞는 자료 구조로 변경
const initialState: Map<string, Fleet> = Map({});

const fleet = (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case CREATE_FLEET:
      if (!payload) {
        return state;
      }
      return state.set(payload.id, payload.response);
  }
  return state;
};

export default fleet;
