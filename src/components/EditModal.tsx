import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput, ITodo } from "../interfaces";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import InputErrorMsg from "./ui/InputErrorMsg";
import { axiosInstance } from "../config/axios.config";
import { userData } from "../data";

interface IEditModal {
  todoToEdit: ITodo;
  isOpenEditModal: boolean;
  isUpdating: boolean;
  closeEditModal: () => void;
  setIsOpenEditModal: (val: boolean) => void;
  setIsUpdating: (val: boolean) => void;
  setQueryVersion: (update: (prev: number) => number) => void;
}

const EditModal = ({
  todoToEdit,
  isOpenEditModal,
  closeEditModal,
  setIsOpenEditModal,
  setIsUpdating,
  setQueryVersion,
  isUpdating,
}: IEditModal) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { title, body } = data;

    if (!title) return;
    setIsUpdating(true);
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        { data: { title, body } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeEditModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Modal
      isOpen={isOpenEditModal}
      closeModal={closeEditModal}
      title="Edit Todo"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3 mt-3">
          <div>
            <Input
              type="text"
              defaultValue={todoToEdit.title}
              {...register("title", { required: true, minLength: 6 })}
            />
            {errors?.title && errors?.title.type === "required" && (
              <InputErrorMsg msg="Title is required" />
            )}
            {errors?.title && errors?.title.type === "minLength" && (
              <InputErrorMsg msg="Title should be at least 6 characters" />
            )}
          </div>
          <Textarea defaultValue={todoToEdit.body} />
        </div>
        <div className="mt-4 space-x-3">
          <Button isLoading={isUpdating} type="submit" size={"sm"}>
            Update
          </Button>
          <Button
            variant={"cancel"}
            type="reset"
            size={"sm"}
            onClick={() => setIsOpenEditModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
