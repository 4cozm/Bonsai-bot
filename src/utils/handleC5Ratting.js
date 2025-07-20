import dotenv from 'dotenv';
import confirmRow from '../buttons/confirmRow.js';
import { modal, rattingStartTime } from '../commands/utility/c5Ratting.js';
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
        await interaction.reply({
          content: '다른 동작이 이미 실행중이에요.',
          flags: InteractionResponseFlags.Ephemeral,
          components: [],
        });
        break;
      }
      isCommandRunning = true;
      await interaction.deferUpdate();
      buttonMarker = 'c5취소';
      buttonInteraction = interaction;
      await interaction.followUp({
        content: `5클조업을 취소하시겠어요?`,
        components: [confirmRow],
        flags: InteractionResponseFlags.Ephemeral,
      });
      break;
    case 'c5종료':
      if (isCommandRunning) {
        await interaction.reply({
          content: '다른 동작이 이미 실행중이에요.',
          flags: InteractionResponseFlags.Ephemeral,
          components: [],
        });
        break;
      }
      isCommandRunning = true;
      buttonMarker = 'c5종료';
      buttonInteraction = interaction;
      await interaction.deferUpdate();
      await interaction.followUp({
        content: `정말로 5클조업을 마무리하실건가요?`,
        components: [confirmRow],
        flags: InteractionResponseFlags.Ephemeral,
      });
      break;
    case 'N':
      await interaction.update({
        content: '명령을 취소했어요! 다음 작업을 계속 진행할 수 있어요.',
        flags: InteractionResponseFlags.Ephemeral,
        components: [],
      });
      isCommandRunning = false;
      break;
    case 'Y':
      switch (buttonMarker) {
        case 'c5취소':
          await interaction.update({
            content: '5클조업을 취소할게요!',
            flags: InteractionResponseFlags.Ephemeral,
            components: [],
          });
          await buttonInteraction.editReply({
            content: '5클조업을 취소합니다.',
            flags: InteractionResponseFlags.Ephemeral,
            components: [],
          });
          isCommandRunning = false;
          break;
        case 'c5종료':
          const startTime = rattingStartTime;
          const endTime = Date.now();
          rattingDuration = (endTime - startTime) / 1000 / 60;
          await buttonInteraction.editReply({
            content: '5클조업 종료창을 띄울게요!',
            flags: InteractionResponseFlags.Ephemeral,
            components: [],
          });
          await interaction.showModal(modal);
          buttonMarker = null;
          isCommandRunning = false;
          break;
      }
  }
}
