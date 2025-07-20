import dotenv from 'dotenv';
dotenv.config();

/**
 * 유저가 콥 내 기본 데이터에 접근할 수 있는 권한이 있는지 검사합니다.
 * 허용된 역할: CEO, COO, 고양이, 새끼냥이
 * @param {string} userId - 디스코드 유저 ID
 * @returns {Promise<boolean>} 하나라도 있으면 true, 없으면 false
 */
export const hasPrivilegedRole = async userId => {
  const guild = await client.guilds.fetch(process.env.GUILDS_NUMBER);
  const member = await guild.members.fetch(userId);

  const allowedRoleIds = [
    '968306218852565053', // 고양이
    '968306218852565059', // CEO
    '968306218852565058', // COO
    '974311434508992612', // 새끼냥이
  ];

  return member.roles.cache.some(role => allowedRoleIds.includes(role.id));
};
