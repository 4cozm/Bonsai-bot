/***
 * 디스코드 Modal이 제출되었을 때에 대한 이벤트 핸들러 입니다.
 */
import { rattingDuration } from './handleC5Ratting.js';
async function handleModalSubmit(interaction) {
  // 5클조업 관련 모달에 대한 처리
  if (interaction.customId === '5클조업결과') {
    try {
      const blueLootValue = parseFloat(interaction.fields.getTextInputValue('블루룻 est').replace(/\D/g, ''));
      const salvageValue = parseFloat(interaction.fields.getTextInputValue('샐비징 est').replace(/\D/g, ''));
      const peopleValue = parseInt(interaction.fields.getTextInputValue('조업 클라수').replace(/\D/g, ''));
      const compositionValue = interaction.fields.getTextInputValue('조업 컴포');
      const duration = rattingDuration.toFixed(2);

      if (!duration) {
        await interaction.reply({ content: '먼저 c5Ratting을 실행해주세요.', ephemeral: true });
        return;
      }
      const hourLoot = (blueLootValue / (duration / 60)).toFixed(2);
      const hourSalvage = (salvageValue / (duration / 60)).toFixed(2);
      const blueLootTax = (blueLootValue * 0.08).toFixed(2);
      const salvageTax = salvageValue;

      // 기존 버튼 지우기
      await interaction.update({ content: '5클조업 완료', components: [] });
      // 조업 결과 남들도 보이게 응답.
      await interaction.followUp({
        content: `분배: 클라당 ${(blueLootValue * 0.9) / peopleValue}m ISK \n 총 블루룻 : ${blueLootValue}m, 총 샐비징 : ${salvageValue}m \n 시간당 블루룻 : ${(hourLoot / peopleValue).toFixed(2)}m, 시간당 샐비징 ${hourSalvage}m \n 블루룻 세금: ${blueLootTax}m, 샐비징 세금: ${salvageTax}m \n 조업 시간: ${duration}분`,
        components: [],
        ephemeral: false,
      });
    } catch (error) {
      console.error('모달 처리 중 오류 발생:', error);
      await interaction.reply({
        content: '모달 데이터를 처리하는 중 오류가 발생했습니다.',
        ephemeral: true,
      });
    }
  }
}

export default handleModalSubmit;
