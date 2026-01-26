"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormField from './FormField';
import { setNestedValue } from './utils';

interface FormEngineProps {
  data: any;
  apiEndpoint?: string;
  redirectTo?: string;
  title?: string;
}

export default function FormEngine({ 
  data, 
  apiEndpoint,
  redirectTo,
  title = "Edit"
}: FormEngineProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(data);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev: any) => {
      const newData = { ...prev };
      setNestedValue(newData, key, value);
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      if (apiEndpoint) {
        const res = await fetch(apiEndpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Failed to save');
      }

      setMessage('Saved successfully!');
      
      if (redirectTo) {
        setTimeout(() => router.push(redirectTo), 1500);
      }
    } catch (error) {
      setMessage('Error saving data');
    } finally {
      setSaving(false);
    }
  };

  const renderFields = (obj: any, prefix = '') => {
    return Object.keys(obj).map((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      
      return (
        <FormField
          key={fullKey}
          fieldKey={fullKey}
          value={value}
          onChange={handleFieldChange}
          data={formData}
        />
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      {renderFields(formData)}

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {redirectTo && (
          <button
            type="button"
            onClick={() => router.push(redirectTo)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
