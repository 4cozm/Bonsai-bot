/**
 * 운송 가격계산 command
 */

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('운송')
  .setDescription('운송과 관련한 커맨드를 제공합니다')
  .addSubcommand(subcommand => subcommand.setName('정보').setDescription('운송비에 대한 정보 제공'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('계산')
      .setDescription('운송비를 계산합니다')
      .addNumberOption(option => option.setName('부피').setDescription('운송할 물건의 부피').setRequired(true))
      .addNumberOption(option => option.setName('est').setDescription('운송할 물건의 est 가격').setRequired(true))
  );

export async function execute(interaction) {
  if (interaction.options.getSubcommand === '정보') {
    await interaction.reply({
      content: `-보상 기준: 부피당 450isk + 물건가치의 3%
                -최대 부피 : 6만
                -계약대상 : 'Churu for you'으로
                -담보 : 0isk
                -최소 운송기간 : 7일
                -도착지 : J213429 - SAVE CAT 
                                ↕
                Jita IV - Moon 4 - Caldari Navy Assembly Plant`,
      ephemeral: true,
    });
  }
  if (interaction.options.getSubcommand === '계산') {
    let volume = interaction.options.getNumber('volume');
    let est = interaction.options.getNumber('est');
    let price = volume * 450 + est * 0.03;
    if (volume > 60000) {
      await interaction.reply({
        content: '부피가 6만이 넘었어요. 아이템을 적절히 나눠보면 어떨까요?',
        ephemeral: true,
      });
      return;
    }
    const priceEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('운송비')
      .setDescription('운송비 계산 결과')
      .addFields(
        { name: '부피', value: `${volume}` },
        { name: 'est', value: `${est / 1000000}m` },
        { name: '운송비', value: `${price}` }
      );
    await interaction.reply({ embeds: [priceEmbed] });
  }
}
