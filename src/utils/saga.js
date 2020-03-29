import { put } from 'redux-saga/effects';
export function* saga(API, type) {
  try {
    const response = yield API;
    yield put({
      type: `${type}_SUCCESS`,
      payload: response
    });
  } catch (err) {
    yield put({
      type: `${type}_FAILURE`,
      payload: err
    });
  }
}
