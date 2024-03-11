import { Admin, Resource, houseDarkTheme, useStore, localStorageStore, StoreContextProvider, CustomRoutes} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import LayoutPrincipal from "./screens/LayoutPrincipal";
import LayoutTemplates from "./screens/LayoutTemplates";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Login from "./screens/Login";
import LayoutEdit from "./screens/LayoutEdit";
import { themes, ThemeName } from "./themes/themes";
import Layout from "./layouts/Layout";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import useThemeStore from "./store/themeStore";

const store = localStorageStore(undefined, 'DashboardForms');

const App = () => {
  const [themeName] = useStore<ThemeName>("themeName", "house");
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;

  return (
    <Admin
      basename="/login"
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
      <CustomRoutes>
            <Route path="/form" element={<div>TEST</div>} />
            {/* <Route path="/profile" element={<Profile />} /> */}
        </CustomRoutes>
    </Admin>
  );
};


const AppWrapper = () => (
  <StoreContextProvider value={store}>
      <App />
  </StoreContextProvider>
);

export default AppWrapper;