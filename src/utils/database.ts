import { getDatabase, ref, set } from 'firebase/database';
import useUserStore from '../store/userStore';

// Obtiene la instancia de la base de datos
const db = getDatabase();

function filterUndefined(data) {
    if (!data || typeof data !== 'object') {
      // Si data no es un objeto o es null/undefined, simplemente devolvemos data
      return data;
    }
  
    // Filtramos las propiedades del objeto
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      // Si el valor no es undefined, lo incluimos en el objeto resultante
      if (value !== undefined) {
        acc[key] = typeof value === 'object' ? filterUndefined(value) : value;
      }
      return acc;
    }, {});
  
    return filteredData;
  }
// Función para almacenar datos específicos para un usuario
export const saveFormData = (datos) => {
    const uid = useUserStore.getState().user.uid
    console.log(uid)
  // Crea una referencia a la ubicación en la base de datos específica para ese usuario
  const userRef = ref(db, `usuarios/${uid}`);

  // Almacena los datos en esa ubicación
  return set(userRef, {formStructure: filterUndefined(datos)});
};