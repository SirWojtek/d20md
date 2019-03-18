
if (!process.env.CONTAINER_IP) {
  throw Error('Need to provide CONTAINER_IP as an env variable');
}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "node-backend",
      script    : "server.js",
      env: {
        COMMON_VARIABLE: "true",
        NODE_ENV: "production"
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "admin",
      host : process.env.CONTAINER_IP,
      ref  : "origin/release",
      repo : "https://github.com/sirwojtek/d20md",
      path : "/home/admin/d20md",
      "post-deploy" : "yarn && NODE_ENV=production yarn deploy_backend && pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
