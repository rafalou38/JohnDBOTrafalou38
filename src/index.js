
import dotenv from "dotenv";
dotenv.config(); // load discord token from .env

import Discord from "discord.js";
import { commands } from "./commands/index.js";
import { bannedUsers, mutedUsers } from "./context.js";
import init from "./init.js";
import { addRole } from "./utils/setRole.js";


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
const prefix = "!";

client.once("ready", async () => {
	const guilds = await client.guilds.fetch();
	guilds.forEach(async (oldGuild) => {
		const guild = await client.guilds.fetch(oldGuild.id);
		init(guild);
	});
	console.log(`🤖 bot ${client.user.username}#${client.user.tag} succefuly started 🚀`);
});

client.on("channelCreate", (chanel => {
	init(chanel.guild);
}));

client.on("messageCreate", async (message) => {
	if (mutedUsers.includes(message.author.id)) {
		try {
			await message.delete();
		} catch (error) {
			message.reply("Je ne peut pas suprimer le message de cet utilisateur muté");
		}
	}


	if (!message.content.startsWith(prefix)) return;
	const commandName = message.content.replace(prefix, "").split(" ")[0];

	const command = commands[commandName];
	if (!command) return;

	command(client, message);
});

setInterval(async () => {
	const mainGuild = await client.guilds.fetch(process.env.GUILD_ID);
	const channel = await mainGuild.channels.fetch(process.env.GUILD_CHANEL_ID);
	channel.send("Pensez à Bump et voter pour le serveur le plus souvent possible dans ce salon #pub-bump , merci.");
}, 1000 * 60 * 60 * 6);

client.on("guildMemberAdd", (member)=>{
	if (bannedUsers.includes(member.id)) {
		addRole(member, process.env.BANNED_ROLE_NAME);
	}
	if (mutedUsers.includes(member.id)) {
		addRole(member, process.env.MUTED_ROLE_NAME);
	}
});


client.login(process.env.BOT_TOKEN);


