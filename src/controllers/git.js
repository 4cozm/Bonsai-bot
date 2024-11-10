import dotenv from 'dotenv';
dotenv.config();

const githubHook = async (req, res) => {
  try {
    if (!req.body || !req.body.pull_request) {
      return res.status(400).send('잘못된 요청입니다. pull_request가 없습니다.');
    } else if (pr.base.ref != 'dev') {
      return res.status(200).send('이벤트가 발생했지만 dev 브랜치 메세지가 아닙니다');
    }
    const pr = req.body.pull_request;
    const action = req.body.action;
    const merged = pr.merged;

    let message = null;

    if (action === 'opened' || action === 'synchronize' || action === 'reopened') {
      message = {
        content: `주인님 PR 요청이 들어왔어요 전 자유에요!: [${pr.title}](${pr.html_url})\nPR 요청자: ${pr.user.login}\n상태: ${action}`,
      };
    } else if (action === 'closed' && merged) {
      message = {
        content: `주인님 Merge가 완료 되었어요 이제 전 자유에요!: [${pr.title}](${pr.html_url})\nPR 요청자: ${pr.user.login}\n상태: PR이 머지되었습니다.`,
      };
    }
    await fetch(process.env.DISCORD_404_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    res.status(200).send('git 메시지가 성공적으로 전송되었습니다.');
    console.log('git 메세지 전송 완료');
  } catch (error) {
    console.error('DISCORD로 PR 메세지 전송 실패', error);
    res.status(500).send('서버 오류', error);
  }
};

export default githubHook;
