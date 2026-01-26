import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

export async function readJSONFile<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function writeJSONFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readPageJSON<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, 'pages', filename);
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

export async function writePageJSON<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, 'pages', filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
