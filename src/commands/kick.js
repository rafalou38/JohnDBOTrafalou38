import Discord from "discord.js";
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
	const args = content.split(" ").slice(1).filter(e => e);
	const isAdmin = member.roles.cache.some(r => process.env.ADMIN_ROLES.split(", ").includes(r.name));

	if (args.length < 1) {
		await message.reply("mauvais arguments, attendu: ```!kick @user (raison)```");
		return;
	}

	const reason = args.slice(2).join(" ") || "";

	let target = await getMemberFromText(guild, client, args[0]);
	if (!target) return await message.reply(`${args[0]} n'existe pas`);

	if (isAdmin) {
		try {
			await target.kick(args.slice(1).join(" "));
			logMessage(guild, `l'utilisateur <@${target.id}> a été kick par <@${author.id}>` + "```" + reason + "```");
		} catch (error) {
			console.error(error);
			await message.reply(`Erreur ${target.displayName} n'a pas été kick`);
		}
	} else {
		await message.reply("tu n'a pas l'autorisation d'utiliser cette commande");
	}
}
