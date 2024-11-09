const getServerStatus = async() => {
  const response = await fetch('https://esi.evetech.net/latest/status/?datasource=tranquility');
        if (!response.ok) {
          console.log('ESI가 응답하지 않습니다', response.status);
        }
        // 서버 상태 정보 .json으로 바꾸기
        // 함수 내의 변수와 구분하기 위해 변수 이름을 조금 다르게 씀
        const serverStat = await response.json();
        return serverStat;
}

export default getServerStatus;