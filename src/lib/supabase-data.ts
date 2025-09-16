import api from './api';

export interface Technology {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  project_url?: string;
  github_url?: string;
  featured: boolean;
}

export interface About {
  id: number;
  content: string;
  skills: string[];
  experience_years: number;
}

export interface HomepageSettings {
  id: number;
  banner_title: string;
  banner_subtitle: string;
  banner_description: string;
  cv_file_path?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export const fetchTechnologies = async (): Promise<Technology[]> => {
  try {
    const data = await api.technologies.getAll();
    return data || [];
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return [];
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const data = await api.projects.getAll();
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchAbout = async (): Promise<About | null> => {
  try {
    const data = await api.about.get();
    return data;
  } catch (error) {
    console.error('Error fetching about:', error);
    return null;
  }
};

export const fetchHomepageSettings = async (): Promise<HomepageSettings | null> => {
  try {
    const data = await api.homepage.get();
    return data;
  } catch (error) {
    console.error('Error fetching homepage settings:', error);
    return null;
  }
};

export const fetchContactInfo = async (): Promise<ContactInfo | null> => {
  try {
    const data = await api.contact.info.get();
    return data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
};

export const fetchContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const data = await api.contact.submissions.getAll();
    return data || [];
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    const data = await api.projects.create(project);
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project | null> => {
  try {
    const data = await api.projects.update(id, project);
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    await api.projects.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

export const createTechnology = async (technology: Omit<Technology, 'id'>): Promise<Technology | null> => {
  try {
    const data = await api.technologies.create(technology);
    return data;
  } catch (error) {
    console.error('Error creating technology:', error);
    return null;
  }
};

export const updateTechnology = async (id: string, technology: Partial<Technology>): Promise<Technology | null> => {
  try {
    const data = await api.technologies.update(id, technology);
    return data;
  } catch (error) {
    console.error('Error updating technology:', error);
    return null;
  }
};

export const deleteTechnology = async (id: string): Promise<boolean> => {
  try {
    await api.technologies.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting technology:', error);
    return false;
  }
};

export const updateAbout = async (about: Partial<About>): Promise<About | null> => {
  try {
    const data = await api.about.update(about);
    return data;
  } catch (error) {
    console.error('Error updating about:', error);
    return null;
  }
};

export const updateHomepageSettings = async (settings: Partial<HomepageSettings>): Promise<HomepageSettings | null> => {
  try {
    const data = await api.homepage.update(settings);
    return data;
  } catch (error) {
    console.error('Error updating homepage settings:', error);
    return null;
  }
};

export const updateContactInfo = async (info: Partial<ContactInfo>): Promise<ContactInfo | null> => {
  try {
    const data = await api.contact.info.update(info);
    return data;
  } catch (error) {
    console.error('Error updating contact info:', error);
    return null;
  }
};

export const submitContactForm = async (submission: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<ContactSubmission | null> => {
  try {
    const data = await api.contact.submit.create(submission);
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return null;
  }
};

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  try {
    await api.contact.submissions.delete(id);
    return true;
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    return false;
  }
};

export const uploadCV = async (formData: FormData): Promise<{ cv_url: string } | null> => {
  try {
    const data = await api.homepage.uploadCV(formData);
    return data;
  } catch (error) {
    console.error('Error uploading CV:', error);
    return null;
  }
};