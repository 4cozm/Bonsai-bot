/***
 * 디스코드 Modal이 제출되었을 때에 대한 이벤트 핸들러 입니다.
 */
import { rattingDuration } from './handleC5Ratting.js';
// handleC5Rating으로 데이터를 가져오려고 이렇게 설정함.
// 근데, 이렇게 되면 handleC5Ratting <-> handleModalSubmit 양방향으로 데이터가 순환하게 되는데, 문제가 없을지 모르겠음.
import { EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
import getCustomError from '../errors/index.js';
dotenv.config();

const { rattingStatsError } = await getCustomError();
const rattingData = {};

async function handleModalSubmit(interaction) {
  // 5클조업 관련 모달에 대한 처리
  if (interaction.customId === '5클조업결과') {
    try {
      rattingData.blueLootValue = parseFloat(interaction.fields.getTextInputValue('블루룻 est').replace(/\D/g, ''));
      rattingData.salvageValue = parseFloat(interaction.fields.getTextInputValue('샐비징 est').replace(/\D/g, ''));
      rattingData.peopleValue = parseInt(interaction.fields.getTextInputValue('조업 클라수').replace(/\D/g, ''));
      rattingData.compositionValue = interaction.fields.getTextInputValue('조업 컴포');
      rattingData.duration = rattingDuration.toFixed(2);

      if (!rattingData.duration) {
        await interaction.reply({
          content: '먼저 c5Ratting을 실행해주세요.',
          flags: 64,
        });
        return;
      }
      rattingData.hourLoot = parseFloat((rattingData.blueLootValue / (rattingData.duration / 60)).toFixed(2));
      rattingData.hourSalvage = parseFloat((rattingData.salvageValue / (rattingData.duration / 60)).toFixed(2));
      rattingData.hourLootPerPerson = parseFloat((rattingData.hourLoot / rattingData.peopleValue).toFixed(2));
      rattingData.blueLootTax = parseFloat((rattingData.blueLootValue * 0.08).toFixed(2));
      rattingData.salvageTax = rattingData.salvageValue;
      rattingData.totalTax = parseFloat((parseFloat(rattingData.blueLootTax) + rattingData.salvageTax).toFixed(2));

      // 기존 버튼 지우기
      await interaction.update({ content: '5클조업 완료', components: [] });
      // 조업 결과 남들도 보이게 응답.
      const c5Embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('5클조업 결과')
        .addFields(
          {
            name: '분배',
            value: `클라당 ${(rattingData.blueLootValue * 0.9).toFixed(2) / rattingData.peopleValue}m ISK`,
            inline: true,
          },
          { name: '총 블루룻', value: `${rattingData.blueLootValue}m`, inline: true },
          { name: '총 샐비징', value: `${rattingData.salvageValue}m`, inline: true },
          { name: '시간당 블루룻', value: `${rattingData.hourLootPerPerson}m` },
          { name: '블루룻 세금', value: `${rattingData.blueLootTax}m` },
          { name: '샐비징 세금', value: `${rattingData.salvageTax}m` },
          { name: '총 세금', value: `${rattingData.totalTax}m` },
          { name: '조업 시간', value: `${rattingData.duration}분` },
          { name: '컴포', value: `${rattingData.compositionValue}` }
        );
      await interaction.followUp({
        embeds: [c5Embed],
      });
    } catch (error) {
      console.error('모달 처리 중 오류 발생:', error);
      await interaction.reply({
        content: '모달 데이터를 처리하는 중 오류가 발생했습니다.',
        flags: 64,
      });
    }
    try {
      // 통계 예외처리 코드
      if (rattingDuration < 20) {
        await interaction.followUp({
          content: '값에 오류가 있어 통계에 저장되지 않았어요.',
          flags: 64,
        });
        throw new rattingStatsError(null, `20분보다 짧은 5클조업 사용자: ${interaction.user.username}`);
      }
      if (rattingData.hourLoot < 1 || rattingData.hourSalvage < 1) {
        await interaction.followUp({
          content: '값에 오류가 있어 통계에 저장되지 않았어요.',
          flags: 64,
        });
        throw new rattingStatsError(
          null,
          `시간당 블루룻 또는 샐비징 1 이하 5클조업 사용자: ${interaction.user.username}`
        );
      }
      if (rattingData.hourLootPerPerson > 2500 || rattingData.hourSalvage > 2500) {
        await interaction.followUp({
          content: '값에 오류가 있어 통계에 저장되지 않았어요.',
          flags: 64,
        });
        throw new rattingStatsError(
          null,
          `시간당 블루룻 또는 샐비징 2.5b 이상 5클조업 사용자: ${interaction.user.username}, 
          시간당 블루룻: ${hourLootPerPerson}, 시간당 샐비징: ${hourSalvage}`
        );
      }
      let database = await connectC5ratting();
      if (!database) {
        throw new databaseError(null, '데이터베이스 연결 실패');
      }
      await database.execute(
        'INSERT INTO stats (totalBlueLoot, blueLootPerHour, totalSalvage, blueLootTax, salvageTax, duration, composition) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
      await interaction.followUp({
        content: '통계에 저장했어요!',
        flags: 64,
        components: [],
      });
    } catch (e) {
      console.error('오류 발생', e);
    }
  }
}

export default handleModalSubmit;
export { rattingData };
