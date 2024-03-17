import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Crea una instancia de Axios con encabezados predefinidos
const createAxiosInstance = (headers?: AxiosRequestConfig['headers']): AxiosInstance => {
  return axios.create({
    baseURL: 'http://localhost:4000', // Reemplaza esto con la URL de tu servidor
    headers: headers,
  });
};

// Función genérica para realizar solicitudes HTTP con encabezados predefinidos
const makeRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  headers?: AxiosRequestConfig['headers']
): Promise<T> => {
  const axiosInstance = createAxiosInstance(headers);

  try {
    let response;

    switch (method) {
      case 'get':
        response = await axiosInstance.get<T>(url);
        break;
      case 'post':
        response = await axiosInstance.post<T>(url, data);
        break;
      case 'put':
        response = await axiosInstance.put<T>(url, data);
        break;
      case 'delete':
        response = await axiosInstance.delete<T>(url);
        break;
      default:
        throw new Error(`Invalid HTTP method: ${method}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
};

export default makeRequest;
