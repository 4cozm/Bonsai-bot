import confirmRow from '../buttons/confirmRow.js';
import { modal } from '../commands/utility/c5Ratting.js';
import { rattingStartTime } from '../commands/utility/c5Ratting.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { rattingData } from './handleModalSubmit.js';
// 취소,확인 버튼 누르기 이전에 어떤 버튼을 눌렀는지 체크.
let buttonMarker;
// 버튼에 관한 interaction 임시저장하는 변수
let buttonInteraction;
// 랫질 시간 정보를 담을 변수
export let rattingDuration;
// 취소와 종료 버튼에 대한 confirm 버튼이 동시에 뜨지 않게 하기 위한 변수.
let isCommandRunning = false;
dotenv.config();

export async function handleC5Ratting(interaction) {
  switch (interaction.customId) {
    case 'c5취소':
      if (isCommandRunning) {
        await interaction.reply({ content: '다른 동작이 이미 실행중이에요.', ephemeral: true, components: [] });
        break;
      }
      isCommandRunning = true;
      await interaction.deferUpdate();
      buttonMarker = 'c5취소';
      buttonInteraction = interaction;
      await interaction.followUp({ content: `5클조업을 취소하시겠어요?`, components: [confirmRow], ephemeral: true });
      break;
    case 'c5종료':
      if (isCommandRunning) {
        await interaction.reply({ content: '다른 동작이 이미 실행중이에요.', ephemeral: true, components: [] });
        break;
      }
      isCommandRunning = true;
      buttonMarker = 'c5종료';
      buttonInteraction = interaction;
      console.log(`c5종료 버튼 클릭. 현재시각 : ${Date.now()}`);
      await interaction.deferUpdate();
      await interaction.followUp({
        content: `정말로 5클조업을 마무리하실건가요?`,
        components: [confirmRow],
        ephemeral: true,
      });
      break;
    case 'N':
      await interaction.update({
        content: '명령을 취소했어요! 다음 작업을 계속 진행할 수 있어요.',
        ephemeral: true,
        components: [],
      });
      isCommandRunning = false;
      break;
    case 'Y':
      switch (buttonMarker) {
        case 'c5취소':
          await interaction.update({ content: '5클조업을 취소할게요!', ephemeral: true, components: [] });
          await buttonInteraction.editReply({ content: '5클조업을 취소합니다.', ephemeral: true, components: [] });
          isCommandRunning = false;
          break;
        case 'c5종료':
          console.log(`c5종료 확정. 현재 시각 : ${Date.now()}`);
          const startTime = rattingStartTime;
          const endTime = Date.now();
          rattingDuration = (endTime - startTime) / 1000 / 60;
          await buttonInteraction.editReply({ content: '5클조업 종료창을 띄울게요!', ephemeral: true, components: [] });
          await interaction.showModal(modal);
          buttonMarker = null;
          await interaction.followUp({
            content: '이 결과를 통계에 저장할까요?',
            components: [confirmRow],
            ephemeral: true,
          });
          buttonMarker = '통계저장';
          isCommandRunning = false;
          break;
        case '통계저장':
          // 일단 임시로 여기서 db 연결, db 저장 전부 다 하는걸로 해둠.
          let database;
          buttonMarker = null;
          try {
            database = await mysql.createConnection({
              host: process.env.DB_HOST,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              port: process.env.DB_PORT,
              database: 'c5Ratting',
            });
          } catch (e) {
            console.log(e);
          }
          try {
            await database.execute(
              'INSERT INTO stats (totalBlueLoot, blueLootPerHour, totalSalvage, blueLootTax, SalvageTax, duration, composition) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [
                rattingData.blueLootValue,
                rattingData.hourLootPerPerson,
                rattingData.salvageValue,
                rattingData.blueLootTax,
                rattingData.salvageTax,
                rattingData.duration,
                rattingData.compositionValue,
              ]
            );
            await interaction.update({ content: '통계에 저장했어요!', ephemeral: true, components: [] });
          } catch (e) {
            console.log(e);
          }
          break;
      }
  }
}
