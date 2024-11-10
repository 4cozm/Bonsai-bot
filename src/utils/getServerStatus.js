const getServerStatus = async () => {
  const response = await fetch('https://esi.evetech.net/latest/status/?datasource=tranquility');
  if (!response.ok) {
    console.log('ESI가 응답하지 않습니다', response.status);
  }
  const serverStat = await response.json();
  return serverStat;
};

export default getServerStatus;
