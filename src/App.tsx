import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
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

const store = localStorageStore(undefined, 'DashboardForms');
const App = () => {
  const [themeName] = useStore<ThemeName>('themeName', 'house');


  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;

  return (
    <StoreContextProvider value={store}>
        <Routes>
          {/* Rutas fuera de la administración */}
          <Route path="/form/:userId/:formId" element={<FormView />} />
          {/* Otras rutas personalizadas si es necesario */}
          
          {/* Rutas de administración */}
          <Route
            index
            path="/admin/*"
            element={
              <Admin
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
                <Resource name="Create" icon={EditCalendarIcon} list={LayoutPrincipal} />
                <Resource name="Templates" list={LayoutTemplates} edit={LayoutEdit} />
              </Admin>
            }
          />
          
          {/* Ruta por defecto, por ejemplo, redirigir a la administración */}
        </Routes>
    </StoreContextProvider>
  );
};

export default App;
