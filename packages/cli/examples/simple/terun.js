module.exports = {
  commands: {
    example: {
      args: ["test-arg"],
      transports: [
        {
          from: "from.terun",
          to: "to.html"
        }
      ]
    }
  }
};
