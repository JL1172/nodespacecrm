import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalNavigationContext } from "../contexts/GlobalNavigationContext";
import { IoArrowBack } from "react-icons/io5";
import FallingSpinner from "../components/LoadingSpinner";
import { Alert } from "@mui/material";
import { StyledSignIn } from "../styles/page-styles/StyledSignIn";

const defaultTheme = createTheme();

export default function ChangePassword() {
  const { ...state } = React.useContext(GlobalNavigationContext);
  return (
    <StyledSignIn>
      {state.resetData.firstStepGeneralError && (
        <Alert
          severity="error"
          sx={{ position: "fixed", top: "0", width: "100%", zIndex: 2 }}
        >
          {state.resetData.firstStepGeneralError}
        </Alert>
      )}
      {state.resetData.spinnerOn && <FallingSpinner />}
      {!state.resetData.spinnerOn && (
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
                  onChange={(e) => state.resetChange(e.target.name, e.target.value)}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={state.resetData.email}
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                {state.resetData.firstStepError && (
                  <Alert
                    variant="outlined"
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {state.resetData.firstStepError}
                  </Alert>
                )}
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    state.firstStepOfPswrdReset();
                  }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/sign-in" variant="body2">
                      Sign In
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={() => state.nav("/sign-up")}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </StyledSignIn>
    //   );
  );
}
