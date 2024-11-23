/**
 * 이 파일은 버튼을 눌렀을때 그대로 진행할지, 취소할지 추가로 확인하는 버튼이 들어있는 Action Row에 대한 코드입니다.
 */

import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

const cancelButton = new ButtonBuilder().setCustomId('취소').setLabel('취소').setStyle(ButtonStyle.Danger);
const confirmButton = new ButtonBuilder().setCustomId('확인').setLabel('확인').setStyle(ButtonStyle.Secondary);
// 취소, 확인 버튼이 있는 ActionRow 만드는 코드.
const confirmRow = new ActionRowBuilder().addComponents([cancelButton, confirmButton]);

export default confirmRow;
