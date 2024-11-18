/***
 * 디스코드 Modal이 제출되었을 때에 대한 이벤트 핸들러 입니다.
 */

import { rattingData } from '../commands/utility/c5Ratting.js';
async function handleModalSubmit(interaction) {
  // 5클조업 관련 모달에 대한 처리
  if (interaction.customId === '5클조업결과') {
    try {
      const blueLootValue = parseFloat(interaction.fields.getTextInputValue('블루룻 est').replace(/\D/g, ''));
      const salvageValue = parseFloat(interaction.fields.getTextInputValue('샐비징 est').replace(/\D/g, ''));
      const peopleValue = parseInt(interaction.fields.getTextInputValue('조업 클라수').replace(/\D/g, ''));
      const compositionValue = parseInt(interaction.fields.getTextInputValue('조업 컴포'));
      const duration = rattingData[interaction.user.id];

      if (!duration) {
        await interaction.reply({ content: '먼저 c5Ratting을 실행해주세요.', ephemeral: true });
        return;
      }
      const hourLoot = blueLootValue / (duration / 60);
      const hourSalvage = salvageValue / (duration / 60);
      const blueLootTax = blueLootValue * 0.08;
      const salvageTax = salvageValue;

      // 처리 결과를 사용자에게 응답
      await interaction.update({
        content: `분배: 클라당 ${blueLootValue / peopleValue}m ISK \n 총 블루룻 : ${blueLootValue}, 총 샐비징 : ${salvageValue} \n 시간당 블루룻 : ${hourLoot.toLocaleString()}m, 시간당 샐비징 ${hourSalvage.toLocaleString()}m \n 블루룻 세금: ${blueLootTax.toLocaleString()}m, 샐비징 세금: ${salvageTax.toLocaleString()}m \n 조업 시간: ${duration}분`,
        ephemeral: false,
        components: [],
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
