import { SlashCommandBuilder } from 'discord.js';

/**
 * 메세지를 보낸 사람의 discord ID를 esi.js에 전달함
 * esi.js에서는 discord ID{state:~~~.expire:102120}식으로 데이터를 저장 한뒤 esi 가입 링크를 return 함
 */
export const data = new SlashCommandBuilder()
  .setName('esi등록')
  .setDescription('캣포유 ESI와 연동합니다.다른 사람에게 링크를 공유하지 말아주세요!');
export async function execute(interaction) {
  await interaction.reply({
    contents: '빈칸',
    ephemeral: true,
  });
}

//인증은 1회성,유효기간은 명령어 사용후 5분 이내 까지만 가능
//callback 페이지에 다른 사람에게 링크를 받아 가입 한 경우 즉시 관리자에게 알려달라는 메세지를 넣어야함