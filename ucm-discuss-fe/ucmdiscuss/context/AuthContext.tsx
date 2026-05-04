import { createContext } from "react";

const AuthContext = createContext<AuthcontextType | undefined>(undefined);

export function AuthProvider({ children}: )