//DT 이후 discord 웹 후크로 알림을 보내는 기능

import cron from 'node-cron';
import dotenv from 'dotenv';
import fs from 'fs';
import readline from 'readline';
import { error } from 'console';

dotenv.config();

let version;
let message;
const versionPath = 'downTime.txt';

//버전파일 존재여부 체크
function versionFileCheck(){
  fs.access(versionPath, fs.constants.F_OK, e => {
    if(e){
      console.log('파일이 존재하지 않습니다.');
      fs.open(versionPath, 'w', (e,fd) => {
        if(e){
          console.log('파일 생성중 오류가 발생했습니다.');
        }else{
          console.log(`${versionPath}파일이 생성되었습니다!`);
        }
        fs.close(fd, () => {          
        })
      })
    }
  })
}

//서버 버전체크 함수
function versionCheck(){
  let lastline;
  const stream = fs.createReadStream(versionPath, 'utf8')
  const rl = readline.createInterface({
    input:stream,
  })

  rl.on('line', line => {
    lastline = line;
  })

  rl.on('close', ()=> {
    version = lastline;
    //업데이트 확인
    if (!version) {
      //서버 버전이 없는 경우
      message = {
        content: `서버 ON , 서버 버전을 확인 할 수 없습니다.${serverStatus.server_version}버전을 최신 버전으로 설정 했습니다.`,
      };
      version = serverStatus.server_version;
      //새로 저장된 버전 파일에 추가
      fs.appendFile(versionPath, '\n' + version.toString(), e => {
        if(e){
          console.error(e);
        }
      })
    } else if (version < serverStatus.server_version) {
      //서버 버전이 다른 경우
      message = {
        content: '서버 ON, 버전이 업데이트 되었습니다. 미꾸라지 유저는 주의해주세요',
      };
      version = serverStatus.server_version;
      //파일에 버전 내용 추가
      fs.appendFile(versionPath, '\n' + version.toString(), e => {
        if(e){
          console.error(e);
        }
      })
    } else {
      message = {
        //별다른 이슈가 없을때,서버 오픈 메세지
        content: '서버 ON',
      };
    }
    console.log(`${version}이 서버 버전으로 설정되었습니다.`)
  })
}

const downTimeTracker = () => {
  console.log('DT 타이머 등록완료');
  cron.schedule('0 11 * * *', async () => {
    console.log('DT 타이머 실행');
    versionFileCheck(); // 버전 파일 존재 여부 체크
    try {
      const interval = setInterval(async () => {
        const response = await fetch('https://esi.evetech.net/latest/status/?datasource=tranquility');

        if (!response.ok) {
          console.log('ESI가 응답하지 않습니다', response.status);
        }
        const serverStatus = await response.json();

        const startTime = new Date(serverStatus.start_time); //이브에서 받아온 ISO 방식의 문자열을 Date 객체로 변환
        const currentTime = new Date(Date.now()); //현재 시간 (밀리초)를 날짜 객체로 변환

        const currentDate = currentTime.getDate(); // 날짜 추출
        const startTimeDate = startTime.getDate(); // 날짜 추출

        if (currentDate === startTimeDate) {
          //서버 열린상태 확인됬을때 코드
          versionCheck(); // 서버 버전 체크
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
