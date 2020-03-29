import { PostAPI } from '../../utils/crud';

export const uploadImageAPI = ({ data }) => {
  PostAPI(data, '/image');
};
