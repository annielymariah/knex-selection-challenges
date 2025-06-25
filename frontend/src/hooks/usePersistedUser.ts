import { useState, useEffect } from "react";
import { UserService } from "../api/services/userService";
import type { User } from "../api/types/userTypes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function usePersistedUser() {
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const savedUser = localStorage.getItem("userData");
            const savedHash = cookies.get("authSha256");

            if (savedUser && savedHash) {
                try {
                    const user: User = JSON.parse(savedUser);
                    console.log("Usuário armazenado no localStorage:", user); // Log do usuário, remover depois de testes >:P
                    
                    if (user.login.sha256 === savedHash) {
                        setLoggedUser(user);
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
    };

    const login = async () => {       
        try {
            setLoading(true);
            const user = await UserService.getRandomUser();
            setLoggedUser(user);
            localStorage.setItem("userData", JSON.stringify(user));
            cookies.set("authSha256", user.login.sha256, {
                expires: new Date(Date.now() + 3600 * 1000),
                path: "/",
            });
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };
  
    const logout = () => {
        setLoggedUser(null);
        clearAuthData();
    };

    return {
        loggedUser,
        loading,
        login,
        logout,
        clearAuthData
    };
}