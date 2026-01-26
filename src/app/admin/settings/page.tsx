import { readJSONFile } from '@/lib/admin/file-system';
import { FormEngine } from '@/components/admin/FormEngine';

export default async function SettingsPage() {
  const siteConfig = await readJSONFile<any>('site-config.json');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Settings</h1>
        <p className="text-gray-600">Manage your site configuration</p>
      </div>

      <FormEngine
        data={siteConfig}
        apiEndpoint="/api/admin/settings"
      />
    </div>
  );
}
