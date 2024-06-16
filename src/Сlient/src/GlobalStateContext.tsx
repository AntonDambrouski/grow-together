import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalState {
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

interface Project {
  id: number;
  title: string;
  description: string;
  isAIGenerated: boolean;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{ projects, setProjects, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
