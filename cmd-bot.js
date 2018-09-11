const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var info = require("./info.json");
var steemAction = require("./actions/steem-module.js");

const bot = new Discord.Client();

bot.login(config.token);

var admin = config.admin
var weight = 200;

module.exports = {
  
  trailUpvote: function (message) {
    return steemAction.upvoteWithAllAccounts(message, weight);
  },

  setUpvoteValue: function (message) { 
    if(message.author.id == admin){
      var ope = message.content.split(" ");
      if(ope[1] > 0 && ope[1] <= 100){
        weight = ope[1] * 100
        message.channel.send("The upvote value was set to " + ope[1] + "%")
      }
      else{
        message.channel.send("Error : The weight must be between 1 to 100. Type **$help** to see the command help.");
      }
    }
    else{
      message.channel.send("You're not allowed to use this function.");
    }
  },    

  help: function (message) {
    let embed = new Discord.RichEmbed();
    var description = "-----------------------------------------\n\n";


    for (var command in info.infoCmdBot) {
      if (info.infoCmdBot.hasOwnProperty(command)) {
        description += info.infoCmdBot[command] + "\n\n";
      }
    }

    // Descriptions command help
    embed.setTitle("List of the command from the bot")
      .setDescription(description)
      .setColor("#7DDF64")
      .setTimestamp();

    return message.channel.send({embed});
  },
};
