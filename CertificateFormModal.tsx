
import React, { useState, useEffect } from 'react';
import { X, Save, Upload, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateFormModalProps {
  initialData?: Certificate | null;
  onClose: () => void;
  onSave: (cert: Certificate) => void;
}

const CertificateFormModal: React.FC<CertificateFormModalProps> = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    image: '',
    description: '',
    category: 'Technical' as const,
    skills: ''
  });

  const [error, setError] = useState('');

  // Initialize form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        issuer: initialData.issuer,
        issueDate: initialData.issueDate,
        // Fix: Access credentialUrl and description (now in updated interface)
        credentialUrl: initialData.credentialUrl || '',
        // Fix: Use imageUrl instead of image
        image: initialData.imageUrl || '',
        description: initialData.description || '',
        category: (initialData.category as any) || 'Technical',
        skills: initialData.skills.join(', ')
      });
    }
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError('Image size too large. Please choose an image under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.issuer || !formData.issueDate) {
      setError('Please fill in all required fields (Title, Issuer, Date).');
      return;
    }

    const certificate: Certificate = {
      // Fix: Mixed string/number ID is allowed in updated interface
      id: initialData?.id || Date.now(),
      title: formData.title,
      issuer: formData.issuer,
      issueDate: formData.issueDate,
      credentialUrl: formData.credentialUrl || '#',
      // Fix: Maintain existing pdfUrl or use credentialUrl
      pdfUrl: initialData?.pdfUrl || formData.credentialUrl || '#', 
      // Fix: Use imageUrl instead of image
      imageUrl: formData.image || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
      description: formData.description || 'No description provided.',
      category: formData.category,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      // Fix: Use verificationCode instead of verificationId
      verificationCode: initialData?.verificationCode || ''
    };

    onSave(certificate);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {initialData ? 'Edit Certificate' : 'Add New Certificate'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Certificate Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
              placeholder="e.g. AWS Certified Solutions Architect"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issuer *</label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
                placeholder="e.g. Amazon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issue Date *</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
              >
                <option value="Technical">Technical</option>
                <option value="Professional">Professional</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
            
            {/* Image Handling: URL or File Upload */}
            <div className="space-y-2">
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Certificate Image</label>
               
               <div className="flex gap-2">
                 <div className="relative flex-grow">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full pl-9 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white text-sm"
                      placeholder="Paste Image URL..."
                    />
                    <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                 </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 uppercase font-bold">OR</span>
                  <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors border border-slate-200 dark:border-slate-700 flex-grow text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Upload className="h-4 w-4" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
               </div>

               {formData.image && (
                 <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                 </div>
               )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Credential URL</label>
            <input
              type="text"
              name="credentialUrl"
              value={formData.credentialUrl}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
              placeholder="Link to verify..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
              placeholder="React, Python, Data Analysis..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white resize-none"
              placeholder="Brief description of what you learned..."
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <Save className="h-4 w-4" /> 
              {initialData ? 'Update Certificate' : 'Save Certificate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateFormModal;
