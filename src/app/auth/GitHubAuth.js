import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/Firebase/firebase";

const provider = new GithubAuthProvider();

provider.setCustomParameters({
  allow_signup: "false",
});

signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
    console.log("Usuário logado:", user);
  })
  .catch((error) => {
    console.error("Erro ao fazer login:", error);
  });