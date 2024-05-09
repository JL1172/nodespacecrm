import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalNavigationContext } from "../contexts/GlobalNavigationContext";
import { IoArrowBack } from "react-icons/io5";
import FallingSpinner from "../components/LoadingSpinner";
import { Alert } from "@mui/material";
import { StyledSignIn } from "../styles/StyledSignIn";

const defaultTheme = createTheme();

export default function ResetPassword() {
  const { ...state } = React.useContext(GlobalNavigationContext);
  return state.resetData.spinnerOn ? (
    <FallingSpinner />
  ) : (
    <StyledSignIn>
      {state.resetData.thirdStepGeneralError && (
        <Alert
          severity="error"
          sx={{ position: "fixed", top: "0", width: "100%", zIndex: 2 }}
        >
          {state.resetData.thirdStepGeneralError}
        </Alert>
      )}
      {state.resetData.secondStepSuccess && (
        <Alert
          variant="filled"
          style={{ top: "0", position: "fixed", width: "100%", zIndex: 2 }}
          severity="success"
        >
          {state.resetData.secondStepSuccess}
        </Alert>
      )}
      <ThemeProvider theme={defaultTheme}>
        <IoArrowBack
          onClick={() => state.nav("/")}
          id="arrow-pointer"
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            width: "1.2rem",
            height: "1.2rem",
            cursor: "pointer",
          }}
        />
        <Container
          component="main"
          sx={{
            height: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Box
            className="box"
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box
              className="inner-box"
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <TextField
                onChange={(e) =>
                  state.resetChange(e.target.name, e.target.value)
                }
                margin="normal"
                required
                type="password"
                fullWidth
                id="password"
                label="Password"
                value={state.resetData.password}
                name="password"
                autoComplete="password"
                autoFocus
              />
              {state.resetData.thirdStepError && (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {Object.values(state.resetData.thirdStepError).map((n, i) => {
                    return (
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                        key={i}
                      >
                        {n}
                      </span>
                    );
                  })}
                </Alert>
              )}
              <TextField
                onChange={(e) =>
                  state.resetChange(e.target.name, e.target.value)
                }
                margin="normal"
                required
                type="password"
                fullWidth
                id="confirmedPassword"
                label="Confirmed Password"
                value={state.resetData.confirmedPassword}
                name="confirmedPassword"
                autoComplete="confirmedPassword"
                autoFocus
              />
              {state.resetData.thirdStepError && (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {Object.values(state.resetData.thirdStepError).map((n, i) => {
                    return (
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                        key={i}
                      >
                        {n}
                      </span>
                    );
                  })}
                </Alert>
              )}
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  state.thirdStepOfPasswordResetProcess();
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </StyledSignIn>
  );
  //   );
}
