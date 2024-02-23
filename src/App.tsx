import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  nanoLightTheme,
  houseDarkTheme
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { chiptuneTheme } from "./themes/chiptune";
import LayoutPrincipal from "./screens/LayoutPrincipal";
import LayoutTemplates from "./screens/LayoutTemplates";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Login from "./screens/Login";

export const App = () => (
  <Admin 
    basename="/login"
    loginPage={Login}
    dataProvider={dataProvider} 
    authProvider={authProvider}
    theme={chiptuneTheme}
    >
      <Resource name="Create" icon={EditCalendarIcon} list={LayoutPrincipal} />
      <Resource name="Templates" list={LayoutTemplates} />
  </Admin>
);
