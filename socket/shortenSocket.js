var shortenRouter = require("../routes/shorten");

module.exports = async (socket) => {
  socket.on("data", async (data) => {
    try {
      var link = data.toString();
      link = link
        .replace("\r\n", "")
        .replace("\n", "")
        .replace('"', "")
        .replace('"', "")
        .replace(/\0/g, "")
        .trim();
      var res = await shortenRouter.getShortURL(link);
      console.log(res);
      socket.write(JSON.stringify(res) + "\n");
      socket.destroy();
    } catch (err) {
      socket.write(err.toString());
      socket.destroy();
    }
  });
};
