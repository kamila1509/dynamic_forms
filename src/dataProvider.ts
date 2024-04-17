import { fetchUtils } from 'react-admin';
import useUserStore from './store/userStore';
const apiUrl = 'http://localhost:4000';


function httpClient (url: string, options = {} ) {
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
  getList: async (resource: string, params: { pagination: { page: any; perPage: any; }; sort: { field: any; order: any; }; filter: any; }) => {
      try {
          let url = `${apiUrl}/${resource}`;
          const userId = useUserStore.getState()?.user?.uid;
          if(resource === 'responses') {
            url = `${apiUrl}/${resource}/${userId}`;
          }
          const response = await httpClient(url);
          if (response.status !== 200) {
              throw new Error(`Error al obtener la lista de datos: ${response.statusText}`);
          }
          const json = await response.json;
          return { data: json, total: json.length };
      } catch (error) {
          return Promise.reject(error);
      }
  },
  getOne: async (resource: string, params: { id: any; }) => {
    const userId = useUserStore.getState()?.user?.uid;
      let url = `${apiUrl}/${resource}/${params.id}`;
      if(resource === 'responses') {
        url = `${apiUrl}/${resource}/${userId}/${params.id}`;
      }
      const response = await httpClient(url);
          if (response.status !== 200) {
              throw new Error(`Error al obtener la lista de datos: ${response.statusText}`);
          }
          const json = await response.json;
          return { data: json };
  },

  create: async (resource: any, params: { data: any; }) => {
      const url = `${apiUrl}/${resource}`;
      return httpClient(url, {
          method: 'POST',
          body: JSON.stringify(params.data),
      }).then(({ json }) => ({
          data: json,
      }));
  },

  update: async (resource: any, params: { id: any; data: any; }) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      return httpClient(url, {
          method: 'PATCH',
          body: JSON.stringify(params.data),
      }).then(({ json }) => ({
          data: json,
      }));
  },
  delete: async (resource: any, params: { id: any; }) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      return httpClient(url, {
          method: 'DELETE',
      }).then(({ json }) => ({
          data: json,
      }));
  },
};