import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('정보테스트')
  .setDescription('요청하는 정보에 대한 링크 제공')
  .addStringOption(option =>
    option
      .setName('input')
      .setDescription('설정 1')
      .setRequired(true)
      .addChoices(
        { name: '설정 1', value: '설정 1 value' },
        { name: '설정 2', value: '설정 2 value' },
        { name: '설정 3', value: '설정 3 value' }
      )
  )

  .addBooleanOption(option => option.setName('숨김').setDescription('남에게 안보이게 하기').setRequired(true));

export async function execute(interaction) {
  const ephemral = interaction.options.getBoolean('숨김');
  const value = interaction.options.getString('input');
  await interaction.reply({ content: value, ephemeral: ephemral });
}
