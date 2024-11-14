/**
 * /5클조업 slash command
 * 5클조업 시간 측정, 분배, 세금 측정 및 기록.
 */

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('5클조업')
  .setDescription('5클조업 관련한 유용한 기능을 제공합니다.')
  .addSubcommand(subcommand => subcommand.setName('시작').setDescription('5클조업 시작 시각을 기록합니다.'))
  .addSubcommand(subcommand => subcommand.setName('종료').setDescription('5클조업 종료 시각을 기록합니다'))
  .addSubcommand(subcommand => subcommand.setName('취소').setDescription('진행중이던 5클조업 측정을 취소합니다.'))
  .addSubcommand(subcommand => subcommand.setName('통계').setDescription('5클조업 통계를 보여줍니다.'));

export async function execute(interaction) {}
