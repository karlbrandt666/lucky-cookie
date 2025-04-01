module.exports = {
  name: 'lucky-cookie',
  version: '1.0.0',
  scripts: {
    start: 'node server.js',
    install: 'npm run install:all',
    build: 'npm run build:client',
    postinstall: 'npm run build:client'
  },
  env: {
    NODE_ENV: 'production',
    PORT: '3000',
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY
  },
  build: {
    command: 'npm run build',
    output: 'client/build'
  }
}; 