//DM서빙을 등록하는 기능
import { SlashCommandBuilder } from 'discord.js';
import { upsertDmSub } from '../../db/dmServing/upsertDmSub.js';

export const data = new SlashCommandBuilder()
  .setName('알림서빙')
  .setDescription('디스코드 @everyone , @here 알림이 늦게오는 경우 등록해주세요.');

export async function execute(interaction) {
  //정책에 따라 롤이 있는 사람들만 메세지 서빙을 받을 수 있음.
  const privilegedRole = hasPrivilegedRole(interaction);
  if (!privilegedRole) {
    await interaction.reply({
      content: '권한이 부족합니다 관리자에게 문의해 주세요',
      ephemeral: false,
    });
    return;
  }

  const result = await upsertDmSub(interaction.user.id);
  if (!result) {
    await interaction.reply({
      content: '❌ 등록에 실패했습니다. 이유는 모르겠네요',
      ephemeral: false,
    });
  } else {
    await interaction.reply({
      content: '✅ 이제부터 알림을 DM으로 보내드릴게요!',
      ephemeral: true, // 사용자에게만 보이도록
    });
  }
}

/**
 * 유저가 특정 역할들 중 하나라도 가지고 있는지 검사합니다.
 * @param {import('discord.js').ChatInputCommandInteraction} interaction - 슬래시 명령어 인터랙션
 * @returns {boolean} 하나라도 있으면 true, 없으면 false
 */
function hasPrivilegedRole(interaction) {
  if (!interaction.inGuild()) return false;

  const member = interaction.member;
  const allowedRoles = ['CEO', 'COO', '고양이', '새끼냥이'];

  return member.roles.cache.some(role => allowedRoles.includes(role.name));
}
