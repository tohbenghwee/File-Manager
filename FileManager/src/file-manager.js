import readline from 'readline';
import os from 'os';
import { command } from './commands.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

const homeDir = os.homedir();
let currentDir = homeDir;

// Welcome message
console.log(`Welcome to the File Manager, ${username}!`);
printCurrentDir();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Main loop
rl.on('line', async (input) => {
    const inCommand = input.trim();

    if (inCommand === '.exit') {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        rl.close();
        return;
    }

    try {
        await command(inCommand, currentDir, updateCurrentDir);
    } catch (error) {
        console.error('Operation failed');
    }

    printCurrentDir();
});

// Exit handler
rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
});

function updateCurrentDir(newDir) {
    currentDir = newDir;
}

function printCurrentDir() {
    console.log(`You are currently in ${currentDir}`);
}
