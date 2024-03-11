import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import useUserStore from "../store/userStore";
import { v4 as uuid } from "uuid";

// Obtiene la instancia de la base de datos
const db = getDatabase();

function filterUndefined(data) {
  if (!data || typeof data !== "object") {
    return data;
  }
  const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = typeof value === "object" ? filterUndefined(value) : value;
    }
    return acc;
  }, {});

  return filteredData;
}
export const saveUser = (user) => {
  const userRef = ref(db, `users/${user.uid}`);

  return update(userRef, { email: user.email });
};

// Función para almacenar datos específicos para un usuario
export const saveFormData = (datos, name) => {
  const userUid = useUserStore.getState().user.uid;
  console.log(userUid);
  const formStructureId = uuid().substring(0, 8);
  // Crea una referencia a la ubicación en la base de datos específica para ese usuario
  const formStructuresRef = ref(
    db,
    `users/${userUid}/forms/${formStructureId}`
  );
  set(formStructuresRef, {
    name,
    id: formStructureId,
    form: filterUndefined(datos),
  })
    .then(() => {
      console.log(
        "Datos de formStructures guardados con éxito con tu propio ID único"
      );
    })
    .catch((error) => {
      console.error("Error al guardar datos de formStructures:", error);
    });
};

export const updateFormData = (datos, name, id) => {
  const userUid = useUserStore.getState().user.uid;
  console.log(userUid);
  const formStructureId = id
  // Crea una referencia a la ubicación en la base de datos específica para ese usuario
  const formStructuresRef = ref(
    db,
    `users/${userUid}/forms/${formStructureId}/`
  );
  set(formStructuresRef, {
    name,
    id: formStructureId,
    form: filterUndefined(datos),
  })
    .then(() => {
      console.log(
        "Datos de formStructures actualizados con éxito"
      );
    })
    .catch((error) => {
      console.error("Error al guardar datos de formStructures:", error);
    });
};
export const getFormsForUser = async () => {
  const userId = useUserStore.getState().user.uid;
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}/forms`);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      // Obtener todos los formularios del usuario
      const forms = snapshot.val();
      return forms;
    } else {
      console.log("El usuario no tiene formularios.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los formularios:", error);
    return [];
  }
};

export const getFormById = async (userId: string, idForm: string) => {
  ///const userId = useUserStore.getState().user.uid;
  const db = getDatabase();
const userRef = ref(db, `users/${userId}/forms/${idForm}`);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      // Obtener todos los formularios del usuario
      const form = snapshot.val();
      return form;
    } else {
      console.log("El usuario no tiene formularios.");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los formularios:", error);
    return [];
  }

}
