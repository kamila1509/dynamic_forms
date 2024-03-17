import simpleRestProvider from 'ra-data-simple-rest';
import customDataProvider from './customDataProvider';
import { fetchUtils } from 'react-admin';
import useUserStore from './store/userStore';
const apiUrl = 'http://localhost:4000'; // Reemplaza esto con la URL de tu API

const userId = useUserStore.getState()?.user?.uid;
function httpClient (url, options = {}) {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = JSON.parse(localStorage.getItem('userStore')).state.user.stsTokenManager.accessToken;
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};



export const dataProvider =  {
  getList: async (resource, params) => {
      try {
          const { page, perPage } = params.pagination;
          const { field, order } = params.sort;
          const query = {
              ...fetchUtils.flattenObject(params.filter),
              _sort: field,
              _order: order,
              _start: (page - 1) * perPage,
              _end: page * perPage,
          };
          let url = `${apiUrl}/${resource}`;
          if(resource === 'responses') {
            url = `${apiUrl}/${resource}/${userId}`;
          }
  
          const response = await httpClient(url);
          console.log(response)
  
          if (response.status !== 200) {
              throw new Error(`Error al obtener la lista de datos: ${response.statusText}`);
          }
          const json = await response.json;
  
          return { data: json, total: json.length };
      } catch (error) {
          return Promise.reject(error);
      }
  },
  

  getOne: async (resource, params) => {
    console.log("params", params)
      let url = `${apiUrl}/${resource}/${params.id}`;
      if(resource === 'responses') {
        url = `${apiUrl}/${resource}/${userId}/${params.id}`;
      }
      const response = await httpClient(url);
          console.log(response)
  
          if (response.status !== 200) {
              throw new Error(`Error al obtener la lista de datos: ${response.statusText}`);
          }
          const json = await response.json;
          console.log(json)
          return { data: json };
  },

  create: async (resource, params) => {
      const url = `${apiUrl}/${resource}`;
      return httpClient(url, {
          method: 'POST',
          body: JSON.stringify(params.data),
      }).then(({ json }) => ({
          data: json,
      }));
  },

  update: async (resource, params) => {
    console.log(params)
      const url = `${apiUrl}/${resource}/${params.id}`;
      return httpClient(url, {
          method: 'PATCH',
          body: JSON.stringify(params.data),
      }).then(({ json }) => ({
          data: json,
      }));
  },

  delete: async (resource, params) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      return httpClient(url, {
          method: 'DELETE',
      }).then(({ json }) => ({
          data: json,
      }));
  },

  // Otras funciones como getMany, updateMany, deleteMany, etc. si es necesario
};

//export const dataProvider = simpleRestProvider('http://path.to.my.api/');