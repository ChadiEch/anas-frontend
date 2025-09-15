import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { fetchProjects, createProject, updateProject, deleteProject, type Project } from '@/lib/supabase-data';
import { useAuth } from '@/contexts/AuthContext';

const ProjectEditor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadProjects();
  }, [user, navigate]);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const projectData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image_url: formData.get('image_url') as string,
      project_url: formData.get('project_url') as string,
      github_url: formData.get('github_url') as string,
      technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
      featured: formData.get('featured') === 'on'
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectData);
        toast({ title: "Project updated successfully!" });
      } else {
        await createProject(projectData);
        toast({ title: "Project created successfully!" });
      }
      
      setEditingProject(null);
      setIsCreating(false);
      loadProjects();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Failed to save project",
        variant: "destructive" 
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast({ title: "Project deleted successfully!" });
        loadProjects();
      } catch (error) {
        toast({ 
          title: "Error", 
          description: "Failed to delete project",
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
              <h1 className="text-2xl font-bold text-gray-900">Manage Projects</h1>
            </div>
            <Button 
              onClick={() => {
                setIsCreating(true);
                setEditingProject(null);
              }}
              className="bg-teal-600 hover:bg-teal-700"
            >
              <Plus size={16} className="mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
              <CardDescription>
                {editingProject ? 'Update project details' : 'Add a new project to your portfolio'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      defaultValue={editingProject?.title}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input 
                      id="image_url" 
                      name="image_url" 
                      defaultValue={editingProject?.image_url}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    defaultValue={editingProject?.description}
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project_url">Project URL</Label>
                    <Input 
                      id="project_url" 
                      name="project_url" 
                      defaultValue={editingProject?.project_url}
                    />
                  </div>
                  <div>
                    <Label htmlFor="github_url">GitHub URL</Label>
                    <Input 
                      id="github_url" 
                      name="github_url" 
                      defaultValue={editingProject?.github_url}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input 
                    id="technologies" 
                    name="technologies" 
                    defaultValue={editingProject?.technologies?.join(', ')}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="featured" 
                    name="featured" 
                    defaultChecked={editingProject?.featured}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    {editingProject ? 'Update' : 'Create'} Project
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProject(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects List */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 text-sm text-gray-500">
                      {project.project_url && (
                        <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectEditor;
