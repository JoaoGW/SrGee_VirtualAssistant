"use client"
import { useEffect, useState } from "react";

import { PatternAuthPages } from "@components/PageComponents/PatternAuthPages/PatternAuthPages";
import { RotateLoadingSpinner } from "@components/LoadingSpinners/Loading";

import { auth } from '../../services/Firebase/firebase';

export default function DiffsLogs(){
  const [user, setUser] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const getCurrentUser = () => {
        try {
          setIsLoading(true);

          const currentUser = auth.currentUser;
          if (currentUser) {
            setUser(currentUser);
          } else {
            setErrorMsg('Ocorreu um problema ao obter informações do seu usuário');
          }
        } catch (error) {
          if (error instanceof Error) {
            setErrorMsg(error.message);
          } else {
            setErrorMsg(String(error));
          }
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      };

      getCurrentUser();
    }
  }, []);

  // In case page is loading
  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <RotateLoadingSpinner />
        <p className="mt-10">Estamos carregando suas informações...</p>
      </section>
    );
  }
  
  return(
    <PatternAuthPages isLoading={ isLoading } user={ user }>

    </PatternAuthPages>
  )
}