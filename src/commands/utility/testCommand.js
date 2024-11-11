import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('정보테스트')
  .setDescription('요청하는 정보에 대한 링크 제공')
  .addStringOption(option => option.setName('input').setDescription('설정 1').setRequired(true))
  .addBooleanOption(option => option.setName('숨김').setDescription('남에게 안보이게 하기').setRequired(true));

export async function execute(interaction) {
  const ephemral = interaction.options.getBoolean('숨김');
  await interaction.reply({ content: '정보~~~', ephemeral: ephemral });
}
