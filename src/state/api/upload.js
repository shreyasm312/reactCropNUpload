import axios from 'axios';
const clientId = '4c624a5e9a12fad';

export const uploadImageAPI = async ({ data }) => {
  try {
    let response = await axios({
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: { authorization: 'Client-ID ' + clientId },
      data: data
    });
    return response.data;
  } catch (error) {
    throw new error(error);
  }
};
