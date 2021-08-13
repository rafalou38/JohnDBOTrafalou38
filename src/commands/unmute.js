import Discord from "discord.js";
import { mutedUsers } from "../context.js";
import { getMemberFromText } from "../utils/commands.js";
import { logMessage } from "../utils/log.js";

/**
 * ban a user
 *
 * !ban @utilisateur raison
 *
 * @param {Discord.Client<boolean>} client
 * @param {Discord.Message} message
 */
export default async function (client, message) {
	const { author, member, content, guild } = message;
	const isAdmin = member.roles.cache.some(r => process.env.ADMIN_ROLES.split(", ").includes(r.name));

	const args = content.split(" ").slice(1).filter(e => e).filter(e => e);
	if (args.length < 1) {
		await message.reply("mauvais arguments, attendu: ```!unmute @user```");
		return;
	}

	let target = await getMemberFromText(guild, client, args[0]);
	if (!target) return await message.reply(`${args[0]} n'existe pas`);


	if (isAdmin) {
		try {
			const muteRole = guild.roles.cache.find(role => role.name === process.env.MUTED_ROLE_NAME);
			mutedUsers.splice(mutedUsers.indexOf(target.id), 1);
			target.roles.remove(muteRole);

			logMessage(guild, `l'utilisateur <@${target.id}> a été unmute par <@${author.id}>`);
		} catch (error) {
			console.error(error);
			await message.reply(`Erreur ${target.displayName} n'a pas été unmute`);
		}
	} else {
		await message.reply("tu n'a pas l'autorisation d'utiliser cette commande");
	}
}
