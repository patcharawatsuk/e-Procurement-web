import axios from '@axios';
import useAxiosAuth from '../api/auth';

export function signIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
          .post('/api/auth/signin', {email, password})
          .then((response) => {
            if (response.status === 200) {
              resolve(response.data); // Resolve the promise with the response data
            } else {
              reject(new Error(response.data)); // Reject the promise with an error
            }
          })
          .catch((error) => {
            reject(error.response.data.error); // Reject the promise with the caught error
          });
      });
}

export function signUp(values: any): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
          .post('/api/auth/signup', values)
          .then((response) => {
            if (response.status === 201) {
              resolve(response.data); // Resolve the promise with the response data
            } else {
              reject(new Error(response.data)); // Reject the promise with an error
            }
          })
          .catch((error) => {
            reject(error.response.data.error); // Reject the promise with the caught error
          });
      });
}

// export function authorizeResourceViaAccessToken(): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const axiosAuth = useAxiosAuth();
//     axiosAuth
//         .get('/api/resource')
//         .then((response) => {
//           if (response.status === 200) {
//             resolve(response.data); // Resolve the promise with the response data
//           } else {
//             reject(new Error(response.data)); // Reject the promise with an error
//           }
//         })
//         .catch((error) => {
//           reject(error.response.data.error); // Reject the promise with the caught error
//         });
//     });
// }