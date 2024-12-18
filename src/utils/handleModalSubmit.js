/***
 * 디스코드 Modal이 제출되었을 때에 대한 이벤트 핸들러 입니다.
 */
import { rattingDuration } from './handleC5Ratting.js';
// handleC5Rating으로 데이터를 가져오려고 이렇게 설정함.
// 근데, 이렇게 되면 handleC5Ratting <-> handleModalSubmit 양방향으로 데이터가 순환하게 되는데, 문제가 없을지 모르겠음.
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
        await interaction.reply({ content: '먼저 c5Ratting을 실행해주세요.', ephemeral: true });
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
      await interaction.followUp({
        content: `분배: 클라당 ${(rattingData.blueLootValue * 0.9).toFixed(2) / rattingData.peopleValue}m ISK \n 총 블루룻 : ${rattingData.blueLootValue}m, 총 샐비징 : ${rattingData.salvageValue}m \n 시간당 블루룻 : ${rattingData.hourLootPerPerson}m, 시간당 샐비징 ${rattingData.hourSalvage}m \n 블루룻 세금: ${rattingData.blueLootTax}m, 샐비징 세금: ${rattingData.salvageTax}m \n 총 세금 : ${rattingData.totalTax}m \n 조업 시간: ${rattingData.duration}분 \n 컴포: ${rattingData.compositionValue}`,
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
export { rattingData };
