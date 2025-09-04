module.exports = {
  apps: [
    {
      name: 'match-konkatsu',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=match-konkatsu-db --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false, // Disable PM2 file monitoring (wrangler handles hot reload)
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}