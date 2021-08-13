import Discord from "discord.js";
import { mutedUsers } from "../context.js";


/**
 *
 * @param {Discord.Guild} guild
 * @param {string} text
 */
export async function logMessage(guild, text) {
	const channel = await guild.channels.fetch(process.env.GUILD_LOG_CHANEL_ID);
	channel.send(text);
}