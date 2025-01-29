import { Section } from './section';

export interface Course {
  id: string;
  category: string;
  title: string;
  locked: boolean;
  description: string;
  strand: string;
  resourcesSrc: string;
  sections: Section[];
  prerequisites: string[];
}
