import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, FileText, Code, LogOut, Home, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Check if admin is logged in
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                View Portfolio
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Manage your portfolio content from here.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Homepage Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="mr-2 text-blue-600" size={24} />
                Homepage
              </CardTitle>
              <CardDescription>
                Edit banner content and upload CV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/homepage">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Edit Homepage
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Projects Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 text-teal-600" size={24} />
                Projects
              </CardTitle>
              <CardDescription>
                Add, edit, and manage your portfolio projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/projects">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Manage Projects
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* About Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 text-blue-600" size={24} />
                About
              </CardTitle>
              <CardDescription>
                Update your bio, skills, and experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/about">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Edit About
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Technologies Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 text-purple-600" size={24} />
                Technologies
              </CardTitle>
              <CardDescription>
                Manage your technical skills and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/technologies">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Edit Technologies
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 text-green-600" size={24} />
                Contact
              </CardTitle>
              <CardDescription>
                Edit contact information and phone number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/contact">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Edit Contact Info
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contact Submissions Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 text-orange-600" size={24} />
                Submissions
              </CardTitle>
              <CardDescription>
                View and manage contact form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/contact/submissions">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  View Submissions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;