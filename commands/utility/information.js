import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('정보')
    .setDescription('요청하는 정보에 대한 링크 제공')

export async function execute(interaction) {
    await interaction.reply({content:'정보~~~', ephemeral: true});
};


