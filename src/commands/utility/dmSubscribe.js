//DM서빙을 등록하는 기능
import { SlashCommandBuilder } from 'discord.js';
import { upsertDmSub } from '../../db/dmServing/upsertDmSub.js';
import { hasPrivilegedRole } from '../../utils/hasPrivilegedRole.js';

export const data = new SlashCommandBuilder()
  .setName('알림서빙')
  .setDescription('디스코드 @everyone , @here 알림이 늦게오는 경우 등록해주세요.');

export async function execute(interaction) {
  //정책에 따라 롤이 있는 사람들만 메세지 서빙을 받을 수 있음.
  const privilegedRole = hasPrivilegedRole(interaction.user.id);
  if (!privilegedRole) {
    await interaction.reply({
      content: '권한이 부족합니다 관리자에게 문의해 주세요',
    });
    return;
  }
  await guild.members.fetch(interaction.user.id); //즉시 유저를 캐싱
  const result = await upsertDmSub(interaction.user.id);
  if (!result) {
    await interaction.reply({
      content: '❌ 등록에 실패했습니다. 이유는 모르겠네요',
    });
  } else {
    await interaction.reply({
      content: '✅ 이제부터 알림을 DM으로 보내드릴게요!',
      flags: 64, // 사용자에게만 보이도록
    });
  }
}

