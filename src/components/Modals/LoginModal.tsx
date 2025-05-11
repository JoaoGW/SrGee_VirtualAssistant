import Image from 'next/image';

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@utils/Firebase/firebase";

import SrGee from '@assets/srgee.png';

import { X } from "lucide-react";

type LoginModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function LoginModal({ isOpen, setIsOpen }: LoginModalProps) {
  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuário logado:", user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000d1] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>

        <div className='flex flex-row justify-center items-center'>
          <Image className='rounded-full p-3 bg-[#101828] my-10' src={SrGee} height={150} width={150} alt='Sir Gee, your personal assistant'></Image>
          <p className='special-title text-black text-4xl ml-10'>Sr Gee</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Login with GitHub
        </h2>
        <p className="text-gray-600 mb-6">
          Use your GitHub account to access all features of the platform.
        </p>

        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.03-2.682-.103-.253-.447-1.27.098-2.645 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.91-1.296 2.75-1.026 2.75-1.026.545 1.375.201 2.392.099 2.645.64.7 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.936.359.31.678.923.678 1.86 0 1.344-.012 2.428-.012 2.756 0 .267.18.578.688.48A10.003 10.003 0 0 0 22 12c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}