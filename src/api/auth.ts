import axios from '@axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSignInOpen } from '@store/formOpenSlice';
import { setAuthState } from '@store/authSlice';
import { useRouter } from 'next/router';

const useAxiosAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const access_token = localStorage.getItem('access_token');
  axios.interceptors.request.use((config) => {
    if (!config.headers['Authorization']) {
      if (access_token !== null) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
      }
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      let originalRequest = error.config;
      try {
        debugger
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            debugger
            const refresh_token = localStorage.getItem('refresh_token');
            if (
              refresh_token === null ||
              typeof refresh_token === 'undefined' ||
              refresh_token === 'undefined'
            ) {
              dispatch(setAuthState(false));
              router.push('/');
              return;
            }
            // Call your refresh token API to get a new access token

            const response = await axios.get('/api/auth/refresh-token', {
              headers: {
                Authorization: `Bearer ${refresh_token}`,
              },
            });
            const new_access_token = response.data.data.access_token;
            const new_refresh_token = response.data.data.refresh_token;
            // Update the access token in local storage
            localStorage.setItem('access_token', new_access_token);
            localStorage.setItem('refresh_token', new_refresh_token);

            // Update the Authorization header with the new access token
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${new_access_token}`;

            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            debugger
            // Handle the error that occurred while refreshing the token
            // For example, you can log the error or redirect to the login page
            console.error('Error refreshing token:', refreshError);
            // You may want to clear the tokens from local storage or take appropriate action
            // localStorage.removeItem('access_token');
            // localStorage.removeItem('refresh_token');
            dispatch(setSignInOpen(true));
            router.push('/');
          }
        } else if (error.response.status === 409) {
          debugger
          throw new Error('Conflict');
        }
        return Promise.reject(error);
      } catch (error) {
        debugger;
        dispatch(setSignInOpen(true));
        dispatch(setAuthState(false));
        localStorage.setItem('access_token', 'undefined');
        localStorage.setItem('refresh_token', 'undefined');
        router.push('/');
      }
    },
  );

  return axios;
};

export default useAxiosAuth;
