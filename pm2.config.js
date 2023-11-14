module.exports = {
  apps: [
    {
      name: "Mayway",
      script: "index.js",   // Entry point of your application
      instances: "max",   // Run as many instances as the number of CPU cores
      exec_mode: "cluster", // Run in cluster mode for better performance
      watch: true,        // Enable watching for file changes
      ignore_watch: ["node_modules", "logs"], // Ignore specific directories
      env: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
    // You can define more app configurations here if needed
  ],
};
