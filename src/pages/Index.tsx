import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Github, Linkedin, Download, Settings, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import About from '@/components/About';
import Skills from '@/components/Skills';
import ProjectGrid from '@/components/ProjectGrid';
import { fetchHomepageSettings, type HomepageSettings } from '@/lib/supabase-data';
import { fetchContactInfo, submitContactForm } from '@/lib/supabase-data';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [homepageData, setHomepageData] = useState<HomepageSettings | null>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const homepageData = await fetchHomepageSettings();
        const contactData = await fetchContactInfo();
        setHomepageData(homepageData);
        setContactInfo(contactData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Default data if no database content
  const defaultHomepageData = {
    banner_title: 'Mechanical Engineer',
    banner_subtitle: 'Designing innovative solutions with precision and creativity',
    banner_description: 'Experienced in CAD design, 3D modeling, and engineering analysis using AutoCAD, SolidWorks, Revit, and cutting-edge engineering tools.'
  };

  const displayData = homepageData || defaultHomepageData;

  // Function to get the correct CV URL
  const getCVUrl = (cvPath: string | undefined) => {
    if (!cvPath) return null;
    
    // In development, use the relative path (proxy will handle it)
    if (import.meta.env.DEV) {
      return cvPath;
    }
    
    // In production, use the full backend URL
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const backendUrl = apiUrl.replace('/api', '');
    return `${backendUrl}${cvPath}`;
  };

  const cvUrl = getCVUrl(homepageData?.cv_file_path);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      if (result) {
        toast({
          title: 'Success',
          description: 'Your message has been sent successfully!'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to send your message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>Anas Ismail</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className={`transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-blue-100 hover:text-white'
              }`}>About</a>
              <a href="#skills" className={`transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-blue-100 hover:text-white'
              }`}>Skills</a>
              <a href="#projects" className={`transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-blue-100 hover:text-white'
              }`}>Projects</a>
              <a href="#contact" className={`transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-blue-100 hover:text-white'
              }`}>Contact</a>
              <Link 
                to="/login" 
                className={`flex items-center gap-1 transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-blue-100 hover:text-white'
                }`}
                title="Admin Login"
              >
                <Settings size={16} />
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {displayData.banner_title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {displayData.banner_subtitle}
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-3xl mx-auto">
              {displayData.banner_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                <a href="#projects" className="flex items-center">
                  View My Work
                  <ArrowRight size={20} className="ml-2" />
                </a>
              </Button>
              {cvUrl ? (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-blue-900 border-white hover:bg-white hover:text-blue-900"
                >
                  <a 
                    href={cvUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Download size={20} className="mr-2" />
                    Download Resume
                  </a>
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-blue-900 border-white hover:bg-white hover:text-blue-900"
                  disabled
                >
                  <Download size={20} className="mr-2" />
                  CV Not Available
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore my portfolio of engineering projects, showcasing innovative 
              designs and technical solutions across various industries.
            </p>
          </div>
          <ProjectGrid />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Interested in collaborating or discussing engineering opportunities? 
              I'd love to hear from you.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-teal-600" size={24} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">{contactInfo?.email || 'anas.ismail@example.com'}</p>
                    </div>
                  </div>
                  {contactInfo?.phone && (
                    <div className="flex items-center gap-4">
                      <Phone className="text-teal-600" size={24} />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">{contactInfo.phone}</p>
                      </div>
                    </div>
                  )}
                  {contactInfo?.github && (
                    <div className="flex items-center gap-4">
                      <Github className="text-teal-600" size={24} />
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-gray-600">{contactInfo.github}</p>
                      </div>
                    </div>
                  )}
                  {contactInfo?.linkedin && (
                    <div className="flex items-center gap-4">
                      <Linkedin className="text-teal-600" size={24} />
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-gray-600">{contactInfo.linkedin}</p>
                      </div>
                    </div>
                  )}
                  {contactInfo?.address && (
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 text-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">{contactInfo.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Anas Ismail Portfolio. Built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;