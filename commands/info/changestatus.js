const {random_status } = require('../../config.json');
module.exports = {
  name: 'changestatus',
  category: "Info",
  execute(msg, args, cmd, client) {
    client.user.setActivity(random_status[Math.floor(Math.random() * (random_status.length - 1))]);
  }
}