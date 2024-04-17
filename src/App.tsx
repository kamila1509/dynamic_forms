import React, { useEffect, useState } from 'react';
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

import useUserStore from "./store/userStore";
import ThankYouPage from './screens/ThankYou';
import NotFoundPage from './screens/NotFoundPage/NotFoundPage';

const store = localStorageStore(undefined, 'DashboardForms');
const App = () => {
  const [themeName] = useStore<ThemeName>('themeName', 'house');
  console.log('THEME',themeName)
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  const store = useStoreContext();
  const [role, setRole] = useState('')
  useEffect(() => {
    // Suscribirse a los cambios en formStructure
    const unsubscribe = useUserStore.subscribe(
      (user) => {
        let role
        if (user.user?.reloadUserInfo) {
          role =  JSON.parse(user.user?.reloadUserInfo?.customAttributes).role
        }
        setRole(role)
        console.log("user  ha cambiado:", user);
      },
      (state) => state.user
    );

    // Devolver la función de limpieza para desuscribirse cuando el componente se desmonta
    return unsubscribe;
  }, [role]);

  return (
    
        <Routes>
          {/* Rutas fuera de la administración */}
          <Route path="/form/:userId/:formId" element={<FormView />} />
          <Route path="/success" element={<ThankYouPage/>} />
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
                {role === 'admin' ? (<Resource name="Users" icon={SupervisorAccountIcon} 
                list={UserList} edit={UserDetail}/>): null }
              </Admin>
              </StoreContextProvider>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
  );
};

export default App;
