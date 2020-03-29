import { handleActions, parseError } from '../../helpers';
import { uploadImageActionTypes, STATUS } from '../constants';

export const uploadImageState = {
  uploadImage: {
    status: STATUS.IDLE,
    loading: false,
    data: {}
  }
};

export default {
  uploadImageReducer: handleActions(
    {
      [uploadImageActionTypes.UPLOAD_IMAGE]: (draft, { payload }) => {
        draft.uploadImage.data = payload ? payload.data : {};
        draft.uploadImage.status = STATUS.RUNNING;
        draft.uploadImage.loading = true;
      },
      [uploadImageActionTypes.UPLOAD_IMAGE_SUCCESS]: (draft, { payload }) => {
        draft.uploadImage.data = payload ? payload.data : {};
        draft.uploadImage.status = STATUS.SUCCESS;
        draft.uploadImage.loading = false;
      },
      [uploadImageActionTypes.UPLOAD_IMAGE_FAILURE]: (draft, { payload }) => {
        draft.uploadImage.status = STATUS.ERROR;
        draft.uploadImage.loading = false;
        draft.uploadImage.data = parseError(payload);
      }
    },
    uploadImageState
  )
};
