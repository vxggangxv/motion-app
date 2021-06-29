import { errorsVar, apiCallingVar, tokenVar, logUserIn } from 'store/apollo';

function setInterceptors(instance) {
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = tokenVar();
      return config;
    },
    error => Promise.reject(error.response),
  );
  instance.interceptors.response.use(
    config => {
      if (config.headers.Authorization) logUserIn(response.headers['x-access-token']);
      return config;
    },
    error => Promise.reject(error.response),
  );
  return instance;
}

export { setInterceptors };
