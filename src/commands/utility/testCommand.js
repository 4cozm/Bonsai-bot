import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('정보테스트')
  .setDescription('요청하는 정보에 대한 링크 제공')
  .addStringOption(option => option.setName('input').setDescription('설정 1').setRequired(true))

  .addBooleanOption(option => option.setName('숨김').setDescription('남에게 안보이게 하기').setRequired(true));

export async function execute(interaction) {
  const echo = new ButtonBuilder().setCustomId('echo').setLabel('입력값').setStyle(ButtonStyle.Primary);
  const row = new ActionRowBuilder().addComponents(echo);

  const ephemral = interaction.options.getBoolean('숨김');
  const value = interaction.options.getString('input');
  const response = await interaction.reply({
    content: '무엇을 알려드릴까요?',
    ephemeral: ephemral,
    components: [row],
  });
  try {
    const confirmation = await response.awaitMessageComponent({ time: 10_000 });

    if (confirmation.customId === 'echo') {
      await confirmation.update({ content: `${value}를 입력하셨어요!` });
    }
  } catch (e) {
    response.editReply({ content: '10초동안 동작이 없습니다. 종료합니다.', comopnents: [] });
  }
}
