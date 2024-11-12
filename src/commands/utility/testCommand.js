import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
// 커맨드 기본 데이터, 옵션 설정
export const data = new SlashCommandBuilder()
  .setName('정보테스트')
  .setDescription('요청하는 정보에 대한 링크 제공')
  .addBooleanOption(option => option.setName('숨김').setDescription('남에게 안보이게 하기').setRequired(true));
//커맨드 호출될때 실행 될 함수
export async function execute(interaction) {
  // 1번째로 보일 버튼
  const pvp = new ButtonBuilder().setCustomId('pvp').setLabel('pvp').setStyle(ButtonStyle.Primary);
  const pve = new ButtonBuilder().setCustomId('pve').setLabel('pve').setStyle(ButtonStyle.Primary);
  const wormhole = new ButtonBuilder().setCustomId('웜홀').setLabel('웜홀').setStyle(ButtonStyle.Primary);
  const survive = new ButtonBuilder().setCustomId('생존법').setLabel('생존법').setStyle(ButtonStyle.Primary);
  const site = new ButtonBuilder().setCustomId('유용한 사이트').setLabel('유용한 사이트').setStyle(ButtonStyle.Primary);
  const thirdparty = new ButtonBuilder().setCustomId('서드파티').setLabel('서드파티').setStyle(ButtonStyle.Primary);
  const etc = new ButtonBuilder().setCustomId('기타').setLabel('기타').setStyle(ButtonStyle.Primary);
  //2번째로 보일 버튼 -pvp 선택시
  const pvp1 = new ButtonBuilder().setCustomId('독트린').setLabel('독트린').setStyle(ButtonStyle.Primary);
  const pvp2 = new ButtonBuilder().setCustomId('기동 공략').setLabel('기동 공략').setStyle(ButtonStyle.Primary);
  const pvp3 = new ButtonBuilder().setCustomId('플릿전 가이드').setLabel('플릿전 가이드').setStyle(ButtonStyle.Primary);
  const pvp4 = new ButtonBuilder().setCustomId('젯킬 포스트').setLabel('젯킬 포스트').setStyle(ButtonStyle.Primary);
  const pvp5 = new ButtonBuilder()
    .setCustomId('뉴트 티커 정리 문서')
    .setLabel('뉴트 티커 정리 문서')
    .setStyle(ButtonStyle.Primary);
  //2번째로 보일 버튼 - pve 선택시...
  const pve1 = new ButtonBuilder()
    .setCustomId('랫질 사이트 정보')
    .setLabel('랫질 사이트 정보')
    .setStyle(ButtonStyle.Primary);
  const pve2 = new ButtonBuilder()
    .setCustomId('머라우더 랫질 정보')
    .setLabel('머라우더 랫질 정보')
    .setStyle(ButtonStyle.Primary);
  const pve3 = new ButtonBuilder().setCustomId('코어가스 공략').setLabel('코어가스 공략').setStyle(ButtonStyle.Primary);
  const pve4 = new ButtonBuilder().setCustomId('pi 공략').setLabel('pi 공략').setStyle(ButtonStyle.Primary);
  const pve5 = new ButtonBuilder().setCustomId('하섹데드 공략').setLabel('하섹데드 공략').setStyle(ButtonStyle.Primary);
  const pve6 = new ButtonBuilder().setCustomId('해적랫 속성').setLabel('해적랫 속성').setStyle(ButtonStyle.Primary);
  const pve7 = new ButtonBuilder().setCustomId('프비셜 공략').setLabel('프비셜 공략').setStyle(ButtonStyle.Primary);

  const wormhole1 = new ButtonBuilder()
    .setCustomId('웜홀 롤링 예시')
    .setLabel('웜홀 롤링 예시')
    .setStyle(ButtonStyle.Primary);
  const wormhole2 = new ButtonBuilder()
    .setCustomId('웜홀 영문정보')
    .setLabel('웜홀 영문정보')
    .setStyle(ButtonStyle.Primary);
  const wormhole3 = new ButtonBuilder()
    .setCustomId('웜홀 북마크 정렬순서')
    .setLabel('웜홀 북마크 정렬순서')
    .setStyle(ButtonStyle.Primary);
  const wormhole4 = new ButtonBuilder()
    .setCustomId('웜홀 한국어위키')
    .setLabel('웜홀 한국어위키')
    .setStyle(ButtonStyle.Primary);
  const wormhole5 = new ButtonBuilder()
    .setCustomId('웜홀 영문위키')
    .setLabel('웜홀 영문위키')
    .setStyle(ButtonStyle.Primary);
  const wormhole6 = new ButtonBuilder()
    .setCustomId('웜홀 K162 메커니즘')
    .setLabel('웜홀 K162 메커니즘')
    .setStyle(ButtonStyle.Primary);
  const wormhole7 = new ButtonBuilder()
    .setCustomId('3클 롤링차트')
    .setLabel('3클 롤링차트')
    .setStyle(ButtonStyle.Primary);

  const survive1 = new ButtonBuilder().setCustomId('인스타워프').setLabel('인스타워프').setStyle(ButtonStyle.Primary);
  const survive2 = new ButtonBuilder().setCustomId('마웦클락').setLabel('마웦클락').setStyle(ButtonStyle.Primary);

  const site1 = new ButtonBuilder().setCustomId('zkillboard').setLabel('zkillboard').setStyle(ButtonStyle.Primary);
  const site2 = new ButtonBuilder().setCustomId('goonpraisal').setLabel('goonpraisal').setStyle(ButtonStyle.Primary);
  const site3 = new ButtonBuilder().setCustomId('janice').setLabel('janice').setStyle(ButtonStyle.Primary);
  const site4 = new ButtonBuilder()
    .setCustomId('cerlestes 광물')
    .setLabel('cerlestes 광물')
    .setStyle(ButtonStyle.Primary);
  const site5 = new ButtonBuilder()
    .setCustomId('Fuzzwork 가스 시세')
    .setLabel('Fuzzwork 가스 시세')
    .setStyle(ButtonStyle.Primary);
  const site6 = new ButtonBuilder()
    .setCustomId('pi 제작재료 가이드')
    .setLabel('pi 제작재료 가이드')
    .setStyle(ButtonStyle.Primary);
  const site7 = new ButtonBuilder()
    .setCustomId('dscan.info(디스캔 정리 사이트)')
    .setLabel('dscan.info(디스캔 정리 사이트)')
    .setStyle(ButtonStyle.Primary);
  const site8 = new ButtonBuilder().setCustomId('pastebin').setLabel('pastebin').setStyle(ButtonStyle.Primary);
  const site9 = new ButtonBuilder()
    .setCustomId('peld-fleet(플릿 정보 분석 사이트)')
    .setLabel('peld-fleet(플릿 정보 분석 사이트)')
    .setStyle(ButtonStyle.Primary);
  const site10 = new ButtonBuilder().setCustomId('패스파인더').setLabel('패스파인더').setStyle(ButtonStyle.Primary);

  const thirdparty1 = new ButtonBuilder()
    .setCustomId('eve-o-preview')
    .setLabel('eve-o-preview')
    .setStyle(ButtonStyle.Primary);
  const thirdparty2 = new ButtonBuilder().setCustomId('경보기').setLabel('경보기').setStyle(ButtonStyle.Primary);
  const thirdparty3 = new ButtonBuilder().setCustomId('pyfa').setLabel('pyfa').setStyle(ButtonStyle.Primary);

  const etc1 = new ButtonBuilder()
    .setCustomId('시그니처번역기')
    .setLabel('시그니처번역기')
    .setStyle(ButtonStyle.Primary);

  // let으로 정의해도 후에 문제 없을지 모르겠음. row는 한줄을 의미함. 1줄에 최대 5개 버튼.
  let row1;
  let row2;
  let row3;
  let row4;
  let row5;
  row1 = new ActionRowBuilder().addComponents(pvp, pve, wormhole);
  row2 = new ActionRowBuilder().addComponents(survive, site, thirdparty, etc);
  const collectorFilter = i => i.user.id === interaction.user.id;
  const ephemral = interaction.options.getBoolean('숨김');
  const response = await interaction.reply({
    content: '무엇을 알려드릴까요?',
    ephemeral: ephemral,
    components: [row1, row2],
  });
  try {
    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });

    switch (confirmation.customId) {
      case 'pvp':
        row1 = new ActionRowBuilder().addComponents(pvp1, pvp2, pvp3, pvp4, pvp5);
        await confirmation.update({ content: `${confirmation.customId}에 대해 알려드릴게요!`, components: [row1] });
        break;
      case 'pve':
        row1 = new ActionRowBuilder().addComponents(pve1, pve2, pve3, pve4, pve5);
        row2 = new ActionRowBuilder().addComponents(pve6, pve7);
        await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1, row2],
        });
        break;
      case '웜홀':
        row1 = new ActionRowBuilder().addComponents(wormhole1, wormhole2, wormhole3, wormhole4, wormhole5);
        row2 = new ActionRowBuilder().addComponents(wormhole6, wormhole7);
        await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1, row2],
        });
        break;
      case '생존법':
        row1 = new ActionRowBuilder().addComponents(survive1, survive2);
        await confirmation.update({ content: `${confirmation.customId}에 대해 알려드릴게요!`, components: [row1] });
        break;
      case '유용한 사이트':
        row1 = new ActionRowBuilder().addComponents(site1, site2, site3, site4, site5);
        row2 = new ActionRowBuilder().addComponents(site6, site7, site8, site9, site10);
        await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1, row2],
        });
        break;
      case '서드파티':
        row1 = new ActionRowBuilder().addComponents(thirdparty1, thirdparty2, thirdparty3);
        await confirmation.update({ content: `${confirmation.customId}에 대해 알려드릴게요!`, components: [row1] });
        break;
      case '기타':
        row1 = new ActionRowBuilder().addComponents(etc1);
        await confirmation.update({ content: `${confirmation.customId}에 대해 알려드릴게요!`, components: [row1] });
        break;
    }
  } catch (e) {
    await interaction.editReply({ content: '10초동안 동작이 없습니다. 종료합니다.', components: [] });
    console.error(e);
  }
}
