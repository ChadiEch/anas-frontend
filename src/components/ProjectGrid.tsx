
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchProjects, type Project } from '@/lib/supabase-data';

const ProjectGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Default projects if no database content
  const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'Mechanical Design Project',
      description: 'Complete mechanical system design using SolidWorks and AutoCAD for industrial automation.',
      image_url: '/placeholder.svg',
      technologies: ['SolidWorks', 'AutoCAD', 'ANSYS'],
      project_url: '#',
      github_url: '#',
      featured: true
    },
    {
      id: '2',
      title: 'HVAC System Design',
      description: 'Energy-efficient HVAC system design for commercial buildings using Revit and simulation tools.',
      image_url: '/placeholder.svg',
      technologies: ['Revit', 'ANSYS', 'Energy Modeling'],
      project_url: '#',
      featured: true
    },
    {
      id: '3',
      title: 'Structural Analysis',
      description: 'Comprehensive structural analysis and optimization using FEA and advanced simulation techniques.',
      image_url: '/placeholder.svg',
      technologies: ['ANSYS', 'MATLAB', 'FEA'],
      project_url: '#',
      featured: false
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  // Get unique technologies from all projects
  const projectTechnologies = Array.from(
    new Set(displayProjects.flatMap(project => project.technologies))
  );
  
  const filters = ['All', 'Featured', ...projectTechnologies];
  
  const filteredProjects = displayProjects.filter(project => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Featured') return project.featured;
    return project.technologies.includes(selectedFilter);
  });

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-300 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap gap-2 max-w-4xl">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {selectedFilter === 'All' 
              ? 'No projects available. Add some projects in the dashboard!' 
              : `No projects found with ${selectedFilter}.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
