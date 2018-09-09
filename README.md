# SteemJet Community Curation Discord Bot

## How to install ?

1. First, you will need Node.js. Download it here : https://nodejs.org/dist/v8.11.4/node-v8.11.4-x64.msi

2. Then you will need mongoDB. Download it here : https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.2-signed.msi/download

  Install both with default settings.

3. Create the following folder `C:\data\db`

4. Now, press on your keyboard Windows + R, it will open the run prompt, type `cmd`, and press enter. It will open the windows console.

5. Enter `cd C:\PATH\TO\THE\BOT\FOLDER` . The path of the bot folder should be on your C: drive.

6. Now, enter `npm install`. This will create a node_modules folder inside the bot folder. Check if it's done.

7. Now enter `npm install pm2 -g`

Congratulations ! You succesfully installed the bot and all its dependencies !  

First, activate the Developer Mode in your Discord app. 

Now, you need to configure the bot with your discord channel and so on. Go to this link : https://discordapp.com/developers/applications/me

Then, click on "create an application", and give a name to it. Then on the right side, click on the "bot" tab, and click "Add Bot". confirm, and this will create a bot user. Give him a username, SteemJet for example, and click on "Reveal Token". You need to copy this token and paste it in the config.json file, in the token section.

Then, return to your browser, on the discord bot page, and click on "General Information". Copy the "Client ID", and paste it in this link like so :

` https://discordapp.com/oauth2/authorize?client_id=<YOUR_CLIENT_ID>&scope=bot` 

` https://discordapp.com/oauth2/authorize?client_id=488416758835941526&scope=bot`

Go to this link, and it will invite your bot on your discord channel.

Now, right click on your profile picture inside the Steemjet discord channel, and select "copy user id". Paste it in the config.json in the "admin" section.

Don't forget to add the posting keys in the config.json

Now, you can start the bot.




## How to start the bot ?

1. Press on your keyboard Windows + R, it will open the run prompt, type `cmd`, and press enter. It will open the windows console.

2. Enter `cd C:\Program Files\MongoDB\Server\3.2\bin`

3. Now, enter `mongod`. If everything is correct, the console should show you something like `waiting for connections at port 27017`. Which means MongoDB is running. Don't close this window.

4. Now open a new console, as done in step 1. 

5. Enter `cd C:\PATH\TO\THE\BOT\FOLDER` 

5. Now, enter `pm2 start app.js`

6. You can check that the bot is working by typing  `$help` in your discord channel.
