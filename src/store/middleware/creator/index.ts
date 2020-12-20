import { Action } from '@Actions';
import * as actionTypes from '@ActionTypes';
import { Middleware } from 'redux';
import fleetCreator from './fleetCreator';

const creator: Middleware<{}, any> = (store) => (next) => (action: Action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.CREATE_FLEET: {
      const { payload, ...otherAction } = action;
      next({
        ...otherAction,
        payload: {
          ...payload,
          response: fleetCreator(),
        },
      });
      return;
    }
  }
  next(action);
};

export default creator;
