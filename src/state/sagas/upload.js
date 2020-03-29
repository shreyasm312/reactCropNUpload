import { takeLatest } from 'redux-saga/effects';
import { uploadImageActionTypes } from '../constants';
import { saga } from '../../utils/saga';
import { uploadImageAPI } from '../api/upload';

const uploadImage = ({ payload }) =>
  saga(uploadImageAPI, uploadImageActionTypes.UPLOAD_IMAGE, payload);

export default function* root() {
  yield takeLatest(uploadImageActionTypes.UPLOAD_IMAGE, uploadImage);
}
