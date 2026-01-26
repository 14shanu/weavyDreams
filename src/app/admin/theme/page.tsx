import { readJSONFile } from '@/lib/admin/file-system';
import { FormEngine } from '@/components/admin/FormEngine';

export default async function ThemeAdminPage() {
  const theme = await readJSONFile<any>('theme.json');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Theme Customizer</h1>
        <p className="text-gray-600">Customize colors, fonts, and visual settings</p>
      </div>

      <FormEngine
        data={theme}
        apiEndpoint="/api/admin/theme"
      />
    </div>
  );
}
