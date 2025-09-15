import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { fetchTechnologies, createTechnology, updateTechnology, deleteTechnology, type Technology } from '@/lib/supabase-data';
import { useAuth } from '@/contexts/AuthContext';

const TechEditor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadTechnologies();
  }, [user, navigate]);

  const loadTechnologies = async () => {
    const data = await fetchTechnologies();
    setTechnologies(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const techData = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      icon: formData.get('icon') as string,
      color: formData.get('color') as string
    };

    try {
      if (editingTech) {
        await updateTechnology(editingTech.id, techData);
        toast({ title: "Technology updated successfully!" });
      } else {
        await createTechnology(techData);
        toast({ title: "Technology created successfully!" });
      }
      
      setEditingTech(null);
      setIsCreating(false);
      loadTechnologies();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to save technology",
        variant: "destructive" 
      });
    }
  };

  const handleEdit = (tech: Technology) => {
    setEditingTech(tech);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this technology?')) {
      try {
        await deleteTechnology(id);
        toast({ title: "Technology deleted successfully!" });
        loadTechnologies();
      } catch (error) {
        toast({ 
          title: "Error", 
          description: "Failed to delete technology",
          variant: "destructive" 
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const categories = ['CAD Software', 'Engineering Tools', 'Programming', 'Other'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Manage Technologies</h1>
            </div>
            <Button 
              onClick={() => {
                setIsCreating(true);
                setEditingTech(null);
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus size={16} className="mr-2" />
              New Technology
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingTech ? 'Edit Technology' : 'Add New Technology'}</CardTitle>
              <CardDescription>
                {editingTech ? 'Update technology details' : 'Add a new technology to your skills'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={editingTech?.name}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue={editingTech?.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon">Icon (Lucide icon name)</Label>
                    <Input 
                      id="icon" 
                      name="icon" 
                      defaultValue={editingTech?.icon}
                      placeholder="Settings, Code, Wrench"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color (hex)</Label>
                    <Input 
                      id="color" 
                      name="color" 
                      type="color"
                      defaultValue={editingTech?.color || '#3B82F6'}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    {editingTech ? 'Update' : 'Create'} Technology
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setEditingTech(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Technologies by Category */}
        {categories.map((category) => {
          const categoryTechs = technologies.filter(tech => tech.category === category);
          if (categoryTechs.length === 0) return null;
          
          return (
            <Card key={category} className="mb-6">
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTechs.map((tech) => (
                    <div 
                      key={tech.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded flex items-center justify-center text-white text-sm"
                          style={{ backgroundColor: tech.color }}
                        >
                          {tech.icon?.charAt(0) || tech.name.charAt(0)}
                        </div>
                        <span className="font-medium">{tech.name}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleEdit(tech)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDelete(tech.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>
    </div>
  );
};

export default TechEditor;
