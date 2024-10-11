import { resolve } from 'path';
import { createReadStream } from 'fs';
import crypto from 'crypto';

export async function hash(filePath, currentDir) {
    const fullPath = resolve(currentDir, filePath);
    const hash = crypto.createHash('sha256');
    const stream = createReadStream(fullPath);
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => console.log(hash.digest('hex')));
}
