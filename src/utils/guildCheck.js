const guildCheck = async (guild) => {
    if(guild === process.env.GUILD_NUMBERS){
        return;
    }else{
        console.error(`올바르지 않은 서버 ${guild} 입니다!`);
    }
}

export default guildCheck;