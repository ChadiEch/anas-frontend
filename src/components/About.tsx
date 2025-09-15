
import { useState, useEffect } from 'react';
import { fetchAbout, type About as AboutType } from '@/lib/supabase-data';

const About = () => {
  const [aboutData, setAboutData] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await fetchAbout();
        setAboutData(data);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAbout();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default data if no database content
  const defaultAbout = {
    content: "I am a passionate Mechanical Engineer with over 3 years of experience in CAD design, 3D modeling, and engineering analysis. I specialize in creating innovative solutions using industry-leading software and have a proven track record of delivering high-quality engineering projects across various industries.",
    skills: ["AutoCAD", "SolidWorks", "Revit", "3D Modeling", "Engineering Analysis", "Project Management"],
    experience_years: 3
  };

  const displayData = aboutData || defaultAbout;
  const displayYears = displayData.experience_years;

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {displayData.content}
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-teal-500 text-white px-4 py-2 rounded-lg">
                <span className="font-bold text-2xl">{displayYears}+</span>
                <span className="block text-sm">Years Experience</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Skills</h3>
            <div className="grid grid-cols-2 gap-3">
              {displayData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
