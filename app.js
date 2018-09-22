const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var bot = new Discord.Client({autoReconnect:true});

var streamOp = require("./actions/streamOp.js");
var cmd = require("./cmd-bot.js");

bot.on("ready", () => {
  console.log("Discord Bot Ready !");
  bot.user.setActivity('SteemJet');
  streamOp.start();
});

bot.setTimeout (function () {
  process.exit(1) // Restart
}, 1 * 1800000);

bot.on("message", async message =>
{
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.author.bot || message.content.indexOf(config.prefix) !== 0) {
    return;
  }

  switch(command) {
    case "upvote":
      return cmd.trailUpvote(message);

    case "adduser":
      return cmd.addUserToWhitelist(message);

    case "setupvotevalue":
      return cmd.setUpvoteValue(message);

    case "help":
      return cmd.help(message);   
  }
});

bot.on("disconnect", function() {
  console.log("Bot disconnected");
  bot.login(config.token);
  console.log("Discord Bot Ready !");
});

bot.login(config.token);
