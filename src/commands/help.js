import Discord from "discord.js";

/**
 * ban a user
 *
 * !ban @utilisateur raison
 *
 * @param {Discord.Client<boolean>} client
 * @param {Discord.Message} message
 */
export default async function (client, message) {
	// 	message.reply(`
	// Les commandes de ce bot sont:
	// - **!help** @utilisateur (raison)
	// 	- affiche ce message
	// - **!ban** @utilisateur (raison)
	// 	- bannis l'utilisateur
	// - **!kick** @utilisateur (raison)
	// 	- expulse l'utilisateur
	// - **!mute** @utilisateur
	// 	- empeche l'utilisateur de parler
	// - **!unmute** @utilisateur
	// 	- restore la parole de l'utilisateur
	// 	`);
	message.reply({
		embeds: [
			{
				title: "Voila mes commandes",
				author: client.user.username,
				fields: [
					{
						"name": "```!help```",
						"value": "affiche ce message"
					},
					{
						"name": "```!ban @utilisateur (raison)```",
						"value": "bannis l'utilisateur"
					},
					{
						"name": "```!unban @utilisateur```",
						"value": "retirn le ban l'utilisateur"
					},
					{
						"name": "```!kick @utilisateur (raison)```",
						"value": "expulse l'utilisateur"
					},
					{
						"name": "```!mute @utilisateur (raison)```",
						"value": "empeche l'utilisateur de parler"
					},
					{
						"name": "```!unmute @utilisateur```",
						"value": "restore la parole de l'utilisateur"
					},
				]
			}
		]
	});
}
