import { keyMirror } from '../../helpers';

export const uploadImageActionTypes = keyMirror({
  UPLOAD_IMAGE: undefined,
  UPLOAD_IMAGE_SUCCESS: undefined,
  UPLOAD_IMAGE_FAILURE: undefined,
  SEND_CANVAS_CONTEXT: undefined
});
export const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error'
};
