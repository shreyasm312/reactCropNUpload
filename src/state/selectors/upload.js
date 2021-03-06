import { createSelector } from 'reselect';
const selectUploadImageReducer = state => state.uploadImageReducer;

export const selectUploadImage = createSelector(
  [selectUploadImageReducer],
  uploadImageReducer =>
    uploadImageReducer ? uploadImageReducer.uploadImage : {}
);
export const selectSendCanvasContext = createSelector(
  [selectUploadImageReducer],
  uploadImageReducer => uploadImageReducer.sendCanvasContext
);
