import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin, Resource, useStoreContext } from 'react-admin';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import LayoutPrincipal from './screens/LayoutPrincipal';
import LayoutTemplates from './screens/LayoutTemplates';
import Login from './screens/Login';
import LayoutEdit from './screens/LayoutEdit';
import { themes, ThemeName } from './themes/themes';
import Layout from './layouts/Layout';
import { useStore, localStorageStore, StoreContextProvider } from 'react-admin';
import FormView from './screens/FormView';
import { UserList } from './screens/UserList';
import { UserDetail } from './screens/UserDetail';
import { ResponseList } from './screens/ResponseList';
import { ResponseShow } from './screens/ResponseShow';

const store = localStorageStore(undefined, 'DashboardForms');
const App = () => {
  const [themeName] = useStore<ThemeName>('themeName', 'house');
  console.log('THEME',themeName)
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  const store = useStoreContext();
  console.log(store)

  useEffect(()=> {
    console.log(themeName)
  },[themeName])

  return (
    
        <Routes>
          {/* Rutas fuera de la administración */}
          <Route path="/form/:userId/:formId" element={<FormView />} />
          {/* Otras rutas personalizadas si es necesario */}
          
          {/* Rutas de administración */}
          <Route
            index
            path="/admin/*"
            element={
              <StoreContextProvider value={store}>
              <Admin
                title='Forms Dashboard'
                basename='/admin'
                layout={Layout}
                loginPage={Login}
                store={store}
                dataProvider={dataProvider}
                authProvider={authProvider}
                lightTheme={lightTheme}
                darkTheme={darkTheme}
                defaultTheme="light"
              >
                <Resource name="Create" 
                icon={EditCalendarIcon} 
                list={LayoutPrincipal} />
                <Resource name="Templates" list={LayoutTemplates} edit={LayoutEdit} />
                <Resource name="Responses" icon={QuestionAnswerIcon} list={ResponseList} show={ResponseShow}/>
                <Resource name="Users" icon={SupervisorAccountIcon} 
                list={UserList} edit={UserDetail} 
                recordRepresentation={(record) => {
                  console.log(record)
                  return `${record.displayName}`
                }}/>
              </Admin>
              </StoreContextProvider>
            }
          />
          
          {/* Ruta por defecto, por ejemplo, redirigir a la administración */}
        </Routes>
  );
};

export default App;
