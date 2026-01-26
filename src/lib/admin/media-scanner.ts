import fs from 'fs';
import path from 'path';

interface MissingFile {
  path: string;
  usedIn: string;
  type: string;
  id: string;
  exists: boolean;
}

export async function scanForMissingFiles(): Promise<MissingFile[]> {
  const dataDir = path.join(process.cwd(), 'src/data');
  const publicDir = path.join(process.cwd(), 'public');
  const results: MissingFile[] = [];

  // Helper to check if file exists
  const fileExists = (filePath: string): boolean => {
    const fullPath = path.join(publicDir, filePath);
    return fs.existsSync(fullPath);
  };

  // Helper to extract image paths from object
  const extractImagePaths = (obj: any, prefix = ''): string[] => {
    const paths: string[] = [];
    
    for (const key in obj) {
      const value = obj[key];
      
      // Check for direct image/video/icon/logo fields
      if (typeof value === 'string' && (key.includes('image') || key.includes('icon') || key.includes('logo') || key.includes('poster'))) {
        if (value.startsWith('/images/') || value.startsWith('/videos/') || value.startsWith('/')) {
          paths.push(value);
        }
      }
      // Check for media.items array (new media gallery format)
      else if (key === 'items' && Array.isArray(value)) {
        value.forEach((item: any) => {
          if (item.src && typeof item.src === 'string' && (item.src.startsWith('/images/') || item.src.startsWith('/videos/'))) {
            paths.push(item.src);
          }
          if (item.poster && typeof item.poster === 'string' && item.poster.startsWith('/')) {
            paths.push(item.poster);
          }
        });
      }
      else if (typeof value === 'object' && value !== null) {
        paths.push(...extractImagePaths(value, `${prefix}${key}.`));
      }
    }
    
    return paths;
  };

  // Scan services.json
  try {
    const servicesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'services.json'), 'utf-8'));
    servicesData.services.forEach((service: any) => {
      const imagePaths = extractImagePaths(service);
      imagePaths.forEach((imgPath) => {
        results.push({
          path: imgPath,
          usedIn: `${service.name} (Service)`,
          type: 'service',
          id: service.id,
          exists: fileExists(imgPath),
        });
      });
    });
  } catch (error) {}

  // Scan events.json
  try {
    const eventsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'events.json'), 'utf-8'));
    eventsData.eventTypes.forEach((event: any) => {
      const imagePaths = extractImagePaths(event);
      imagePaths.forEach((imgPath) => {
        results.push({
          path: imgPath,
          usedIn: `${event.name} (Event)`,
          type: 'event',
          id: event.id,
          exists: fileExists(imgPath),
        });
      });
    });
  } catch (error) {}

  // Scan packages.json
  try {
    const packagesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'packages.json'), 'utf-8'));
    packagesData.packages.forEach((pkg: any) => {
      const imagePaths = extractImagePaths(pkg);
      imagePaths.forEach((imgPath) => {
        results.push({
          path: imgPath,
          usedIn: `${pkg.name} (Package)`,
          type: 'package',
          id: pkg.id,
          exists: fileExists(imgPath),
        });
      });
    });
  } catch (error) {}

  // Scan blog.json
  try {
    const blogData = JSON.parse(fs.readFileSync(path.join(dataDir, 'blog.json'), 'utf-8'));
    blogData.posts.forEach((post: any) => {
      const imagePaths = extractImagePaths(post);
      imagePaths.forEach((imgPath) => {
        results.push({
          path: imgPath,
          usedIn: `${post.title} (Blog)`,
          type: 'blog',
          id: post.id,
          exists: fileExists(imgPath),
        });
      });
    });
  } catch (error) {}

  return results;
}

export async function listMediaFiles(): Promise<any[]> {
  const publicDir = path.join(process.cwd(), 'public');
  const files: any[] = [];

  const scanDirectory = (dir: string, category = '') => {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    items.forEach((item) => {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        scanDirectory(fullPath, item.name);
      } else if (item.isFile()) {
        const stats = fs.statSync(fullPath);
        const relativePath = fullPath.replace(path.join(process.cwd(), 'public'), '');
        
        files.push({
          name: item.name,
          path: relativePath,
          category: category || 'root',
          size: stats.size,
          modified: stats.mtime,
        });
      }
    });
  };

  // Scan both images and videos directories
  const imagesDir = path.join(publicDir, 'images');
  const videosDir = path.join(publicDir, 'videos');
  
  scanDirectory(imagesDir);
  scanDirectory(videosDir);
  
  return files;
}
