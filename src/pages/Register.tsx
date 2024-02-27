import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { useState } from "react";
import { axiosInstance } from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IResponseError } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success("you registered successfully", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "black",
            color: "white",
          },
        });
      }

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // 3 fail [rejected]
      const errorObj = error as AxiosError<IResponseError>;
      if (errorObj?.response?.data?.error?.message) {
        toast.error(errorObj?.response?.data?.error?.message, {
          duration: 3000,
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
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            placeholder="Username"
            {...register("username", { required: true, minLength: 5 })}
          />
          {errors?.username && errors?.username.type === "required" && (
            <InputErrorMsg msg="Username is required" />
          )}
          {errors?.username && errors?.username.type === "minLength" && (
            <InputErrorMsg msg="Username should be at least 5 characters" />
          )}
        </div>
        <div>
          <Input
            placeholder="Email Address"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors?.email && errors?.email.type === "required" && (
            <InputErrorMsg msg="Email is required" />
          )}
          {errors?.email && errors?.email.type === "pattern" && (
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

        <Button type="submit" fullWidth isLoading={isLoading}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
