import axios from 'axios';

const post = (url, payload, header) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, { params: header })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log('🚀 ~ file: apis.ts ~ line 16 ~ returnnewPromise ~ err', err);

        reject(err);
      });
  });
};

export { post };
