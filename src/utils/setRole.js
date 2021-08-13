import Discord from "discord.js";
/**
 *
 * @param {Discord.GuildMember} member
 * @param {string} name
 */
export function addRole(member, name) {
	const role = member.guild.roles.cache.find(role => role.name === name);
	member.roles.add(role);
}
/**
 *
 * @param {Discord.GuildMember} member
 * @param {string} name
 */
export function removeRole(member, name) {
	const role = member.guild.roles.cache.find(role => role.name === name);
	member.roles.remove(role);
}