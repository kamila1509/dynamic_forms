import makeRequest from './axios';


export const getToken = async () => {
  try {
    return await makeRequest<any>('get', '/token');
  } catch (error) {
    console.error('Error al obtener token:', error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    return await makeRequest<any>('get', `/users/${userId}`, undefined );
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    return await makeRequest<any>('get', '/users');
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    return await makeRequest<any>('post', '/users', userData);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
  try {
    return await makeRequest<any>('post', `/users/${userId}`, userData);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const removeUser = async (userId: any) => {
  try {
    return await makeRequest<any>('delete', `/users/${userId}`);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

// Define más funciones para llamar a otras rutas del backend...

export const getForms = async (userId: string) => {
  try {
    return await makeRequest<any>('get', `/forms/${userId}`);
  } catch (error) {
    console.error('Error al obtener formularios:', error);
    throw error;
  }
};

export const getFormById = async (userId: string, formId: string) => {
  try {
    return await makeRequest<any>('get', `/forms/${userId}/${formId}`);
  } catch (error) {
    console.error('Error al obtener formulario por ID:', error);
    throw error;
  }
};

export const saveForm = async (userId: string, formData: any) => {
  try {
    return await makeRequest<any>('post', `/forms/${userId}`, formData);
  } catch (error) {
    console.error('Error al guardar formulario:', error);
    throw error;
  }
};

export const saveResponseForm = async (userId: string, formId: string, formData: any) => {
  try {
    return await makeRequest<any>('post', `/response/${userId}/${formId}`, formData);
  } catch (error) {
    console.error('Error al guardar respuesta de formulario:', error);
    throw error;
  }
};
