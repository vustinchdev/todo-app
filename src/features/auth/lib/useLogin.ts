import { useAppDispatch, useAppSelector } from "common/hooks";
import { useFormik } from "formik";
import { LoginParams } from "../api/authApi.types";
import { selectIsLoggedIn, authActions } from "../model/authSlice";

type FormikError = Partial<Omit<LoginParams, "captcha">>;

export const useLogin = () => {
  const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { touched, errors, handleSubmit, getFieldProps } =
    useFormik<LoginParams>({
      initialValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
      onSubmit: (values) => {
        dispatch(authActions.login(values));
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

  return { isLoggedIn, touched, errors, handleSubmit, getFieldProps };
};
