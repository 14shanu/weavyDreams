"use client";

import { detectFieldType, formatLabel, getNestedValue } from './utils';

interface FormFieldProps {
  fieldKey: string;
  value: any;
  onChange: (key: string, value: any) => void;
  data: any;
}

export default function FormField({ fieldKey, value, onChange, data }: FormFieldProps) {
  const fieldType = detectFieldType(fieldKey, value);
  const label = formatLabel(fieldKey);
  
  const baseClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500";

  // Handle nested objects
  if (fieldType === 'object') {
    return (
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{label}</h3>
        <div className="space-y-4 pl-4">
          {Object.keys(value).map((nestedKey) => (
            <FormField
              key={`${fieldKey}.${nestedKey}`}
              fieldKey={`${fieldKey}.${nestedKey}`}
              value={value[nestedKey]}
              onChange={onChange}
              data={data}
            />
          ))}
        </div>
      </div>
    );
  }

  // Handle arrays
  if (fieldType === 'array') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="space-y-2">
          {value.map((item: any, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={typeof item === 'string' ? item : JSON.stringify(item)}
                onChange={(e) => {
                  const newArray = [...value];
                  newArray[index] = e.target.value;
                  onChange(fieldKey, newArray);
                }}
                className={baseClasses}
              />
              <button
                type="button"
                onClick={() => {
                  const newArray = value.filter((_: any, i: number) => i !== index);
                  onChange(fieldKey, newArray);
                }}
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange(fieldKey, [...value, ''])}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            + Add Item
          </button>
        </div>
      </div>
    );
  }

  // Handle checkbox
  if (fieldType === 'checkbox') {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={fieldKey}
          checked={value}
          onChange={(e) => onChange(fieldKey, e.target.checked)}
          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
        />
        <label htmlFor={fieldKey} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
    );
  }

  // Handle textarea
  if (fieldType === 'textarea') {
    return (
      <div className="space-y-2">
        <label htmlFor={fieldKey} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          id={fieldKey}
          value={value || ''}
          onChange={(e) => onChange(fieldKey, e.target.value)}
          rows={4}
          className={baseClasses}
        />
      </div>
    );
  }

  // Handle all other input types
  return (
    <div className="space-y-2">
      <label htmlFor={fieldKey} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {fieldType === 'color' ? (
        <div className="flex gap-3 items-center">
          <input
            id={fieldKey}
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(fieldKey, e.target.value)}
              placeholder="#000000"
              className={baseClasses}
            />
          </div>
          <div 
            className="h-12 w-32 rounded-lg border-2 border-gray-300 flex items-center justify-center font-mono text-sm"
            style={{ backgroundColor: value || '#000000', color: value && parseInt(value.slice(1), 16) > 0xffffff/2 ? '#000' : '#fff' }}
          >
            {value || '#000000'}
          </div>
        </div>
      ) : (
        <input
          id={fieldKey}
          type={fieldType}
          value={value || ''}
          onChange={(e) => {
            const newValue = fieldType === 'number' ? parseFloat(e.target.value) : e.target.value;
            onChange(fieldKey, newValue);
          }}
          className={baseClasses}
        />
      )}
    </div>
  );
}
