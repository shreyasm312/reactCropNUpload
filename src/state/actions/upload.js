import { createActions } from 'redux-actions';
import { uploadImageActionTypes } from '../constants/index';

export const { uploadImage, sendCanvasContext } = createActions({
  [uploadImageActionTypes.UPLOAD_IMAGE]: data => ({ data }),
  [uploadImageActionTypes.SEND_CANVAS_CONTEXT]: data => ({ data })
});
