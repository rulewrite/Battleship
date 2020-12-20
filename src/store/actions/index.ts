import { Action as ReduxAction } from 'redux';
import * as actionTypes from './actionTypes';

export interface Action extends ReduxAction {
  payload?: {
    [payloadName: string]: any;
  };
}

export const createFleet = (id: string): Action => ({
  type: actionTypes.CREATE_FLEET,
  payload: {
    id,
  },
});
