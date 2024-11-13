//모든 에러는 customError을 상속해서 만들어주셔야 알림이 제대로 발송됩니다

class customError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; //에러 이름은 자동 생성
    Error.captureStackTrace(this, this.constructor);
    this.sendToDiscord();
  }

  async sendToDiscord() {
    try {
      await fetch(process.env.DISCORD_404_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**${this.name}**: ${this.message}\n\`\`\`${this.stack}\`\`\``,
        }),
      });
    } catch (error) {
      console.error('Webhook 전송 실패:', error);
    }
  }
}

export default customError;
