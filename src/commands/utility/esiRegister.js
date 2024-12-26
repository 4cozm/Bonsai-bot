import { SlashCommandBuilder } from 'discord.js';
import { createState } from '../../esi/stateManager.js';
import getCustomError from '../../errors/index.js';
const { dataNotFoundError } = await getCustomError();
/**
 * 메세지를 보낸 사람의 discord ID를 esi.js에 전달함
 * esi.js에서는 discord ID{state:~~~.expire:102120}식으로 데이터를 저장 한뒤 esi 가입 링크를 return 함
 */
export const data = new SlashCommandBuilder().setName('esi등록').setDescription('캣포유 ESI와 연동합니다.');
export async function execute(interaction) {
  if (!interaction.user.id) {
    throw new dataNotFoundError('메세지에서 discord id값을 추출하지 못했습니다. 전달 받은 값:', interaction.user.id);
  }
  if (!interaction.id) {
    throw new dataNotFoundError('discord 메세지의 ID값을 추출하지 못했습니다. 전달 받은 값:', interaction.id);
  }
  const state = createState(interaction.user.id, interaction.id);
  await interaction.reply({
    content: `고유 번호가 포함되어 있습니다. 다른 사람에게 링크를 공유하지 말아주세요!\n\n[ESI 등록 링크](http://3.37.49.37:3000/esi/signUp?state=${state})`,
    ephemeral: true,
  });
}

//인증은 1회성,유효기간은 명령어 사용후 5분 이내 까지만 가능
//callback 페이지에 다른 사람에게 링크를 받아 가입 한 경우 즉시 관리자에게 알려달라는 메세지를 넣어야함
//등록 결과를 대기하고 완료 되면 메세지를 수정해야할듯!
