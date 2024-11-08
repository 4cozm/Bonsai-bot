//DT 이후 discord 웹 후크로 알림을 보내는 기능

import cron from 'node-cron';
import dotenv from 'dotenv';
import getServerStatus from './utils/getServerStatus.js';

dotenv.config();

let message;

const downTimeTracker = () => {
  console.log('DT 타이머 등록완료');
  cron.schedule('0 11 * * *', async () => {
    console.log('DT 타이머 실행');
    try {
      const interval = setInterval(async () => {
        let serverStatus = getServerStatus();
        const startTime = new Date(serverStatus.start_time); //이브에서 받아온 ISO 방식의 문자열을 Date 객체로 변환
        const currentTime = new Date(Date.now()); //현재 시간 (밀리초)를 날짜 객체로 변환

        const currentDate = currentTime.getDate(); // 날짜 추출
        const startTimeDate = startTime.getDate(); // 날짜 추출

        if (currentDate === startTimeDate) {
          //서버 열린상태 확인됬을때 코드

          //업데이트 확인
          if (!version) {
            //서버 버전이 없는 경우
            message = {
              //서버 버전이 다른 경우
              content: `서버 ON , 서버 버전을 확인 할 수 없습니다.${serverStatus.server_version}버전을 최신 버전으로 설정 했습니다.`,
            };
            version = serverStatus.server_version;
          } else if (version < serverStatus.server_version) {
            message = {
              //서버 버전이 다른 경우
              content: '서버 ON, 버전이 업데이트 되었습니다. 미꾸라지 유저는 주의해주세요',
            };
            version = serverStatus.server_version;
          } else {
            message = {
              //별다른 이슈가 없을때,서버 오픈 메세지
              content: '서버 ON',
            };
          }
          fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          }).then(response => {
            if (!response.ok) {
              throw new Error('Webhook로 메세지를 보내지 못했습니다', response.status);
            }
            console.log('서버 오픈 메세지 전송 완료');
          });
          clearInterval(interval); //30초마다 재실행 되는 타이머를 정지
        }
      }, 30000); //30초 마다 재실행
    } catch (error) {
      console.error(error);
    }
  });
};

export default downTimeTracker;
