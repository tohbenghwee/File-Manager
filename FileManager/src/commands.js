import { up, cd, ls, cat, add, rn, cp, mv, rm } from './file-system.js';
import { hash } from './hash.js';
import { compress, decompress } from './compression.js';
import { os } from './os-info.js'

// Command handler
export async function command(input, currentDir, targetDir) {
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'up':
            return up(currentDir, targetDir);
        case 'cd':
            return cd(args[0], currentDir, targetDir);
        case 'ls':
            return ls(currentDir);
        case 'cat':
            return cat(args[0], currentDir);
        case 'add':
            return add(args[0], currentDir);
        case 'rn':
            return rn(args[0], args[1], currentDir);
        case 'cp':
            return cp(args[0], args[1], currentDir);
        case 'mv':
            return mv(args[0], args[1], currentDir);
        case 'rm':
            return rm(args[0], currentDir);
        case 'os':
            return os(args[0]);
        case 'hash':
            return hash(args[0], currentDir);
        case 'compress':
            return compress(args[0], args[1], currentDir);
        case 'decompress':
            return decompress(args[0], args[1], currentDir);
        default:
            console.error('Invalid command');
    }
}
