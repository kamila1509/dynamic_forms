import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import {
  Form,
  required,
  TextInput,
  useTranslate,
  useLogin,
  useNotify,
} from "react-admin";
import authProvider from "../authProvider";

import Box from "@mui/material/Box";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({});
  const translate = useTranslate();
  const [showLogin, setShowLogin] = useState(true)

  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();

  const handleSubmit = () => {
    setLoading(true);
    login(
      { username: email, password },
      location.state ? (location.state as any).nextPathname : "/admin"
    ).catch((error: Error) => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
        {
          type: "error",
          messageArgs: {
            _:
              typeof error === "string"
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        }
      );
    });
  };

  const handleSignUp = () => {
    setLoading(true);
    authProvider
      .signUp(newUser.email, newUser.password)
      .then(() => {
        login(
          { username: newUser.email, password: newUser.password },
          location.state ? (location.state as any).nextPathname : "/admin"
        );
        // El usuario se registró correctamente, puedes realizar acciones adicionales si es necesario
        console.log("Usuario registrado exitosamente");
      })
      .catch((error: Error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_up_error"
            : error.message,
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                  ? error.message
                  : undefined,
            },
          }
        );
      });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "grey",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Card sx={{ minWidth: 300, marginTop: "6em" }}>
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            Forms Dashboard
          </Box>

          {showLogin ? (
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  autoFocus
                  source="username"
                  label={"Email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="password"
                  label={translate("ra.auth.password")}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{ padding: "0 1em 1em 1em" }}>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  autoFocus
                  source="name"
                  label={"Name"}
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  autoFocus
                  source="username"
                  label={translate("ra.auth.username")}
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
              <Box sx={{ marginTop: "1em" }}>
                <TextInput
                  source="password"
                  label={translate("ra.auth.password")}
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  disabled={loading}
                  validate={required()}
                  fullWidth
                />
              </Box>
            </Box>
          )}

         {showLogin ? ( <Box><CardActions style={{ flexDirection: "column" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {translate("ra.auth.sign_in")}
            </Button>
            <Typography gutterBottom> or </Typography></CardActions></Box>): null}
            <CardActions style={{ flexDirection: "column" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={() => {
                setShowLogin(!showLogin)
                if(!showLogin) {
                    handleSignUp()
                }
              }}
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              Sign Up
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Login;

interface FormValues {
  username?: string;
  password?: string;
}
