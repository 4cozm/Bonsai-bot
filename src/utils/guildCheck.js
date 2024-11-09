import dotenv from 'dotenv';
dotenv.config();
const guildCheck = async (guild) => {
    if(guild.id = process.env.GUILD_NUMBER){
        return;
    }else{
        console.error(`서버가 일치하지 않습니다. 서버: ${guild.name}`);
        return;
    }
}

export default guildCheck;