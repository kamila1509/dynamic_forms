import { AuthProvider, HttpError, useAuthProvider } from "react-admin";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from './firebase';
import useUserStore from "./store/userStore";
import { saveUser } from "./utils/database";
export const authProvider: AuthProvider = {
  
  login: ({ username, password }) => {
    return signInWithEmailAndPassword(auth, username, password)
      .then((userCredentials) => {
        useUserStore.setState({ user: userCredentials.user });
        saveUser(userCredentials.user);
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        throw new HttpError("Unauthorized", 401, { message: "Invalid username or password" });
      });
  },
  logout: () => {
    useUserStore.setState({ user: null });
    return auth.signOut().then(() => {
      return Promise.resolve();
    });
  },
  signUp: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        useUserStore.setState({ user: userCredentials.user });
        saveUser(userCredentials.user);
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        let errorMessage = 'Error al registrar usuario';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'El correo electrónico ya está en uso';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'La contraseña es débil';
        }
        throw new HttpError("Unauthorized", 401, { message: errorMessage });
      });
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        
        if (user) {
          resolve();
        } else {
          reject();
        }
      }, (error) => {
        console.error('Error al verificar autenticación:', error);
        reject();
      });
    });
  },
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          unsubscribe();
          if (user) {
            resolve(user);
          } else {
            reject();
          }
        },
        (error) => {
          console.error('Error al obtener identidad:', error);
          reject();
        }
      );
    });
  },
};

export default authProvider;
