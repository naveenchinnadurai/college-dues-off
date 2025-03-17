import { Router, useRouter } from 'expo-router';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { subjects, User } from '../utils/types';

interface UserContextType {
    user: User | null;
    subjects: subjects[] | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    setSubjects: Dispatch<SetStateAction<subjects[] | null>>;
    login: (userData: User | null) => void;
    logout: () => void;
    router:Router;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [subjects, setSubjects] = useState<subjects[] | null>(null);

    const router=useRouter()
    const login = (userData: User | null) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        router.push('/')
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, router, subjects, setSubjects }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
