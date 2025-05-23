import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/Firebase/firebase";

import Cookies from "js-cookie";

export async function signInWithGitHub() {
  const provider = new GithubAuthProvider();
  provider.addScope("repo");
  provider.addScope("read:user");

  provider.setCustomParameters({
    allow_signup: "false",
  });

  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (token) {
        Cookies.set("githubToken", token, { expires: 1 });
      } else {
        console.error("No token received");
      }

      return result.user;
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
      throw error;
    });
}