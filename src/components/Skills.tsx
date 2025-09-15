
import { useState, useEffect } from 'react';
import { fetchTechnologies, type Technology } from '@/lib/supabase-data';

const Skills = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const data = await fetchTechnologies();
        setTechnologies(data);
      } catch (error) {
        console.error('Error loading technologies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTechnologies();
  }, []);

  // Default technologies if no database content
  const defaultTechnologies: Technology[] = [
    { id: '1', name: 'AutoCAD', category: 'CAD Software', icon: '🏗️', color: '#E74C3C' },
    { id: '2', name: 'SolidWorks', category: 'CAD Software', icon: '⚙️', color: '#3498DB' },
    { id: '3', name: 'Revit', category: 'CAD Software', icon: '🏢', color: '#F39C12' },
    { id: '4', name: 'ANSYS', category: 'Engineering Tools', icon: '📊', color: '#9B59B6' },
    { id: '5', name: 'MATLAB', category: 'Engineering Tools', icon: '📈', color: '#E67E22' },
    { id: '6', name: 'Python', category: 'Programming', icon: '🐍', color: '#27AE60' }
  ];

  const displayTechnologies = technologies.length > 0 ? technologies : defaultTechnologies;
  const categories = ['All', ...Array.from(new Set(displayTechnologies.map(tech => tech.category)))];
  
  const filteredTechnologies = selectedCategory === 'All' 
    ? displayTechnologies 
    : displayTechnologies.filter(tech => tech.category === selectedCategory);

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technologies & Tools</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proficient in industry-leading software and cutting-edge engineering tools
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTechnologies.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              style={{ borderTopColor: tech.color, borderTopWidth: '4px' }}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-500">{tech.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredTechnologies.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No technologies found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
