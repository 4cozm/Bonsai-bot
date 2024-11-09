import dotenv from 'dotenv';
dotenv.config();
const guildCheck = async (guild) => {
    if(guild.id = process.env.GUILDS_NUMBER){
        return;
    }else{
        return `서버가 일치하지 않습니다. 서버: ${guild.name}`;
    }
}

export default guildCheck;