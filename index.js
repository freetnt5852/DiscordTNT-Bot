const DiscordTNT = require("discord-tnt");
const config = require("./config.json");
const client = new DiscordTNT.Client({
    TOKEN:config.token,
    GAME:"with DiscordTNT",
    STATUS: "online",
    DEBUG: true
});

client.devs = [
 "292690616285134850"
];

const prefix = "d.";

client.on("ready", () => {
  console.log(`Logged in as ${client.self.username}`);
});

client.on("messageCreate", message => {
  if(message.content.indexOf(prefix) !== 0) return; // ignore msgs that don't start with prefix.
  if(message.author.bot) return; // ignore bots
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.on("resume", () => {
	client.sendMessage("422062942268424202", "<@292690616285134850> Websocket resumed!");
});

client.on("disconnect", (c) => {
	console.log(`[WS] [Close] Code: ${c}`);
});

client.connect();