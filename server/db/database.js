import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');

class Database {
  async readFile(filename) {
    try {
      const filePath = path.join(DATA_DIR, filename);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      throw error;
    }
  }

  async writeFile(filename, data) {
    try {
      const filePath = path.join(DATA_DIR, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
      throw error;
    }
  }

  async getProjects() {
    const data = await this.readFile('projects.json');
    return data.projects;
  }

  async getProjectById(id) {
    const projects = await this.getProjects();
    return projects.find(p => p.id === parseInt(id));
  }

  async addProject(project) {
    const data = await this.readFile('projects.json');
    const newProject = {
      id: data.projects.length + 1,
      ...project,
      featured: project.featured || false
    };
    data.projects.push(newProject);
    await this.writeFile('projects.json', data);
    return newProject;
  }

  async getSkills() {
    const data = await this.readFile('skills.json');
    return data.skills;
  }

  async getProfile() {
    const data = await this.readFile('profile.json');
    return data.profile;
  }

  async getExperience() {
    const data = await this.readFile('profile.json');
    return data.experience;
  }

  async getMessages() {
    const data = await this.readFile('messages.json');
    return data.messages;
  }

  async addMessage(message) {
    const data = await this.readFile('messages.json');
    const newMessage = {
      id: data.messages.length + 1,
      ...message,
      timestamp: new Date().toISOString()
    };
    data.messages.push(newMessage);
    await this.writeFile('messages.json', data);
    return newMessage;
  }
}

export default new Database();
