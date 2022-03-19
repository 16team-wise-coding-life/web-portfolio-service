import { Project } from '../db';

class projectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {
    const newProject = { user_id, title, description, from_date, to_date };
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;
    return createdNewProject;
  }

  static async getProjects({ user_id }) {
    const projects = await Project.findAllByUserId({ user_id });
    return projects;
  }

  static async setProject({ project_id, toUpdate }) {
    let project = await Project.findById({ project_id });

    if (!project) {
      const errorMessage = '프로젝트 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }
    if (toUpdate.from_date) {
      const fieldToUpdate = 'from_date';
      const newValue = toUpdate.from_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }
    if (toUpdate.to_date) {
      const fieldToUpdate = 'to_date';
      const newValue = toUpdate.to_date;
      project = await Project.update({ project_id, fieldToUpdate, newValue });
    }

    return project;
  }

  static async getProjectInfo({ project_id }) {
    const project = await Project.findById({ project_id });

    if (!project) {
      const errorMessage = '해당 프로젝트 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return project;
  }
}

export { projectService };
