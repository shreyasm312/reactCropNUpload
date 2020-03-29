import { http } from '../helpers';
/////POSTAPI
export const PostAPI = async ({ data }, url) => {
  try {
    let response = await http.post(url, { data });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new error(error);
  }
};
