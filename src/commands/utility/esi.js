import { SlashCommandBuilder } from 'discord.js';
import { addReplyMessage, createState, getMessageChannelByState } from '../../esi/stateManager.js';
import getCustomError from '../../errors/index.js';
import { getMessageInstanceByState, deleteState } from '../../esi/stateManager.js';
import { getClientInstance } from '../../utils/discordClientManger.js';

const { dataNotFoundError } = await getCustomError();

/**
 * 메세지를 보낸 사람의 discord ID를 esi.js에 전달함
 * esi.js에서는 discord ID{state:~~~.expire:102120}식으로 데이터를 저장 한뒤 esi 가입 링크를 return 함
 */
export const data = new SlashCommandBuilder()
  .setName('esi')
  .setDescription('캣포유 ESI와 관련한 동작을 실행합니다.')
  .addSubcommand(subcommand => subcommand.setName('등록').setDescription('캣포유 ESI와 연동합니다.'))
  .addSubcommand(subcommand => subcommand.setName('조회').setDescription('자신의 캐릭터를 조회합니다.'));
export async function execute(interaction) {
  switch (interaction.options.getSubcommand) {
    case '등록':
      if (!interaction.user.id) {
        throw new dataNotFoundError(
          '메세지에서 discord id값을 추출하지 못했습니다. 전달 받은 값:',
          interaction.user.id
        );
      }
      if (!interaction.id) {
        throw new dataNotFoundError('discord 메세지의 ID값을 추출하지 못했습니다. 전달 받은 값:', interaction.id);
      }
      const state = createState(interaction.user.id, interaction.channelId);
      const replyMessage = await interaction.reply({
        content: `고유 번호가 포함되어 있습니다. 다른 사람에게 링크를 공유하지 말아주세요!\n\n[>>ESI 등록 링크<<](http://cat4u.store:3000/esi/signUp?state=${state})\n`,
        ephemeral: true,
      });
      addReplyMessage(state, replyMessage); //메세지 객체를 추가로 저장함 -> 나중에 댓글로 성공 여부를 알려주기 위함임 데이터 구조는 notion 참고
      break;

    case '조회':
      break;
  }
}

export const updateRegistrationMessage = async (state, message) => {
  try {
    const client = getClientInstance();
    const messageId = getMessageInstanceByState(state);

    // 기존 메시지 삭제
    await messageId.delete();
    const channelId = getMessageChannelByState(state);
    const channel = await client.channels.fetch(channelId);

    await channel.send({ content: message });
    deleteState(state);
  } catch (error) {
    console.error('updateRegistrationMessage에서 오류 발생', error);
  }
};
