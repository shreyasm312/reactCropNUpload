import { createActions } from 'redux-actions';
import { uploadImageActionTypes } from '../constants/index';

export const { uploadImage } = createActions({
  [uploadImageActionTypes.UPLOAD_IMAGE]: data => ({ data })
});
