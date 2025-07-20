/**
 * /정보 slash command
 * 버튼으로 필요한 정보 제공
 */

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';
// 커맨드 기본 데이터, 옵션 설정
export const data = new SlashCommandBuilder().setName('정보').setDescription('요청하는 정보에 대한 링크 제공');

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
  const survive3 = new ButtonBuilder().setCustomId('세션 타이머').setLabel('세션 타이머').setStyle(ButtonStyle.Primary);

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

  // let으로 정의해도 후에 문제 없을지 모르겠음. row는 한줄을 의미함. 1줄에 최대 5개 버튼. row1 = 1열.. row5= 5열
  let row1;
  let row2;
  let row3;
  let row4;
  let row5;

  row1 = new ActionRowBuilder().addComponents(pvp, pve, wormhole);
  row2 = new ActionRowBuilder().addComponents(survive, site, thirdparty, etc);

  const collectorFilter = i => i.user.id === interaction.user.id; // 커맨드를 호출한 사람만 버튼과 상호작용 가능.

  const response = await interaction.reply({
    content: '무엇을 알려드릴까요?',
    flags: 64, // 남에게 안보이게 할 지 여부
    components: [row1, row2],
  });

  // 1번째 버튼에 대해 지정된 시간동안 interaction이 없을때 던지는 오류 캐치하는 try - catch 구문
  try {
    // response에서 어떤 버튼을 누르나 확인함.
    const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 30_000 });

    // 내부에서 쓸 response랑 confirmation을 let으로 미리 정의함.
    let internalResponse;
    let internalConfirmation;

    switch (confirmation.customId) {
      // 첫번째 버튼이 pvp일때 (이때 pvp는 customId임)
      case 'pvp':
        row1 = new ActionRowBuilder().addComponents(pvp1, pvp2, pvp3, pvp4, pvp5);
        internalResponse = await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1], //어레이의 row들을 버튼으로 배치해줌
        });
        //입력 시간이 지났을때 던지는 에러 캐치
        try {
          internalConfirmation = await internalResponse.awaitMessageComponent({
            time: 30_000, // 응답하는데까지 대기시간. 이 시간동안 interaction이 없으면 error 던짐.
          });
          switch (internalConfirmation.customId) {
            //그 다음 버튼에서 독트린 선택 (선택한 버튼의 Id가 독트린)
            case '독트린':
              await internalConfirmation.update({
                content:
                  "-외부에 유출 금지 \n [독트린 문서](<https://www.figma.com/design/9CHqYeUKoUhszzmSNJjri0/남쇠루's-team-library?node-id=3311-5&t=B02CCgzInmYOYGfu-4>)",
                components: [],
              });
              break;

            case '기동 공략':
              await internalConfirmation.update({
                content:
                  '[태클 교육자료](<https://gall.dcinside.com/board/view/?id=eveonline&no=341033>)\n[수동기동(1)] (<https://youtu.be/sP0hYYK3Tc8?si=2r1cmPoBcg6JKmyg&t=37>)\n[수동기동(2)](<https://www.youtube.com/watch?v=bpGu4jThQ7A>)\n[수동기동(3)] (<https://www.youtube.com/watch?v=mv1kwD0U0IM>)\n',
                components: [],
              });
              break;

            case '플릿전 가이드':
              await internalConfirmation.update({
                content: `[(1) 세이브 기초영상](<https://www.youtube.com/watch?v=zcxBdbCsOyk>)\n[(2) 에레스트리안 영상1](<https://www.youtube.com/watch?v=tOcQF-ewMjk>)\n[(3) 에레스트리안 영상2](<https://www.youtube.com/watch?v=uq1XVS8aDPY>) \n`,
                components: [],
              });
              break;

            case '젯킬 포스트':
              await internalConfirmation.update({
                content: `https://discord.com/channels/968306218852565052/968325113772654694/1305515249595711569`,
                components: [],
              });
              break;

            case '뉴트 티커 정리 문서':
              await internalConfirmation.update({
                content: 'https://discord.com/channels/968306218852565052/968325113772654694/1078299989668798595',
                components: [],
              });
              break;
          }
        } catch (e) {
          await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
          console.error(e);
        }
        break;
      // 이후 반복..
      case 'pve':
        row1 = new ActionRowBuilder().addComponents(pve1, pve2, pve3, pve4, pve5);
        row2 = new ActionRowBuilder().addComponents(pve6, pve7);
        internalResponse = await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1, row2],
        });
        try {
          internalConfirmation = await internalResponse.awaitMessageComponent({
            time: 30_000,
          });
          switch (internalConfirmation.customId) {
            case '랫질 사이트 정보':
              await internalConfirmation.update({
                content:
                  '<https://docs.google.com/spreadsheets/d/1TEmT7ZtMMImdY-21e0TSAzUjXoc_UJxf4iCPsuN7jkA/edit#gid=265585191>',
                components: [],
              });
              break;

            case '머라우더 랫질 정보':
              await internalConfirmation.update({
                content:
                  'https://discord.com/channels/968306218852565052/1051725602673147925 에 궁금한 점 문의. <https://docs.google.com/document/d/18wn7gVuIWNKpsRE1MW55HSkONJnVWJMvqu5us9qwPkE/edit> 바거 핏\n <https://ashyin.space/how-2-krab-part-8-marauders/> 머라 종합',
                components: [],
              });
              break;

            case '코어가스 공략':
              await internalConfirmation.update({
                content: `<https://docs.google.com/document/d/1Rf7SFBIjxzg3gbZEADMqqGLWR_tW-BWnpIKP84ytKM8/edit?usp=sharing>`,
                components: [],
              });
              break;

            case 'pi 공략':
              await internalConfirmation.update({
                content: `pi가이드\n <https://docs.google.com/document/d/1OGdnZuU_W8sewI0c5nG0DvHBrMZc2cNFlygc_RyHbwc/edit?usp=drivesdk> 외부 공유자료`,
                components: [],
              });
              break;

            case '하섹데드 공략':
              await internalConfirmation.update({
                content: '<https://docs.google.com/document/d/1qsWUsKdBGV4DuG3Xnr2BRVnD867rF2iO/edit>',
                components: [],
              });
              break;

            case '해적랫 속성':
              await internalConfirmation.update({
                content: 'https://discord.com/channels/968306218852565052/968325113772654694/1076749160809779230',
                components: [],
              });
              break;

            case '프비셜 공략':
              await internalConfirmation.update({
                content:
                  '<https://docs.google.com/document/d/1qYzaEjHBbyHS6LEKtL6jfKcBkwpvBIT14HdR46HQVaQ/edit?usp=sharing>',
                components: [],
              });
              break;
          }
        } catch (e) {
          await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
          console.error(e);
        }
        break;

      case '웜홀':
        row1 = new ActionRowBuilder().addComponents(wormhole1, wormhole2, wormhole3, wormhole4, wormhole5);
        row2 = new ActionRowBuilder().addComponents(wormhole6, wormhole7);
        internalResponse = await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1, row2],
        });
        try {
          internalConfirmation = await internalResponse.awaitMessageComponent({
            time: 30_000,
          });
          switch (internalConfirmation.customId) {
            case '웜홀 롤링 예시':
              await internalConfirmation.update({
                content: 'https://discord.com/channels/968306218852565052/968325113772654694/968384239089369099',
                components: [],
              });
              break;

            case '웜홀 영문정보':
              await internalConfirmation.update({
                content: `#웜홀 텍스트
                  '웜홀의 인포'에서 아주 유용한 정보들을 볼 수 있다. '인포에 써있는 문장'은 '어떤 지역과 연결'되는지, '수명과 질량'이 얼마나 남았는지, '어떤 함급'이 이 웜홀을 이용할 수 있는지 알 수 있다.

                  #This wormhole seems to lead into [　　　　　] parts of space. (해당 웜홀은 [　　　　　]으로 이어지는것 같습니다.)
                  'Unknown' [미지의 우주 공간] : C1,C2,C3 W-스페이스와 연결된다.
                  'Dangerous Unknown' [위험한 미지의 우주 공간] : C4,C5 W-스페이스와 연결된다.
                  'Deadly Unknown' [치명적인 미지의 우주 공간] : C6 W-스페이스와 연결된다.
                  'Unique and mysterious Thera' [유일무이하면서도 불가사의한 테라 항성계] : 테라와 연결된다.
                  'High Security' [하이 시큐리티] : 하이섹 K-스페이스와 연결된다.
                  'Low Security' [로우 시큐리티] : 로우섹 K-스페이스와 연결된다.
                  'Null Security' [널 시큐리티] : 널섹 K-스페이스와 연결된다.

                  #This wormhole…
                  'has not yet begun its natural cycle of decay and should last at least another day' [해당 웜홀은 아직 자연적인 붕괴 단계로 넘어가지 않았으며 최소한 하루 이상을 더 버틸 것입니다.]: 방금 생성됨
                  'is beginning to decay, and probably won't last another day' [이미 약해지고 있습니다. 아마도 채 하루를 넘기지 못할 것입니다.]: 수명 4h +-10% 이상
                  'is reaching the end of its natural lifetime' [해당 웜홀은 자연 수명의 끝에 도달하고 있습니다.] : 수명 4h +-10% 이하
                  'is on the verge of dissipating into the ether' : 곧 소멸

                  #This wormhole has… (해당 웜홀은…)
                  'not yet had its stability significantly disrupted by ships passing through it' [안정성은 아직 통과하는 함선들로 인해 심각한 영향을 받지 않았습니다.] : 잔존 질량한계 50% 이상
                  'had its stability reduced by ships passing through it, but not to a critical degree yet' [해당 웜홀의 안정성은 통과한 함선들 때문에 낮아졌지만, 아직 심각한 상태까지 이르지는 않았습니다.] : 잔존 질량한계 10 ~ 50%
                  'had its stability critically disrupted by the mass of numerous ships passing through and is on the verge of collapse' [해당 웜홀의 안정성은 그동안 통과한 함선들의 질량에 의해 크게 방해받았으며, 붕괴 직전의 상태입니다.] : 잔존 질량한계 10% 미만

                  #[　　　　　] can pass through this wormhole.
                  'Only the smallest ships' [오직 가장 작은 함선들만] : 스몰사이즈 이하
                  'Upto medium size ships' : 미디엄사이즈 이하
                  'Larger ships' [더 큰 함선도] : 라지사이즈 이하
                  'Very Large ships' [가장 큰 함선들도] : 캐피탈쉽 이하`,
                components: [],
              });
              break;

            case '웜홀 북마크 정렬순서':
              await internalConfirmation.update({
                content:
                  '0 1 2 3 4 5 6 7 8 9 ! " # $ % > < & \' ( ) * + , - . / : ; = ? @ [ \\ ] ^ _ ` a b c { | } ~ ㄱ ㄴ ㄷ ㅏ ㅑ ㅓ',
                components: [],
              });
              break;

            case '웜홀 한국어위키':
              await internalConfirmation.update({
                content: `<https://funzinnu.com/EVEwiki/웜홀?s[]=wormhole>`,
                components: [],
              });
              break;

            case '웜홀 영문위키':
              await internalConfirmation.update({
                content: '<https://wiki.eveuniversity.org/Wormhole_sites>',
                components: [],
              });
              break;

            case '웜홀 k162 메커니즘':
              await internalConfirmation.update({
                content:
                  '<https://forums.eveonline.com/t/k162-spawn-mechanics/8767> \n https://ptb.discord.com/channels/968306218852565052/968306219234238529/971696258144174190',
                components: [],
              });
              break;

            case '3클 롤링차트':
              await internalConfirmation.update({
                content: 'https://discord.com/channels/968306218852565052/968325113772654694/1295396423902302230',
                components: [],
              });
              break;
          }
        } catch (e) {
          await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
          console.error(e);
        }
        break;

      case '생존법':
        row1 = new ActionRowBuilder().addComponents(survive1, survive2, survive3);
        internalResponse = await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1],
        });
        try {
          internalConfirmation = await internalResponse.awaitMessageComponent({
            time: 30_000,
          });
          switch (internalConfirmation.customId) {
            case '인스타워프':
              await internalConfirmation.update({
                content: '<https://gall.dcinside.com/board/view/?id=eveonline&no=384247&page=1>',
                components: [],
              });
              break;

            case '마웦클락':
              await internalConfirmation.update({
                content: '<https://www.youtube.com/watch?v=9AHT1u6TRM8>',
                components: [],
              });
              break;
            case '세션타이머':
              await internalConfirmation.update({
                content: '<https://gall.dcinside.com/board/view/?id=eveonline&no=383847&page=1>',
                components: [],
              });
          }
        } catch (e) {
          await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
          console.error(e);
        }
        break;

      case '유용한 사이트':
        row1 = new ActionRowBuilder().addComponents(site1, site2, site3, site4, site5);
        row2 = new ActionRowBuilder().addComponents(site6, site7, site8, site9, site10);
        internalResponse = await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1, row2],
        });
        try {
          internalConfirmation = await internalResponse.awaitMessageComponent({
            time: 30_000,
          });
          switch (internalConfirmation.customId) {
            case 'zkillboard':
              await internalConfirmation.update({
                content: '<https://zkillboard.com/>',
                components: [],
              });
              break;

            case 'goonpraisal':
              await internalConfirmation.update({
                content: '<https://appraise.imperium.nexus/>',
                components: [],
              });
              break;

            case 'janice':
              await internalConfirmation.update({
                content: `<https://janice.e-351.com/>`,
                components: [],
              });
              break;

            case 'cerlestes 광물':
              await internalConfirmation.update({
                content: `<https://ore.cerlestes.de/market/gases>`,
                components: [],
              });
              break;

            case 'Fuzzwork 가스 시세':
              await internalConfirmation.update({
                content: '<https://www.fuzzwork.co.uk/ore/gas.php?region=10000002>',
                components: [],
              });
              break;

            case 'pi 제작재료 가이드':
              await internalConfirmation.update({
                content: 'https://evehelper.tk/',
                components: [],
              });
              break;

            case 'dscan.info(디스캔 정리 사이트)':
              await internalConfirmation.update({
                content: '<https://dscan.info/>',
                components: [],
              });
              break;

            case 'pastebin':
              await internalConfirmation.update({
                content: '<https://pastebin.com/>',
                components: [],
              });
              break;

            case 'peld-fleet(플릿 정보 분석 사이트)':
              await internalConfirmation.update({
                content: '<https://peld-fleet.com/app>',
                components: [],
              });
              break;

            case '패스파인더':
              await internalConfirmation.update({
                content:
                  '[코퍼레이션 맵](<https://path.catalyst-for-you.com/map/Mw%3D%3D>) \n [대피소](<https://pathfinder.lost-in-w.space/>) \n [패파 가이드](<https://docs.google.com/document/d/1c4m6fGy264yptdWH09dYzPhdeH_fysueLQ3HSpNBy04/edit?usp=sharing>)',
                components: [],
              });
              break;
          }
        } catch (e) {
          await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
          console.error(e);
        }
        break;

      case '서드파티':
        row1 = new ActionRowBuilder().addComponents(thirdparty1, thirdparty2, thirdparty3);
        internalResponse = await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1],
        });
        try {
          internalConfirmation = await internalResponse.awaitMessageComponent({
            time: 30_000,
          });
          switch (internalConfirmation.customId) {
            case 'eve-o-preview':
              await internalConfirmation.update({
                content: '<https://github.com/Proopai/eve-o-preview/releases>',
                components: [],
              });
              break;

            case '경보기':
              await internalConfirmation.update({
                content: `-외부에 유출 금지
                  제작자 : Apple Takoyaki
                  경보기 포톤 UI 감지되게 업뎃해뒀읍니다
                  경보기: <https://drive.google.com/drive/folders/1HPtLMSrRZ5wprsNi6G3CNLp-nfjUfgvI?usp=share_link>
                  아이콘 추출기: <https://drive.google.com/drive/folders/1J32B_de90CL4cIQN5DNi9wX20QCl3Me1?usp=share_link>
                  UI 사이즈 90%랑 100%만 감지되게 해놨으니까 110% 이상 쓰거나 다른 색깔 쓰는 사람은 게임 화면 캡쳐해서 아이콘 추출기로 png 따고 경보기에 추가하면 됩니다.
                  아이콘 1개 체크해두면 UI 사이즈별로 5개 감지하는거라 전보다는 CPU 많이 잡아먹을듯
                  경보기 가이드 : <https://docs.google.com/document/d/18tsbB1xfifzIBe5G2AtBBVE2bWR6ILOINkPOZ67vFIk/edit?usp=sharing>`,
                components: [],
              });
              break;

            case 'pyfa':
              await internalConfirmation.update({
                content: `[pyfa 사용법](<https://docs.google.com/document/d/15RuYqdmeZK9Q6Ze23wroOzwZdcz9Tjn5g-44CxPCX8A/edit#heading=h.pz2bgedg93fz>) \n [현재 최신 업데이트] (<https://github.com/pyfa-org/Pyfa/releases>)`,
                components: [],
              });
              break;
          }
        } catch (e) {
          await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
          console.error(e);
        }
        break;

      case '기타':
        row1 = new ActionRowBuilder().addComponents(etc1);
        internalResponse = await confirmation.update({
          content: `${confirmation.customId}에 대해 알려드릴게요!`,
          components: [row1],
        });
        try {
          internalConfirmation = await internalResponse.awaitMessageComponent({
            time: 30_000,
          });
          switch (internalConfirmation.customId) {
            case '시그니처번역기':
              await internalConfirmation.update({
                content: `<https://drive.google.com/drive/folders/1Q4xzipEylVu3aX137Px0aVk61q7wbg3F?usp=sharing> \n 사용법은 프로빙창에서 복사 후 붙여넣기`,
                components: [],
              });
              break;
          }
        } catch (e) {
          await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
          console.error(e);
        }
        break;
    }
  } catch (e) {
    await interaction.editReply({ content: '30초동안 동작이 없습니다. 종료합니다.', components: [] });
    console.error(e);
  }
}
