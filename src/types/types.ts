export interface User {
  id: number;
  name: string;
  surname: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
}

export interface Bug {
  id: number;
  description: string;
  username: string;
  project: string;
  creationDate: string
}

export type FilterType = {
  user_id?: number | null;
  project_id?: number | null;
  start_date?: Date;
  end_date?: Date;
};

export interface BugCreate {
    description?: string,
    userId?: number,
    projectId?: number
}