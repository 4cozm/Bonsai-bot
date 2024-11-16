/***
 * 디스코드 Modal이 제출되었을 때에 대한 이벤트 핸들러 입니다.
 */
async function handleModalSubmit(interaction) {
  if (interaction.customId === '5클조업결과') {
    // 특정 모달 ID에 대해 처리
    try {
      const blueLootValue = interaction.fields.getTextInputValue('블루룻 est');
      const salvageValue = interaction.fields.getTextInputValue('샐비징 est');
      const peopleValue = interaction.fields.getTextInputValue('조업 클라수');
      const compositionValue = interaction.fields.getTextInputValue('조업 컴포');

      // 처리 결과를 사용자에게 응답
      await interaction.update({
        content: `입력된 정보:\n- 블루룻: ${blueLootValue}\n- 샐비징: ${salvageValue}\n- 클라수: ${peopleValue}\n- 컴포: ${compositionValue}`,
        ephemeral: false,
        components: [],
      });
      console.log(
        `입력된 정보:\n- 블루룻: ${blueLootValue}\n- 샐비징: ${salvageValue}\n- 클라수: ${peopleValue}\n- 컴포: ${compositionValue}`
      );
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
