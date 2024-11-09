import fs from 'fs';
import path from 'path';

import { pathToFileURL } from 'url';

const createCommands = async (commandCollection, __dirname) => {
    const commandFoldersPath = path.join(__dirname, 'src', 'commands');
    const commandFolders = fs.readdirSync(commandFoldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path.join(commandFoldersPath, folder);
    const commandsURL = pathToFileURL(commandsPath); 
        const commandFiles = fs.readdirSync(commandsURL).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
        const fileURL = pathToFileURL(filePath);
            const command = await import(fileURL);
            // Collection 객체에 커맨드 추가
            if ('data' in command && 'execute' in command) {
                commandCollection.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
};

export default createCommands;