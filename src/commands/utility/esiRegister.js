import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('esi등록')
  .setDescription('캣포유 ESI와 연동합니다. 다른 사람에게 링크를 공유하지 말아주세요!');
export async function execute(interaction) {
  await interaction.reply({
    contents: '빈칸',
    ephemeral: true,
  });
}
