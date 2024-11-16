/**
 * /5클조업 slash command
 * 5클조업 시간 측정, 분배, 세금 측정 및 기록.
 */

import {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalSubmitInteraction,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('5클조업')
  .setDescription('5클조업 관련한 유용한 기능을 제공합니다.')
  .addSubcommand(subcommand => subcommand.setName('시작').setDescription('5클조업 시작 시각을 기록합니다.'))
  .addSubcommand(subcommand => subcommand.setName('통계').setDescription('5클조업 통계를 보여줍니다.'));

export async function execute(interaction) {
  if (interaction.options.getSubcommand() === '시작') {
    const currentTime = Date.now();
    const button1 = new ButtonBuilder().setCustomId('c5취소').setLabel('취소').setStyle(ButtonStyle.Danger);
    const button2 = new ButtonBuilder().setCustomId('c5종료').setLabel('종료').setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder().addComponents(button1, button2);
    const response = await interaction.reply({ content: '5클조업 인터페이스', components: [row] });
    const buttonAction = await response.awaitMessageComponent({});
    switch (buttonAction.customId) {
      case 'c5취소':
        await buttonAction.update({ content: '5클랫질을 취소합니다.', components: [] });
        break;
      case 'c5종료':
        const modal = new ModalBuilder().setCustomId('5클조업결과').setTitle('5클조업 정산');
        // Add components to modal

        // Create the text input components
        const blueLoot = new TextInputBuilder()
          .setCustomId('블루룻 est')
          // The label is the prompt the user sees for this input
          .setLabel('총 블루룻 est')
          // Short means only a single line of text
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('(밀단위로 **숫자만** 적어주세요 ex. 1.2b =1200)')
          .setRequired(true);

        const salvage = new TextInputBuilder()
          .setCustomId('샐비징 est')
          .setLabel('총 샐비징 est')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('밀단위로 **숫자만** 적어주세요 ex 1.2b = 1200')
          .setRequired(true);

        const people = new TextInputBuilder()
          .setCustomId('조업 클라수')
          .setLabel('조업 클라수')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('숫자로만 적어주세요. ex. 4클라 = 4')
          .setRequired(true);

        const composition = new TextInputBuilder()
          .setCustomId('조업 컴포')
          .setLabel('조업 컴포')
          // Paragraph means multiple lines of text.
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('머라 or 샥네스터로 적어주심 됩니다')
          .setRequired(true);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(blueLoot);
        const secondActionRow = new ActionRowBuilder().addComponents(people);
        const thirdActionRow = new ActionRowBuilder().addComponents(salvage);
        const fourthActionRow = new ActionRowBuilder().addComponents(composition);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
        await buttonAction.showModal(modal);
        const endTime = Date.now();
        const duration = (endTime - currentTime) / 1000 / 60;
        // await modal.interaction.message.update({
        //   content: `5클랫질을 종료합니다. 걸린 시간 ${duration}분`,
        //   components: [],
        // });
        console.log(`시작 시간: ${currentTime}`);
        console.log(`종료 시간: ${endTime}`);
        console.log(`걸린 시간: ${duration}`);
        break;
    }
  } else if(interaction.getSubcommand === '통계'){
    
  }
}
