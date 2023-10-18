/// <reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //types of envs
      NODE_ENV: "development" | "production" | "test";
      REACT_APP_PUBLIC_URL: string;
    }
  }
}
export {};
