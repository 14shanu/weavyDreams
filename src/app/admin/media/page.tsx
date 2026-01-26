"use client";

import { useState, useEffect } from 'react';

function MissingFileUpload({ file, onUploadSuccess }: { file: any; onUploadSuccess: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const expectedExt = file.path.split('.').pop()?.toLowerCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const uploadedExt = uploadedFile.name.split('.').pop()?.toLowerCase();
      if (uploadedExt !== expectedExt) {
        setMessage(`⚠️ Expected .${expectedExt} file but got .${uploadedExt}`);
        setSelectedFile(null);
        e.target.value = '';
      } else {
        setMessage('');
        setSelectedFile(uploadedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('⚠️ Please select a file');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('targetPath', file.path);
    
    try {
      const res = await fetch('/api/admin/media/upload-missing', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Uploaded successfully!');
        setTimeout(() => {
          onUploadSuccess();
        }, 1000);
      } else {
        setMessage(`❌ ${data.error || 'Failed to upload'}`);
      }
    } catch (error) {
      setMessage('❌ Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-red-200 bg-red-50 rounded-lg p-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="font-mono text-sm text-red-900">{file.path}</div>
          <div className="text-sm text-gray-600 mt-1">Used in: {file.usedIn}</div>
          <div className="text-xs text-purple-600 mt-1">Required: .{expectedExt} file</div>
        </div>
        <div className="flex gap-2 items-center">
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap">
            Choose File
            <input
              type="file"
              accept={`.${expectedExt}`}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {selectedFile && <span className="text-sm text-gray-600">{selectedFile.name}</span>}
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
      {message && (
        <div className={`mt-2 text-sm font-medium ${
          message.includes('✅') ? 'text-green-600' : 
          message.includes('⚠️') ? 'text-orange-600' : 'text-red-600'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default function MediaManagerPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'missing'>('missing');
  const [category, setCategory] = useState('services');
  const [files, setFiles] = useState<any[]>([]);
  const [missingFiles, setMissingFiles] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'library') loadFiles();
    if (activeTab === 'missing') scanMissingFiles();
  }, [activeTab]);

  const loadFiles = async () => {
    const res = await fetch('/api/admin/media/list');
    const data = await res.json();
    setFiles(data.files || []);
  };

  const scanMissingFiles = async () => {
    const res = await fetch('/api/admin/media/scan');
    const data = await res.json();
    setMissingFiles(data);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('File uploaded successfully!');
        e.currentTarget.reset();
        if (activeTab === 'library') loadFiles();
        if (activeTab === 'missing') scanMissingFiles();
      } else {
        setMessage('Failed to upload file');
      }
    } catch (error) {
      setMessage('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = async (filePath: string) => {
    const isVideo = filePath.includes('/videos/');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = isVideo ? 'video/*' : 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!confirm(`Replace ${filePath.split('/').pop()} with ${file.name}?`)) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetPath', filePath);

      try {
        const res = await fetch('/api/admin/media/upload-missing', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          setMessage('File replaced successfully!');
          loadFiles();
        } else {
          setMessage('Failed to replace file');
        }
      } catch (error) {
        setMessage('Error replacing file');
      }
    };
    input.click();
  };

  const handleDelete = async (filePath: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const res = await fetch('/api/admin/media/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }),
      });

      if (res.ok) {
        setMessage('File deleted successfully!');
        loadFiles();
      } else {
        setMessage('Failed to delete file');
      }
    } catch (error) {
      setMessage('Error deleting file');
    }
  };

  const handleRename = async (oldPath: string) => {
    const newName = prompt('Enter new filename:', oldPath.split('/').pop());
    if (!newName) return;

    try {
      const res = await fetch('/api/admin/media/rename', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPath, newName }),
      });

      if (res.ok) {
        setMessage('File renamed successfully!');
        loadFiles();
      } else {
        setMessage('Failed to rename file');
      }
    } catch (error) {
      setMessage('Error renaming file');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Manager</h1>
        <p className="text-gray-600">Upload, manage, and track media files</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('missing')}
          className={`px-6 py-3 font-semibold ${activeTab === 'missing' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          ⚠️ Missing Files {missingFiles.missingFiles > 0 && `(${missingFiles.missingFiles})`}
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 font-semibold ${activeTab === 'upload' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          📤 Upload
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-6 py-3 font-semibold ${activeTab === 'library' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          🖼️ Library ({files.length})
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* Missing Files Tab */}
      {activeTab === 'missing' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Missing Files Report</h2>
            <p className="text-sm text-gray-600">
              Total: {missingFiles.totalFiles} | Existing: {missingFiles.existingFiles} | Missing: {missingFiles.missingFiles}
            </p>
          </div>

          {missingFiles.missing?.length > 0 ? (
            <div className="space-y-3">
              {missingFiles.missing.map((file: any, index: number) => (
                <MissingFileUpload key={index} file={file} onUploadSuccess={() => scanMissingFiles()} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              ✅ All files exist! No missing files found.
            </div>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="services">Services</option>
                <option value="events">Events</option>
                <option value="packages">Packages</option>
                <option value="blog">Blog</option>
                <option value="portfolio">Portfolio</option>
                <option value="site">Site</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
              <input
                type="file"
                name="file"
                accept="image/*,video/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Supported: Images (JPG, PNG, WebP, SVG) | Videos (MP4, WebM) | Max: 50MB</p>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>
        </div>
      )}

      {/* Library Tab */}
      {activeTab === 'library' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.path}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{file.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleReplace(file.path)}
                      className="text-green-600 hover:text-green-900 font-medium"
                    >
                      Replace
                    </button>
                    <button
                      onClick={() => handleRename(file.path)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Rename
                    </button>
                    <button
                      onClick={() => handleDelete(file.path)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
