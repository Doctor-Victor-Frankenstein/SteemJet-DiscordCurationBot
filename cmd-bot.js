const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

var info = require("./info.json");
var steemAction = require("./actions/steem-module.js");
var db = require("./actions/db.js");

const bot = new Discord.Client();

bot.login(config.token);

var admin = config.admin
var weight = 200;
var active = true;

module.exports = {
  
  trailUpvote: function (message) {
    if(active == true){
      return steemAction.upvoteWithAllAccounts(message, weight);
    }
  },

  switchbot: function(message){
    if(message.author.id == admin){
      if(active == true){
        active = false;
        message.channel.send("The bot is now set to be offline!");
      }
      if(active == false){
        active = true;
        message.channel.send("The bot is now set to be online!");
      }
    }
    else{
      message.channel.send("You're not allowed to use this function.");
    }
  },

  addUserToWhitelist: function (message) {
    if(message.author.id == admin){
      var ope = message.content.split(" ");
      steem.api.getAccounts([ope[1]], function(err, result) {
        if(result.length){
          db.setSubscription(ope[1]);      
          message.channel.send("The user @" + ope[1] + " was added to the whitelist!");
        }
        else{
          message.channel.send("The user @" + ope[1] + " doesn't exist!");
        }
      });      
    }
    else{
      message.channel.send("You're not allowed to use this function.");
    }
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
