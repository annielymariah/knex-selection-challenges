import { useState, useEffect } from "react";
import { UserService } from "../api/services/userService";
import type { User } from "../api/types/userTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userUpdateEvent = new Event('userUpdated');

export default function usePersistedUser() {
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [userHistory, setUserHistory] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const savedUser = localStorage.getItem("userData");
            const savedHistory = localStorage.getItem("userHistory");
            const savedHash = cookies.get("authSha256");

            if (savedUser && savedHash) {
                try {
                    const user: User = JSON.parse(savedUser);
                    if (user.login.sha256 === savedHash) {
                        setLoggedUser(user);
                        
                        // Carrega histórico se existir
                        if (savedHistory) {
                            setUserHistory(JSON.parse(savedHistory));
                        }
                        
                        dispatchEvent(userUpdateEvent);
                    } else {
                        clearAuthData();
                    }
                } catch {
                    clearAuthData();
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const clearAuthData = () => {
        localStorage.removeItem("userData");
        cookies.remove("authSha256");
        dispatchEvent(userUpdateEvent);
    };

    const login = async () => {       
        try {
            setLoading(true);
            const user = await UserService.getRandomUser();
            
            // Adiciona o usuário atual ao histórico antes de substituí-lo
            if (loggedUser) {
                const updatedHistory = [...userHistory, loggedUser];
                setUserHistory(updatedHistory);
                localStorage.setItem("userHistory", JSON.stringify(updatedHistory));
            }
            
            setLoggedUser(user);
            localStorage.setItem("userData", JSON.stringify(user));
            cookies.set("authSha256", user.login.sha256, {
                expires: new Date(Date.now() + 3600 * 1000),
                path: "/",
            });
            dispatchEvent(userUpdateEvent);
        } catch (error) {
            console.error("Login falhou:", error);
        } finally {
            setLoading(false);
        }
    };
  
    const logout = () => {
        if (loggedUser) {
            const updatedHistory = [...userHistory, loggedUser];
            setUserHistory(updatedHistory);
            localStorage.setItem("userHistory", JSON.stringify(updatedHistory));
        }
        setLoggedUser(null);
        clearAuthData();
    };

    return {
        loggedUser,
        userHistory,
        loading,
        login,
        logout,
        clearAuthData
    };
}