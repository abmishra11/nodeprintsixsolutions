import { Box, Button } from "@mui/material";
import { useLoginMutation } from "../../redux/services/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCredential, setToken, setRefreshToken } from "../../redux/reducer/auth";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  loginFormInput,
  loginFormSchema,
} from "../../utils/validation/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.email);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const defaultValue = {
    email: "",
    password: "",
  };

  const methods = useForm<loginFormInput>({
    defaultValues: defaultValue,
    resolver: zodResolver(loginFormSchema),
  });

  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    register,
  } = methods;

  const onSubmitHandler: SubmitHandler<loginFormInput> = async (value) => {
    try {
      const res = await login(value);

      if (res && res.data && res.data.token) {
        const token = res.data.token;
        const role = res.data?.role;

        toast.success("You are now logged in", {
          position: "top-center",
        });
        dispatch(setToken(token));
        dispatch(setRefreshToken(res?.data?.refreshToken))
        dispatch(setCredential(res.data));
        if(role === "ADMIN") {
          navigate("/dashboard");
        }else if(role === "VENDOR"){
          navigate("/vendor");
        }else{
          navigate("/customer");
        }
      } else {
        // Handle case where token is not present
        toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error
      toast.error("An error occurred during login. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="45vw"
      margin="auto"
      className="tp-contact-area pt-85 pb-85"
    >
      <Box
        border="1px solid #333"
        padding="40px"
        borderRadius="5px"
        className="container"
      >
        <div className="row">
          <div className="col-lg-10">
            <div
              className="section-title-wrapper-two mb-20 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <h4 className="heading-color-black text-center">
                Admin Panel Login
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="">
                  <div className="row custom-mar-20">
                    <div className="col-md-12 custom-pad-20">
                      <div className="tp-contact-form-field mb-20">
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          placeholder="youremail@gmail.com"
                        />
                        {errors?.email && <div className="text-danger">Email is required</div>}
                      </div>
                    </div>
                    <div className="col-md-12 custom-pad-20">
                      <div className="tp-contact-form-field mb-20">
                        <input
                          type="password"
                          {...register("password", { required: true })}
                          placeholder="Password"
                        />
                        {errors?.password && <div className="text-danger">Password is required</div>}
                      </div>
                    </div>

                    <div className="col-md-12 custom-pad-20">
                      <div className="tp-contact-form-field">
                        <Button
                          className="theme-btn"
                          type="submit"
                          variant="contained"
                        >
                          Login
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Login;
