import dotenv from 'dotenv';
import getAccessToken from './getAccessToken.js';
import getCustomError from '../errors/index.js';
const { esiRequestError } = getCustomError();
dotenv.config();

export const getStructureFuel = async () => {
  const corporationId = process.env.CATALIST_TOWER_CORP_ID;
  const accessToken = await getAccessToken(process.env.STRUCTURE_OWNER_DISCORD_ID, 'fe in');

  try {
    const response = await fetch(`https://esi.evetech.net/latest/corporations/${corporationId}/structures/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new esiRequestError(
        `연료량을 가져오기가 실패했습니다 \n getStructureFuel status 에러코드: ${response.status} \n 에러전문 ${response}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('getStructureFuel에서 에러 발생:', error);
    return null;
  }
};
