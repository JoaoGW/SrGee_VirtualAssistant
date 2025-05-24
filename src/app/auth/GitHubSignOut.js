import { getAuth, signOut } from "firebase/auth";
import { redirect } from "next/dist/server/api-utils";

export default function GitHubSignOut() {
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert("Sign-out successful.");
      redirect('/');
    } catch (error) {
      alert("An error was encountered during the logout process: " + error.message);
    }
  };
}