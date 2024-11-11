//디스코드의 client 객체를 저장 & 반환하는 역할을 하는 스페이스
//추후 동작 제어나 intent추가,변형 등을 자유롭게 할 수 있도록 확장성을 고려해 추가함
let client;
export const setClientInstance = discordInstance => {
  try {
    client = discordInstance;
  } catch (error) {
    console.error('discord 객체를 저장하는 과정에서 문제가 발생했습니다', error);
  }
};

export const getClientInstance = () => {
  if (!client) {
    console.error('discord객체를 저장하지 않은 상태에서 사용하려고 했습니다');
    return;
  }
  return client;
};
