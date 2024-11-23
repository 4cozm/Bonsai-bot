/**
 * /버튼테스트 slash command
 * 영구적으로 버튼에 응답.
 */

import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
// 커맨드 기본 데이터, 옵션 설정
export const data = new SlashCommandBuilder().setName('버튼테스트').setDescription('버튼 기능 테스트');

export async function execute(interaction) {
  const button1 = new ButtonBuilder().setCustomId('button1').setLabel('button1').setStyle(ButtonStyle.Success);
  const button2 = new ButtonBuilder().setCustomId('button2').setLabel('button2').setStyle(ButtonStyle.Primary);
  const button3 = new ButtonBuilder().setCustomId('button3').setLabel('button3').setStyle(ButtonStyle.Secondary);
  const button4 = new ButtonBuilder().setCustomId('button4').setLabel('button4').setStyle(ButtonStyle.Danger);
  const button5 = new ButtonBuilder().setCustomId('button5').setLabel('button5').setStyle(ButtonStyle.Primary);

  const row1 = new ActionRowBuilder().addComponents([button1, button2, button3, button4, button5]);

  await interaction.reply({ content: '버튼을 나열합니다.', components: [row1] });
}
