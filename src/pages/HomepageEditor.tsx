import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { fetchHomepageSettings, updateHomepageSettings, uploadCV } from '@/lib/supabase-data';
import { useAuth } from '@/contexts/AuthContext';

const HomepageEditor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [homepageData, setHomepageData] = useState<any>(null);
  const [formData, setFormData] = useState({
    banner_title: '',
    banner_subtitle: '',
    banner_description: ''
  });
  const [loading, setLoading] = useState(true);
  const [cvUploading, setCvUploading] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadHomepageSettings();
  }, [user, navigate]);

  // Sync form data when homepageData changes
  useEffect(() => {
    if (homepageData) {
      setFormData({
        banner_title: homepageData.banner_title || '',
        banner_subtitle: homepageData.banner_subtitle || '',
        banner_description: homepageData.banner_description || ''
      });
    }
  }, [homepageData]);

  const loadHomepageSettings = async () => {
    try {
      const data = await fetchHomepageSettings();
      console.log('Loaded homepage data:', data);
      setHomepageData(data);
      // Initialize form data with loaded data
      if (data) {
        const newFormData = {
          banner_title: data.banner_title || '',
          banner_subtitle: data.banner_subtitle || '',
          banner_description: data.banner_description || ''
        };
        console.log('Setting form data to:', newFormData);
        setFormData(newFormData);
      }
    } catch (error) {
      console.error('Error loading homepage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Form field ${name} changed to:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Submitting homepage update:', formData);

    try {
      const result = await updateHomepageSettings(formData);
      console.log('Update result:', result);
      if (result) {
        setHomepageData(result);
        // Also update the form data to match the saved data
        setFormData({
          banner_title: result.banner_title || '',
          banner_subtitle: result.banner_subtitle || '',
          banner_description: result.banner_description || ''
        });
        toast({ title: "Homepage settings updated successfully!" });
      } else {
        throw new Error('Failed to update homepage settings');
      }
    } catch (error) {
      console.error('Error updating homepage:', error);
      toast({ 
        title: "Error", 
        description: "Failed to update homepage settings: " + (error as Error).message,
        variant: "destructive" 
      });
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log('Selected file for upload:', file);
    if (file.type !== 'application/pdf') {
      toast({ 
        title: "Error", 
        description: "Please upload a PDF file",
        variant: "destructive" 
      });
      return;
    }

    setCvUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('cv', file);
      
      console.log('Uploading CV...');
      const result = await uploadCV(formData);
      console.log('CV upload result:', result);
      if (result) {
        // Refresh the homepage data to show the updated CV path
        await loadHomepageSettings();
        toast({ title: "CV uploaded successfully!" });
      } else {
        throw new Error('Failed to upload CV');
      }
    } catch (error) {
      console.error('Error uploading CV:', error);
      toast({ 
        title: "Error", 
        description: "Failed to upload CV: " + (error as Error).message,
        variant: "destructive" 
      });
    } finally {
      setCvUploading(false);
      // Reset the file input
      e.target.value = '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">Edit Homepage</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Banner Content Card */}
          <Card>
            <CardHeader>
              <CardTitle>Banner Content</CardTitle>
              <CardDescription>
                Update the content displayed in the homepage banner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="banner_title">Banner Title</Label>
                  <Input
                    id="banner_title"
                    name="banner_title"
                    value={formData.banner_title}
                    onChange={handleInputChange}
                    placeholder="Your main title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                  <Input
                    id="banner_subtitle"
                    name="banner_subtitle"
                    value={formData.banner_subtitle}
                    onChange={handleInputChange}
                    placeholder="Your subtitle"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="banner_description">Banner Description</Label>
                  <Textarea
                    id="banner_description"
                    name="banner_description"
                    value={formData.banner_description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Description of your skills and experience..."
                    required
                  />
                </div>

                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Update Banner Content
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* CV Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle>CV Management</CardTitle>
              <CardDescription>
                Upload your CV to make it available for download
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cv_upload">Upload CV (PDF only)</Label>
                  <div className="mt-2 flex items-center">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF only (MAX. 10MB)</p>
                      </div>
                      <input 
                        id="cv_upload" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,application/pdf"
                        onChange={handleCVUpload}
                        disabled={cvUploading}
                      />
                    </label>
                  </div>
                  {cvUploading && (
                    <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                  )}
                </div>

                {homepageData?.cv_file_path && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      CV is currently uploaded and available at: 
                      <a 
                        href={homepageData.cv_file_path} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline ml-1"
                      >
                        Download Current CV
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomepageEditor;