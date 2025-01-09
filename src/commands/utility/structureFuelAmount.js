import { SlashCommandBuilder } from 'discord.js';
import { getStructureFuel } from '../../esi/getStructureFuelData.js';
import discord from 'discord.js';
const { EmbedBuilder } = discord;

const typeMapping = {
  35832: { name: '허스', emoji: '<:Citadel_Astrahus:1324015125497118754>' },
  35833: { name: '포티자', emoji: '<:Citadel_Fortizar:1324015147232264243>' },
  35834: { name: '킵스타', emoji: '<:Citadel_Keepstar:1324015163094994994>' },
  35825: { name: '라이따루', emoji: '<:Engineering_Raitaru:1324015177879912483>' },
  35826: { name: '아즈벨', emoji: '<:Engineering_Azbel:1324015196146110516>' },
  35827: { name: '소티요', emoji: '<:Engineering_Sotiyo:1324015215305555968>' },
  35835: { name: '아싸노', emoji: '<:Refinery_Athanor:1324015235727753298>' },
  35836: { name: '타타라', emoji: '<:Refinery_Tatara:1324015252458835978>' },
};
export const data = new SlashCommandBuilder().setName('연료').setDescription('스트럭쳐의 현재 연료량을 반환합니다다');

export async function execute(interaction) {
  const structures = await getStructureFuel();
  if (!structures || structures.length === 0) {
    await interaction.reply(
      '스트럭쳐 정보가 없어요.ESI가 아플지두?..<a:Bongocat_Wave:996295763908907058> 나중에 다시 해주세요'
    );
    return;
  }
  // 데이터 가공
  const tableRows = structures.map(structure => {
    const { name, fuel_expires, type_id } = structure;
    const now = new Date();

    const buildingName = name;
    const expiresDate = new Date(fuel_expires);
    const remainingDays = Math.ceil((expiresDate - now) / (1000 * 60 * 60 * 24));

    const buildingType = typeMapping[type_id] || { name: '알 수 없음', emoji: ':question:' };
    const displayType = `${buildingType.emoji} ${buildingType.name}`;

    return { name: buildingName, type: displayType, days: `⏳ ${remainingDays}일 남음` };
  });

  // Embed 생성
  const embed = new EmbedBuilder()
    .setColor('#800080') // 임베드의 색상 - 보라색임
    .setTitle('현재 스트럭쳐 연료 상태') // 제목
    .setDescription('다음은 각 스트럭쳐의 연료 상태입니다.') // 설명
    .addFields(
      { name: '건물 이름', value: tableRows.map(row => row.name).join('\n'), inline: true },
      { name: '건물 유형', value: tableRows.map(row => row.type).join('\n'), inline: true },
      {
        name: '남은 일수',
        value: tableRows
          .map(row => {
            let color;
            if (row.days.includes('0일')) {
              color = 'black';
            } else if (parseInt(row.days.match(/\d+/)[0]) <= 10) {
              color = 'red';
            } else if (parseInt(row.days.match(/\d+/)[0]) <= 30) {
              color = 'yellow';
            } else {
              color = 'green';
            }
            return `\`${row.days}\``.fontcolor(color);
          })
          .join('\n'),
        inline: true,
      }
    );

  await interaction.reply({ embeds: [embed] });
}
