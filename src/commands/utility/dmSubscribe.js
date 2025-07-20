// DM서빙을 등록하는 기능
import { SlashCommandBuilder } from 'discord.js';
import { upsertDmSub } from '../../db/dmServing/upsertDmSub.js';
import { hasPrivilegedRole } from '../../utils/hasPrivilegedRole.js';

export const data = new SlashCommandBuilder()
  .setName('알림서빙')
  .setDescription('디스코드 @everyone , @here 알림이 늦게오는 경우 등록해주세요.');

export async function execute(interaction) {
  try {
    const userId = interaction.user.id;
    const guild = interaction.guild;

    if (!guild) {
      await interaction.reply({
        content: '❌ 서버에서만 사용할 수 있는 명령어입니다.',
        flags: 64,
      });
      return;
    }

    const privilegedRole = await hasPrivilegedRole(userId); // guild 필요하면 인자로 전달
    if (!privilegedRole) {
      await interaction.reply({
        content: '🚫 권한이 부족합니다. 관리자에게 문의해 주세요.',
        flags: 64,
      });
      return;
    }

    try {
      await guild.members.fetch(userId); // 즉시 캐싱
    } catch (err) {
      console.error('❗ 멤버 fetch 실패:', err);
      await interaction.reply({
        content: '⚠️ 유저 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
        flags: 64,
      });
      return;
    }

    let result;
    try {
      result = await upsertDmSub(userId);
    } catch (err) {
      console.error('❗ upsertDmSub 실패:', err);
      await interaction.reply({
        content: '⚠️ 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        flags: 64,
      });
      return;
    }

    if (!result) {
      await interaction.reply({
        content: '❌ 등록에 실패했습니다. 이유는 모르겠네요.',
        flags: 64,
      });
    } else {
      await interaction.reply({
        content: '✅ 이제부터 알림을 DM으로 보내드릴게요!',
        flags: 64,
      });
    }
  } catch (err) {
    console.error('❗ slash 명령 처리 중 예외:', err);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '😵 명령 처리 중 알 수 없는 오류가 발생했습니다.',
        flags: 64,
      });
    }
  }
}
