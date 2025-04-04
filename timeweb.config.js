module.exports = {
  name: 'lucky-cookie',
  version: '1.0.0',
  scripts: {
    start: 'node server.js',
    build: 'cd client && npm install && npm run build'
  },
  env: {
    NODE_ENV: 'production',
    PORT: '3000',
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY
  }
}; 