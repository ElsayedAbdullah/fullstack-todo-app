import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import InputErrorMsg from "./ui/InputErrorMsg";
import { axiosInstance } from "../config/axios.config";
import { userData } from "../data";
import toast from "react-hot-toast";
import { IFormInput } from "../interfaces";

interface IAddModal {
  isOpenAddModal: boolean;
  isUpdating: boolean;
  closeAddModal: () => void;
  setIsOpenAddModal: (val: boolean) => void;
  setIsUpdating: (val: boolean) => void;
  setQueryVersion: (update: (prev: number) => number) => void;
}

const AddModal = ({
  isOpenAddModal,
  closeAddModal,
  setIsOpenAddModal,
  setQueryVersion,
  setIsUpdating,
  isUpdating,
}: IAddModal) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { title, body } = data;
    setIsUpdating(true);
    try {
      const { status } = await axiosInstance.post(
        `/todos`,
        { data: { title, body, user: userData.user.id } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeAddModal();
        setQueryVersion((prev: number) => prev + 1);
        toast.success("Todo Added Successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpenAddModal} closeModal={closeAddModal} title="Add Todo">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 mt-3">
          <div>
            <Input
              type="text"
              {...register("title", { required: true, minLength: 6 })}
            />
            {errors?.title && errors?.title.type === "required" && (
              <InputErrorMsg msg="Title is required" />
            )}
            {errors?.title && errors?.title.type === "minLength" && (
              <InputErrorMsg msg="Title should be at least 6 characters" />
            )}
          </div>
          <Textarea {...register("body")} />
        </div>
        <div className="mt-4 space-x-3">
          <Button isLoading={isUpdating} type="submit" size={"sm"}>
            Add
          </Button>
          <Button
            variant={"cancel"}
            type="reset"
            size={"sm"}
            onClick={() => setIsOpenAddModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;
