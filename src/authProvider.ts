import { AuthProvider, HttpError } from "react-admin";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import useUserStore from "./store/userStore";
export const authProvider: AuthProvider = {
  
  login: ({ username, password }) => {
    return signInWithEmailAndPassword(auth,username, password)
      .then((userCredentials) => {
        console.log('userCredentials',userCredentials)
      useUserStore.setState({user: userCredentials.user})
        // Autenticación exitosa, podrías realizar más acciones si es necesario
        return Promise.resolve();
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        return Promise.reject(new HttpError("Unauthorized", 401, { message: "Invalid username or password" }));
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
      .then(() => {
        // Usuario registrado exitosamente
        return Promise.resolve();
      })
      .catch((error) => {
        console.error('Error en el registro:', error);

        let errorMessage = 'Error al registrar usuario';

        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'El correo electrónico ya está en uso';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'La contraseña es débil';
        }

        return Promise.reject(new HttpError("Unauthorized", 401, { message: errorMessage }));
      });
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        (user) => {
          unsubscribe();
          if (user) {
            resolve();
          } else {
            reject();
          }
        },
        (error) => {
          console.error('Error al verificar autenticación:', error);
          reject();
        }
      );
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
