import dotenv from 'dotenv';
import getAccessToken from './getAccessToken.js';
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
      throw new Error(`getStructureFuel status 에러코드: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('getStructureFuel에서 에러 발생:', error);
    return null;
  }
};
