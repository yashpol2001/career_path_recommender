export interface CareerPath {
  programmingLanguage: string;
  career: string;
  description: string;
  courses: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  certifications: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  projects: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
}

export interface ApiResponse {
  recommendation: string;
  details: CareerPath;
}

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export interface RecommendationDetails {
  programmingLanguage: string;
  career: string;
  description: string;
  courses: Record<string, string[]>; // beginner/intermediate/advanced
  certifications: Record<string, string[]>;
  projects: Record<string, string[]>;
}