import Discord from "discord.js";

Discord.Permissions.FLAGS.SPEAK;
/**
 *
 * @param {Discord.Guild} guild
 */
export default async function (guild) {
	const roles = [
		{
			name: process.env.MUTED_ROLE_NAME,
			color: "#000000",
			reason: "to mute people",
			permisions: {
				SEND_MESSAGES: false,
				SEND_TTS_MESSAGES: false,
				SPEAK: false,
			}
		},
		{
			name: process.env.BANNED_ROLE_NAME,
			color: "#ff0000",
			reason: "to ban people",
			permisions: {
				SEND_MESSAGES: false,
				SEND_TTS_MESSAGES: false,
				CONNECT: false,
				VIEW_CHANNEL: false,
				SPEAK: false,
			}
		}
	];
	for (const roleTemplate of roles) {
		/**
		 * @type {Discord.Role}
		 */
		let role = await guild.roles.cache.find(role => role.name === roleTemplate.name);
		// CREATE ROLES
		if (!role) {
			role = await guild.roles.create(roleTemplate);
			role = await guild.roles.create(roleTemplate);
			console.log(`Create role ${role.name}`);
		}

		// SET CHANELS PERMISIONS
		const chanels = await guild.channels.fetch();
		chanels.forEach(async chanel => {
			// const perms = chanel.permissionOverwrites

			try {
				await chanel.permissionOverwrites.create(role, roleTemplate.permisions);
				console.log(`	✔ Setup permision on chanel ${chanel.name} for role ${role.name}`);
			} catch (error) {
				console.log(`	❌ fail Setup permision on chanel ${chanel.name} for role ${role.name}`);
			}
		});
	}
}