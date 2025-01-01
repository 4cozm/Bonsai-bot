import { SlashCommandBuilder } from 'discord.js';
import { getStructureFuel } from '../../esi/getStructureFuelData.js';
const typeMapping = {
    35832: { name: '허스', emoji: '<:Citadel_Astrahus:1324015125497118754>' },
    35833: { name: '포티자', emoji: '<:Citadel_Fortizar:1324015147232264243>' },
    35834: { name: '킵스타', emoji: '<:Citadel_Keepstar:1324015163094994994>' },
    35825: { name: '라이따루', emoji: '<:Engineering_Raitaru:1324015177879912483>' },
    35826: { name: '아즈벨', emoji: '<:Engineering_Azbel:1324015196146110516>' },
    35827: { name: '소티요', emoji: '<:Engineering_Sotiyo:1324015215305555968>' },
    35835: { name: '아싸노', emoji: '<:Refinery_Athanor:1324015235727753298>' },
    35836: { name: '타타라', emoji: '<:Refinery_Tatara:1324015252458835978>' }
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
  const result = structures
  .map(structure => {
    const { name, fuel_expires, type_id } = structure;
    const now = new Date();

    // 건물 이름과 만료일까지 남은 날 수 계산
    const buildingName = name;
    const expiresDate = new Date(fuel_expires);
    const remainingDays = Math.ceil((expiresDate - now) / (1000 * 60 * 60 * 24));

    // 건물 유형 및 이모지 매핑
    const buildingType = typeMapping[type_id] || { name: '알 수 없음', emoji: ':question:' };
    const displayType = `${buildingType.emoji} ${buildingType.name}`;

    // 각 항목의 길이를 측정하고, 원하는 길이에 맞게 여백을 추가
    const nameLength = 30;  // 건물 이름을 30칸에 맞추기
    const typeLength = 35;  // 건물 유형을 35칸에 맞추기
    const daysLength = 10;  // 남은 일수를 10칸에 맞추기

    const namePadded = buildingName.padEnd(nameLength);
    const typePadded = displayType.padEnd(typeLength);
    const daysPadded = `⏳ ${remainingDays}일 남음`.padEnd(daysLength);

    // 결과 문자열 구성
    return `${namePadded} | ${typePadded} | ${daysPadded}`;
  })
  .join('\n');

  await interaction.reply(result);
}
