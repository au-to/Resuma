import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Resume, ResumeContent } from '@/types';
import { generateId } from '@/lib/utils';

interface ResumeState {
  currentResume: Resume | null;
  resumes: Resume[];
  isLoading: boolean;
  error: string | null;
  isDirty: boolean;

  // Actions
  setCurrentResume: (resume: Resume | null) => void;
  setResumes: (resumes: Resume[]) => void;
  updateResumeContent: (content: Partial<ResumeContent>) => void;
  createNewResume: (userId: string, title?: string) => Resume;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDirty: (dirty: boolean) => void;
  clearResume: () => void;
}

const createEmptyResumeContent = (): ResumeContent => ({
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
});

export const useResumeStore = create<ResumeState>()(
  devtools(
    (set, get) => ({
      currentResume: null,
      resumes: [],
      isLoading: false,
      error: null,
      isDirty: false,

      setCurrentResume: (resume) => set({ currentResume: resume, isDirty: false }),

      setResumes: (resumes) => set({ resumes }),

      updateResumeContent: (content) => {
        const { currentResume } = get();
        if (!currentResume) return;

        const updatedResume = {
          ...currentResume,
          content: {
            ...currentResume.content,
            ...content,
          },
          updated_at: new Date().toISOString(),
        };

        set({
          currentResume: updatedResume,
          isDirty: true,
        });
      },

      createNewResume: (userId, title = '新建简历') => {
        const newResume: Resume = {
          id: generateId(),
          user_id: userId,
          title,
          content: createEmptyResumeContent(),
          is_public: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        set({ currentResume: newResume, isDirty: true });
        return newResume;
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setDirty: (dirty) => set({ isDirty: dirty }),

      clearResume: () =>
        set({
          currentResume: null,
          resumes: [],
          isDirty: false,
          error: null,
        }),
    }),
    {
      name: 'resume-store',
    }
  )
);