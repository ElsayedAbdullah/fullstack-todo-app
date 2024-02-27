import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { axiosInstance } from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IResponseError } from "../interfaces";
import InputErrorMsg from "../components/ui/InputErrorMsg";

interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // 1 loading [pending]
    setIsLoading(true);

    try {
      // 2 success [fulfilled]
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      if (status === 200) {
        toast.success("you logged in successfully", {
          duration: 1500,
          position: "top-center",
          style: {
            backgroundColor: "black",
            color: "white",
          },
        });
      }

      localStorage.setItem("loggedInUser", JSON.stringify(resData));

      setTimeout(() => {
        location.replace("/");
      }, 1500);
    } catch (error) {
      // 3 fail [rejected]
      const errorObj = error as AxiosError<IResponseError>;
      if (errorObj?.response?.data?.error?.message) {
        toast.error(errorObj?.response?.data?.error?.message, {
          duration: 1500,
          position: "top-center",
          style: {
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-center mb-5 text-2xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            placeholder="Email Address"
            type="email"
            {...register("identifier", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors?.identifier && errors?.identifier.type === "required" && (
            <InputErrorMsg msg="Email is required" />
          )}
          {errors?.identifier && errors?.identifier.type === "pattern" && (
            <InputErrorMsg msg="Email is not valid" />
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors?.password && errors?.password.type === "required" && (
            <InputErrorMsg msg="Password is required" />
          )}
          {errors?.password && errors?.password.type === "minLength" && (
            <InputErrorMsg msg="Password should be at least 6 characters" />
          )}
        </div>

        <Button size={"sm"} type="submit" fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
