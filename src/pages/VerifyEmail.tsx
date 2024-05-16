import {
  Alert,
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { StyledVerificationCodePage } from "../styles/page-styles/StyledVerificationCodePage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GlobalNavigationContext } from "../contexts/GlobalNavigationContext";
import { useContext, useEffect } from "react";
import FallingSpinner from "../components/LoadingSpinner";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import { green } from "@mui/material/colors";
import SaveIcon from "@mui/icons-material/Save";

const buttonSx = {
  fontFamily: "inherit",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  height: "3rem",
  width: "20rem",
  bgcolor: green[500],
  "&:hover": {
    bgcolor: green[700],
  },
};

export default function VerifyEmail() {
  const { ...state } = useContext(GlobalNavigationContext);
  useEffect(() => {
    const length = state.verifyEmailData.verification_code.filter(
      (n) => n
    ).length;
    if (length === 6) {
      state.submitVerificationCode();
    }
  }, [state.verifyEmailData.verification_code]); //eslint-disable-line
  return state.verifyEmailData.verifyEmailSpinner ? (
    <FallingSpinner />
  ) : (
    <StyledVerificationCodePage>
      {state.verifyEmailData.generalErrorForVerifyEmail && (
        <Alert
          severity="error"
          sx={{ position: "fixed", top: "0", width: "100%", zIndex: 2 }}
        >
          {state.verifyEmailData.generalErrorForVerifyEmail}
        </Alert>
      )}
      {state.registerData.redirectSuccessMessage && (
        <Alert
          variant="filled"
          style={{ top: "0", position: "fixed", width: "100%" }}
          severity="success"
        >
          {state.registerData.redirectSuccessMessage}
        </Alert>
      )}
      {state.verifyEmailData.successMessageForEmailVerification && (
        <Alert
          variant="filled"
          style={{ top: "0", position: "fixed", width: "100%" }}
          severity="success"
        >
          {state.verifyEmailData.successMessageForEmailVerification}
        </Alert>
      )}
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Enter Verification Code
      </Typography>
      <div id="input-boxes">
        <TextField
          className="text-field"
          //   input
          onChange={(e) => state.changeVerifyEmailData(e.target.value, 0)}
          sx={{ marginRight: ".2rem" }}
          required
          //   fullWidth
          label=""
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" }, // Apply center alignment
          }}
          value={state.verifyEmailData.verification_code[0]}
          name="verification_code"
          autoComplete="verification_code"
        />
        <TextField
          className="text-field"
          onChange={(e) => state.changeVerifyEmailData(e.target.value, 1)}
          // margin="normal"
          sx={{ marginRight: ".2rem" }}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" }, // Apply center alignment
          }}
          required
          label=""
          value={state.verifyEmailData.verification_code[1]}
          name="verification_code"
          autoComplete="verification_code"
        />
        <TextField
          className="text-field"
          onChange={(e) => state.changeVerifyEmailData(e.target.value, 2)}
          required
          sx={{ marginRight: ".2rem" }}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" }, // Apply center alignment
          }}
          label=""
          value={state.verifyEmailData.verification_code[2]}
          name="verification_code"
          autoComplete="verification_code"
        />
        <TextField
          className="text-field"
          onChange={(e) => state.changeVerifyEmailData(e.target.value, 3)}
          sx={{ marginRight: ".2rem" }}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" }, // Apply center alignment
          }}
          required
          label=""
          value={state.verifyEmailData.verification_code[3]}
          name="verification_code"
          autoComplete="verification_code"
        />
        <TextField
          onChange={(e) => state.changeVerifyEmailData(e.target.value, 4)}
          sx={{ marginRight: ".2rem" }}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" }, // Apply center alignment
          }}
          required
          id="verification-code"
          className="text-field"
          label=""
          value={state.verifyEmailData.verification_code[4]}
          autoComplete="verification_code"
        />
        <TextField
          onChange={(e) => state.changeVerifyEmailData(e.target.value, 5)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" }, // Apply center alignment
          }}
          required
          className="text-field"
          label=""
          value={state.verifyEmailData.verification_code[5]}
          name="verification_code"
          autoComplete="verification_code"
        />
      </div>
      {state.verifyEmailData.emailErrorMessage && (
        <Grid item xs={12} sx={{ width: "20rem", marginBottom: "2rem" }}>
          <TextField
            required
            fullWidth
            onChange={(e) => state.handleChangeForEmail(e.target.value)}
            value={state.verifyEmailData.email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
      )}
      {state.verifyEmailData.loadingSpinner === true &&
      state.verifyEmailData.successfullySentSpinner === false ? (
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          sx={{
            bgcolor: "white",
            color: "blue",
            fontFamily: "inherit",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            marginBottom: "1rem",
            height: "3rem",
            width: "20rem",
          }}
          id="button"
        >
          Loading...
        </LoadingButton>
      ) : state.verifyEmailData.loadingSpinner === false &&
        state.verifyEmailData.successfullySentSpinner === true ? (
        <Button sx={buttonSx} variant="contained">
          <CheckIcon sx={{ marginRight: "1rem" }} />
          Successfully Sent
        </Button>
      ) : (
        state.verifyEmailData.loadingSpinner === false &&
        state.verifyEmailData.successfullySentSpinner === false && (
          <Button
            onClick={async () => await state.generateNewVerificationCode()}
            sx={{
              bgcolor: "white",
              color: "black",
              fontFamily: "inherit",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              height: "3rem",
              width: "20rem",
              "&:hover": {
                bgcolor: "transparent",
                color: "white",
              },
            }}
            id="button"
            variant="contained"
          >
            Send New Verification Code
          </Button>
        )
      )}
    </StyledVerificationCodePage>
  );
}
