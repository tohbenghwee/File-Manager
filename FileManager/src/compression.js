import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';

// Compression/Decompression
export async function compress(filePath, destPath, currentDir) {
    const srcFullPath = resolve(currentDir, filePath);
    const destFullPath = resolve(currentDir, destPath);
    const readStream = createReadStream(srcFullPath);
    const writeStream = createWriteStream(destFullPath);
    const brotli = zlib.createBrotliCompress();
    readStream.pipe(brotli).pipe(writeStream);
}

export async function decompress(filePath, destPath, currentDir) {
    const srcFullPath = resolve(currentDir, filePath);
    const destFullPath = resolve(currentDir, destPath);
    const readStream = createReadStream(srcFullPath);
    const writeStream = createWriteStream(destFullPath);
    const brotli = zlib.createBrotliDecompress();
    readStream.pipe(brotli).pipe(writeStream);
}
