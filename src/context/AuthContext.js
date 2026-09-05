import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { seedUsers } from '../data/mockUsers';


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const isLoginTaken = useCallback(
    (login) => users.some((u) => u.login.toLowerCase() === login.trim().toLowerCase()),
    [users]
  );

  const isCpfTaken = useCallback(
    (cpf) => users.some((u) => u.cpf === cpf.replace(/\D/g, '')),
    [users]
  );

  const register = useCallback(
    ({ nomeCompleto, email, cpf, senha }) => {
      const cleanCpf = cpf.replace(/\D/g, '');
      if (isLoginTaken(email)) {
        return { success: false, error: 'Este e-mail já está cadastrado.' };
      }
      if (isCpfTaken(cleanCpf)) {
        return { success: false, error: 'Este CPF já está cadastrado.' };
      }
      const newUser = {
        nomeCompleto: nomeCompleto.trim(),
        cpf: cleanCpf,
        login: email.trim().toLowerCase(),
        senha,
      };
      setUsers((prev) => [...prev, newUser]);
      return { success: true };
    },
    [isLoginTaken, isCpfTaken]
  );

  const login = useCallback(
    (loginInput, senha) => {
      const found = users.find(
        (u) => u.login.toLowerCase() === (loginInput || '').trim().toLowerCase()
      );
      if (!found || found.senha !== senha) {
        return { success: false, error: 'Login ou senha inválidos.' };
      }
      setCurrentUser(found);
      return { success: true };
    },
    [users]
  );

  const logout = useCallback(() => setCurrentUser(null), []);

  const value = useMemo(
    () => ({ currentUser, register, login, logout, isLoginTaken, isCpfTaken }),
    [currentUser, register, login, logout, isLoginTaken, isCpfTaken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return ctx;
}
