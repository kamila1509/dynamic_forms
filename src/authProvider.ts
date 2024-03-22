import { AuthProvider, HttpError, addRefreshAuthToAuthProvider, useStore } from "react-admin";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from './firebase';
import useUserStore from "./store/userStore";
import { saveUser } from "./utils/database";
export const authProvider: AuthProvider = {
  
  login: ({ username, password }) => {
    return signInWithEmailAndPassword(auth, username, password)
      .then((userCredentials) => {
       const role =  JSON.parse(userCredentials.user.reloadUserInfo.customAttributes).role
        useUserStore.setState({ user: userCredentials.user, role: role });
        saveUser(userCredentials.user);
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        throw new HttpError("Unauthorized", 401, { message: "Invalid username or password" });
      });
  },
  logout: () => {
    useUserStore.setState({ user: null , role: null});
    return auth.signOut().then(() => {
      return Promise.resolve();
    });
  },
  signUp: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const role =  JSON.parse(userCredentials.user.reloadUserInfo.customAttributes).role
        useUserStore.setState({ user: userCredentials.user, role: role });
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
        if (user) {
          const { stsTokenManager } = user;
          const currentTime = Date.now();
          if (stsTokenManager && stsTokenManager.accessToken && stsTokenManager.expirationTime) {
            const expirationTime = stsTokenManager.expirationTime;
            if (currentTime >= expirationTime) {
              // El token de acceso ha expirado, desloguear al usuario
              auth.signOut().then(() => {
                useUserStore.setState({ user: null });
                reject('Token de acceso expirado, el usuario ha sido deslogueado');
              }).catch((error) => {
                console.error('Error al desloguear al usuario:', error);
                reject('Error al desloguear al usuario');
              });
            } else {
              // El token de acceso aún es válido, resolver la promesa
              console.log('Usuario autenticado:', user);
              resolve();
            }
          } else {
            // No se pudo obtener el tiempo de expiración del token, resolver la promesa
            console.warn('No se pudo obtener el tiempo de expiración del token de acceso');
            resolve();
          }
        } else {
          // El usuario no está autenticado, resolver la promesa
          useUserStore.setState({ user: null });
          reject('El usuario no está autenticado');
        }
        unsubscribe();
      }, (error) => {
        console.error('Error al verificar autenticación:', error);
        reject('Error al verificar autenticación');
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
          useUserStore.setState({ user: null });
          console.error('Error al obtener identidad:', error);
          reject();
        }
      );
    });
  }
  
};

export default authProvider;
