import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { fetchAbout, updateAbout, type About } from '@/lib/supabase-data';
import { useAuth } from '@/contexts/AuthContext';

const AboutEditor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [aboutData, setAboutData] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadAbout();
  }, [user, navigate]);

  const loadAbout = async () => {
    try {
      const data = await fetchAbout();
      console.log('Loaded about data:', data);
      setAboutData(data);
    } catch (error) {
      console.error('Error loading about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const aboutUpdate = {
      content: formData.get('content') as string,
      experience_years: parseInt(formData.get('experience_years') as string),
      skills: (formData.get('skills') as string).split(',').map(s => s.trim())
    };

    console.log('Submitting about update:', aboutUpdate);

    try {
      const result = await updateAbout(aboutUpdate);
      console.log('Update result:', result);
      if (result) {
        setAboutData(result);
        toast({ title: "About section updated successfully!" });
        // Reload data to ensure consistency
        await loadAbout();
      } else {
        throw new Error('Failed to update about section');
      }
    } catch (error) {
      console.error('Error updating about:', error);
      toast({ 
        title: "Error", 
        description: "Failed to update about section",
        variant: "destructive" 
      });
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
            <h1 className="text-2xl font-bold text-gray-900 ml-4">Edit About Section</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>
              Update your bio, experience, and skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="content">About Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={aboutData?.content || ''}
                  rows={6}
                  placeholder="Write about yourself, your background, and what you do..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="experience_years">Years of Experience</Label>
                <Input
                  id="experience_years"
                  name="experience_years"
                  type="number"
                  defaultValue={aboutData?.experience_years || 3}
                  min="0"
                  max="50"
                  required
                />
              </div>

              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  defaultValue={aboutData?.skills?.join(', ') || ''}
                  rows={3}
                  placeholder="AutoCAD, SolidWorks, Revit, 3D Modeling..."
                  required
                />
              </div>

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Update About Section
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AboutEditor;