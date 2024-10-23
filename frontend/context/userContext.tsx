import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { Staff, Student, User } from '../utils/types';
import { useNavigation } from 'expo-router';

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    login: (userData: User | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate=useNavigation()
    const login = (userData: User | null) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
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
