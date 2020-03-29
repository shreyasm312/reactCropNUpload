import axios from 'axios';

const clientId = '4c624a5e9a12fad';
/////POSTAPI
export const PostAPI = async (data, url) => {
  try {
    let response = await axios({
      method: 'post',
      url: 'https://api.imgur.com/3/' + url,
      headers: { authorization: 'Client-ID ' + clientId },
      data: data
    });
    return response.data;
  } catch (error) {
    throw new error(error);
  }
};
