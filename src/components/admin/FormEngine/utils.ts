export function detectFieldType(key: string, value: any): string {
  // Boolean
  if (typeof value === 'boolean') return 'checkbox';
  
  // Number
  if (typeof value === 'number') return 'number';
  
  // Array
  if (Array.isArray(value)) return 'array';
  
  // Object (nested)
  if (typeof value === 'object' && value !== null) return 'object';
  
  // String type detection
  if (typeof value === 'string') {
    const lowerKey = key.toLowerCase();
    
    // Email
    if (lowerKey.includes('email')) return 'email';
    
    // URL
    if (lowerKey.includes('url') || lowerKey.includes('link') || lowerKey.includes('href')) return 'url';
    
    // Phone
    if (lowerKey.includes('phone') || lowerKey.includes('tel')) return 'tel';
    
    // Color
    if (lowerKey.includes('color')) return 'color';
    
    // Date
    if (lowerKey.includes('date') || lowerKey.includes('publishedat') || lowerKey.includes('createdat')) return 'date';
    
    // Long text (textarea)
    if (value.length > 100 || lowerKey.includes('description') || lowerKey.includes('content') || lowerKey.includes('excerpt')) {
      return 'textarea';
    }
    
    // Default text
    return 'text';
  }
  
  return 'text';
}

export function formatLabel(key: string): string {
  // Handle nested keys (e.g., "seo.title" -> "SEO Title")
  const parts = key.split('.');
  const lastPart = parts[parts.length - 1];
  
  // Convert camelCase or snake_case to Title Case
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

export function setNestedValue(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
  return obj;
}
