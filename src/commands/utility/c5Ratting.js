/**
 * /5클조업 slash command
 * 5클조업 시간 측정, 분배, 세금 측정 및 기록.
 */

// 필요한 모듈 로드
import {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

// 취소, 확인 버튼 세트 로드
import confirmRow from '../../buttons/confirmRow.js';

// modal로 제출된 데이터를 담을 object.
const rattingData = {};

export const data = new SlashCommandBuilder()
  .setName('5클조업')
  .setDescription('5클조업 관련한 유용한 기능을 제공합니다.')
  .addSubcommand(subcommand => subcommand.setName('시작').setDescription('5클조업 시작 시각을 기록합니다.'))
  .addSubcommand(subcommand => subcommand.setName('통계').setDescription('5클조업 통계를 보여줍니다.'));

export async function execute(interaction) {
  if (interaction.options.getSubcommand() === '시작') {
    //조업 시작 시간 기록
    const currentTime = Date.now();
    // 버튼 생성
    const button1 = new ButtonBuilder().setCustomId('c5취소').setLabel('취소').setStyle(ButtonStyle.Danger);
    const button2 = new ButtonBuilder().setCustomId('c5종료').setLabel('종료').setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder().addComponents(button1, button2);
    const response = await interaction.reply({ content: '5클조업 인터페이스', components: [row], ephemeral: true });
    const buttonAction = await response.awaitMessageComponent({});
    switch (buttonAction.customId) {
      case 'c5취소':
        await buttonAction.deferUpdate();
        await buttonAction.followUp({ content: `5클조업을 멈추시겠어요?`, components: [confirmRow] });
        break;
      case 'c5종료':
        // await buttonAction.deferUpdate();
        // const secondinteraction = await interaction.followUp({
        //   contents: `정말로 5클조업을 종료하실건가요?`,
        //   components: [confirmRow],
        // });
        const modal = new ModalBuilder().setCustomId('5클조업결과').setTitle('5클조업 정산');
        // Add components to modal

        // modal에 text input 창 추가
        const blueLoot = new TextInputBuilder()
          .setCustomId('블루룻 est')
          // 라벨 이름 추가
          .setLabel('총 블루룻 est')
          // 1줄만 쓸 수 있게 허용
          .setStyle(TextInputStyle.Short)
          // 회색 글씨로 가이드라인 제공
          .setPlaceholder('밀단위로 **숫자만** 적어주세요 ex. 1.2b =1200')
          // 필수로 지정
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

        // action row 하나에 text input 하나씩 지정
        const firstActionRow = new ActionRowBuilder().addComponents(blueLoot);
        const secondActionRow = new ActionRowBuilder().addComponents(people);
        const thirdActionRow = new ActionRowBuilder().addComponents(salvage);
        const fourthActionRow = new ActionRowBuilder().addComponents(composition);

        // modal에 input들 추가
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
        await buttonAction.showModal(modal);
        const endTime = Date.now();
        const duration = (endTime - currentTime) / 1000 / 60;
        rattingData[interaction.user.id] = duration;
        console.log(`시작 시간: ${currentTime}`);
        console.log(`종료 시간: ${endTime}`);
        console.log(`걸린 시간: ${duration}`);
        break;
    }
  } else if (interaction.getSubcommand === '통계') {
  }
}
export { rattingData };
