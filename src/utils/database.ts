import useUserStore from "../store/userStore";
import { dataProvider } from "../dataProvider";
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
