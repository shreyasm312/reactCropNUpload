import { takeEvery, put } from 'redux-saga/effects';
import { uploadImageActionTypes } from '../constants';
import { uploadImageAPI } from '../api/upload';

export function* uploadImage({ payload }) {
  try {
    const response = yield uploadImageAPI(payload);
    yield put({
      type: uploadImageActionTypes.UPLOAD_IMAGE_SUCCESS,
      payload: response
    });
  } catch (err) {
    yield put({
      type: uploadImageActionTypes.UPLOAD_IMAGE_FAILURE,
      payload: err
    });
  }
}

export default function* root() {
  yield takeEvery(uploadImageActionTypes.UPLOAD_IMAGE, uploadImage);
}
