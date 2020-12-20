import { Action as ReduxAction } from 'redux';
import * as actionTypes from './actionTypes';

export interface Action extends ReduxAction {
  payload?: {
    response?: any;
    [payloadName: string]: any;
  };
}

export const createFleet = (id: string, size?: number): Action => ({
  type: actionTypes.CREATE_FLEET,
  payload: {
    id,
    size,
  },
});
