import { resolve, basename, join } from 'path';
import { promises as fs } from 'fs';
import { createReadStream, createWriteStream } from 'fs';


export async function up(currentDir, updateDir) {
    const parentDir = resolve(currentDir, '..');
    if (parentDir !== currentDir) {
        updateDir(parentDir);
    }
}

export async function cd(dir, currentDir, updateDir) {
    const newDir = resolve(currentDir, dir);
    const stat = await fs.stat(newDir);
    if (stat.isDirectory()) {
        updateDir(newDir);
    } else {
        console.error('Invalid directory');
    }
}

// File operations
export async function ls(currentDir) {
    const files = await fs.readdir(currentDir, { withFileTypes: true });
    files.sort((a, b) => (a.isDirectory() === b.isDirectory() ? a.name.localeCompare(b.name) : a.isDirectory() ? -1 : 1));
    files.forEach(file => console.log(`${file.isDirectory() ? 'DIR' : 'FILE'}\t${file.name}`));
}

export async function cat(filePath, currentDir) {
    const fullPath = resolve(currentDir, filePath);
    const readStream = createReadStream(fullPath, 'utf-8');
    readStream.pipe(process.stdout);
}

export async function add(fileName, currentDir) {
    const filePath = resolve(currentDir, fileName);
    await fs.writeFile(filePath, '');
}

export async function rn(oldPath, newPath, currentDir) {
    const oldFullPath = resolve(currentDir, oldPath);
    const newFullPath = resolve(currentDir, newPath);
    await fs.rename(oldFullPath, newFullPath);
}

export async function cp(srcPath, destDir, currentDir) {
    const srcFullPath = resolve(currentDir, srcPath);
    const destFullPath = resolve(currentDir, join(destDir, basename(srcFullPath)));
    const readStream = createReadStream(srcFullPath);
    const writeStream = createWriteStream(destFullPath);
    readStream.pipe(writeStream);
}

export async function mv(srcPath, destDir, currentDir) {
    await copyFile(srcPath, destDir, currentDir);
    await deleteFile(srcPath, currentDir);
}

export async function rm(filePath, currentDir) {
    const fullPath = resolve(currentDir, filePath);
    await fs.unlink(fullPath);
}
