import useUserStore from "../store/userStore";
import { dataProvider } from "../dataProvider";
import {
  get,
  getDatabase,
  ref,
  set
} from "firebase/database";
import { v4 as uuid } from "uuid";

const db = getDatabase();
export const saveUser = async (user) => {
  try {
     await dataProvider.update("user", {
      id: user.uid,
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al obtener los formularios:", error);
    return [];
  }

};


export const saveFormData = async (datos, name) => {
  const userUid = useUserStore.getState().user.uid;
  await dataProvider.create( `forms/${userUid}`, {
    data: {
      form: datos,
      name
    }
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

export const updateFormData = async (datos, name, id) => {
  const userUid = useUserStore.getState().user.uid;
  await dataProvider.update( `forms/${userUid}`, {
    id,
    data: {
      form: datos,
      name
    }
  })
    .then(() => {
      console.log("Datos de formStructures actualizados con éxito");
    })
    .catch((error) => {
      console.error("Error al guardar datos de formStructures:", error);
    });
};
export const getFormsForUser = async () => {
  const userId = useUserStore.getState().user.uid;
  try {
    const snapshot = await dataProvider.getOne("forms", { id: userId });
    if (snapshot) {
      // Obtener todos los formularios del usuario
      const forms = snapshot.data;
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


export const saveResponseForm = async (userId: string, formId: string, response: any ) => {
  const responseId = uuid();
  const formStructuresRef = ref(
    db,
    `users/${userId}/forms/${formId}/responses/${responseId}`
  );
  console.log(response)
  set(formStructuresRef, {
      ...response,
  }).then((response) => {

      console.log(
        "Datos de respuesta guardados con éxito con tu propio ID único"
      );
      return []
  })
  .catch((err) => {
      console.error("Error al guardar datos de respuesta:", err);
})
}