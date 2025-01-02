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

import mysql from 'mysql2/promise';
import connectC5ratting from '../../db/connectC5ratting.js';

import getCustomError from '../../errors/index.js';
//5클조업 데이터베이스 관련 변수 선언
let database;
let rows;
let fields;
let compositionData;
const { dataNotFoundError } = getCustomError();
// 랫질 시작 시간 기록
let rattingStartTime = 0;
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
const modal = new ModalBuilder().setCustomId('5클조업결과').setTitle('5클조업 정산');
// modal에 input들 추가
modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

export const data = new SlashCommandBuilder()
  .setName('5클조업')
  .setDescription('5클조업 관련한 유용한 기능을 제공합니다.')
  .addSubcommand(subcommand => subcommand.setName('시작').setDescription('5클조업 시작 시각을 기록합니다.'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('통계')
      .setDescription('5클조업 통계를 보여줍니다.')
      .addStringOption(option =>
        option
          .setName('옵션')
          .setDescription('확인하고 싶은 통계 정보')
          .setRequired(true)
          .addChoices(
            { name: '블루룻 샐비징 세금 비율', value: '세금 비율' },
            { name: '평균 시간당 수익', value: '평균 시간당 수익' },
            { name: '시간당 수익 4분위값', value: '4분위값' }
          )
      )
  );

export async function execute(interaction) {
  if (interaction.options.getSubcommand() === '시작') {
    //조업 시작 시간 기록
    const currentTime = Date.now();
    rattingStartTime = currentTime;
    // 버튼 생성
    const button1 = new ButtonBuilder().setCustomId('c5취소').setLabel('취소').setStyle(ButtonStyle.Danger);
    const button2 = new ButtonBuilder().setCustomId('c5종료').setLabel('종료').setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder().addComponents(button1, button2);
    const response = await interaction.reply({ content: '5클조업 인터페이스', components: [row], ephemeral: true });
    const buttonAction = await response.awaitMessageComponent({});
    switch (buttonAction.customId) {
      case 'c5취소':
        break;
      // 이 부분은 이벤트 핸들러로 넘김
      case 'c5종료':
        // 이부분도 이벤트 핸들러로 넘김.
        break;
    }
  } else if (interaction.options.getSubcommand() === '통계') {
    await interaction.deferReply();
    //c5조업 데이터베이스에 연결
    try {
      database = await connectC5ratting();
      // 데이터베이스에서 데이터 가져오기
      [rows, fields] = await database.execute('SELECT * FROM stats');
      // 컴포 관련 정보만 가져오는 전처리
      [compositionData] = await database.execute('SELECT DISTINCT composition FROM stats');
      await database.end();
    } catch (e) {
      console.error(`5클조업 데이터베이스를 불러오는 도중 오류가 발생했습니다. ${e}`);
    }

    const statMarker = interaction.options.getString('옵션');
    switch (statMarker) {
      case '세금 비율':
        try {
          const totalBlueLootTax = rows.reduce((a, b) => a + b.blueLootTax, 0);
          const totalSalvageTax = rows.reduce((a, b) => a + b.salvageTax, 0);
          if (!totalBlueLootTax && !totalSalvageTax) {
            throw new dataNotFoundError();
          }
          await interaction.editReply({ content: `블루룻/샐비징 = ${totalBlueLootTax / totalSalvageTax}` });
        } catch (e) {
          await interaction.editReply({ content: `명령어를 시행하는 도중 오류가 발생했습니다.`, ephemeral: true });
        }
        break;
      case '평균 시간당 수익':
        // 머라, 샥네스터 컴포 구분 필요. 유저가 입력하는게 아니라, db에서 알아서 골라서 구분하면 되지.

        break;
      case '4분위값':
        // 머라, 샥네스터 컴포 구분 필요.
        break;
    }
    /**
     * 통계에 띄울 내용
     * 블루룻 세금 샐비징 세금 비율 (총합해서 비율 내기)
     * 평균 시간당 수익 (컴포별로 따로 보기)
     * 시간당 수익 4분위값.
     * 추후에는 최근 몇개만 골라서 선택하는 기능 만들어도 좋을듯
     * 최근 몇일간 5클랫질 세금 통계 결과 보여주는 기능 만들어도 좋을듯
     */
  }
}
export { rattingStartTime };
export { modal };
