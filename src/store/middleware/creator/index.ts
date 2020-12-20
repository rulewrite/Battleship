import { Action } from '@Actions';
import * as actionTypes from '@ActionTypes';
import { State } from '@Reducers';
import { Middleware } from 'redux';
import fleetCreator from './fleetCreator';

const creator: Middleware<{}, State> = (store) => (next) => (
  action: Action
) => {
  const { type } = action;

  switch (type) {
    case actionTypes.CREATE_FLEET: {
      const { payload, ...otherAction } = action;
      next({
        ...otherAction,
        payload: {
          ...payload,
          response: fleetCreator(payload?.size),
        },
      });
      return;
    }
  }
  next(action);
};

export default creator;
