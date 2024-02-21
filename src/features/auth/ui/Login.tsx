import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { LoginParams } from "../api/authApi.types";

type FormikError = Partial<Omit<LoginParams, "captcha">>;

export const Login = () => {
  const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const { touched, errors, handleSubmit, getFieldProps } =
    useFormik<LoginParams>({
      initialValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
      onSubmit: (values, formikHelpers) => {
        alert(JSON.stringify(values));
      },
      validate: (values: LoginParams) => {
        const errors: FormikError = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (!EMAIL_REGEXP.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 3) {
          errors.password = "Password should be 3 or more characters longs";
        }
        return errors;
      },
    });

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...getFieldProps("email")}
              />
              {touched.email && errors.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...getFieldProps("password")}
              />
              {touched.password && errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
