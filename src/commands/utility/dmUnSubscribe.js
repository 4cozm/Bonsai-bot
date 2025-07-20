import { SlashCommandBuilder } from 'discord.js';
import { disableDmSubByDiscordId } from '../../db/dmServing/disableDmSubByDiscordId.js';
import { discordAlert } from '../../utils/discordAlert.js';

export const data = new SlashCommandBuilder()
  .setName('알림서빙취소')
  .setDescription('디스코드 @everyone , @here 알림을 DM으로 받기를 취소합니다.');

export async function execute(interaction) {
  try {
    const result = await disableDmSubByDiscordId(interaction.user.id);

    if (!result) {
      await interaction.reply({
        content: '❌ 구독 해지에 문제가 발생했습니다. 이미 비활성화된 상태일 수도 있어요.',
        flags: InteractionResponseFlags.Ephemeral,
      });
      return;
    }

    await interaction.reply({
      content: '✅ 이제부터 DM은 보내지 않을게요!',
      flags: InteractionResponseFlags.Ephemeral,
    });
  } catch (error) {
    console.error('알림 구독 해제 명령 실행 중 오류:', error);
    await discordAlert?.('404', `알림 구독 해제 실패: ${error.message}`);
    try {
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: '⚠️ 구독 해지 중 알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
          flags: InteractionResponseFlags.Ephemeral,
        });
      } else {
        await interaction.followUp({
          content: '⚠️ 추가 오류가 발생했습니다. 관리자에게 문의해주세요.',
          flags: InteractionResponseFlags.Ephemeral,
        });
      }
    } catch (nestedError) {
      console.error('응답 실패:', nestedError.message);
    }
  }
}
