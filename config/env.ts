const env = {
  development: {
    BASE_URL: "https://localhost:5000",
  },
};

export const env_var = env[process.env.NODE_ENV];
