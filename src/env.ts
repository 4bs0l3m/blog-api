export const Env = {
  mongoDb: process.env.mongoDb || 'mongodb://127.0.0.1:27017/test',
  secretKey: process.env.secretKey || 'secretKey',
  aiApi: process.env.aiApi || 'http://127.0.0.1:5000/xtract',
};
