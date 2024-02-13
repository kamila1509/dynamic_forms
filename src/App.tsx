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

export const App = () => (
  <Admin 
    dataProvider={dataProvider} 
    authProvider={authProvider}
    theme={chiptuneTheme}
    >
      <Resource name="posts" list={LayoutPrincipal} />
  </Admin>
);
