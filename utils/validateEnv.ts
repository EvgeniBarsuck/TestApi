import {
    cleanEnv, num, port, str,
  } from 'envalid';
   
  export function validateEnv() {
    cleanEnv(process.env, {
      POSTGRE_PASSWORD: str(),
      POSTGRE_PATH: str(),
      POSTGRE_USER: str(),
      PORT: num(),
    });
  }