export const ENV_MODE_DEV = process.env.NODE_ENV === 'development';
export const ENV_MODE_PROD = process.env.NODE_ENV === 'production';

const REACT_APP_BASE_API_URL = 'https://motionapp.doflab.com';
const REACT_APP_BASE_API_LOCAL_URL = 'https://motionapp.doflab.com';
// const REACT_APP_BASE_API_LOCAL_URL = 'http://15.164.27.98:27521';

export const BASE_API_URL = !__DEV__
  ? `${REACT_APP_BASE_API_URL}/api/v1`
  : `${REACT_APP_BASE_API_LOCAL_URL}/api/v1`;
