module.exports = {
  apps: [
    {
      name: "server",
      script: "npm",
      args: "start:server",
    },
    {
      name: "frontend",
      script: "npm",
      args: "start:frontend",
    },
  ],
};
