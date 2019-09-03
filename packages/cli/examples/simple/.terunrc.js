module.exports = {
  commands: [
    {
      name: "example",
      args: ["test-arg"],
      transports: [
        {
          from: "from.terun",
          to: "to.html"
        }
      ]
    }
  ]
};
