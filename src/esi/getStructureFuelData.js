import dotenv from 'dotenv';
import getAccessToken from './getAccessToken.js';
import getCustomError from '../errors/index.js';
const { esiRequestError } = await getCustomError();
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
      console.error(response);
      throw new esiRequestError(
        response.status,
        `연료량을 가져오기가 실패했습니다 \n getStructureFuel 에러전문은 서버콘솔에서 확인해주세요`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('getStructureFuel에서 에러 발생:', error);
    return null;
  }
};
