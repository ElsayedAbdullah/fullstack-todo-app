import { ITodo } from "../interfaces";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";

interface IEditModal {
  todoToEdit: ITodo;
  isOpenEditModal: boolean;
  isUpdating: boolean;
  closeEditModal: () => void;
  setIsOpenEditModal: (val: boolean) => void;
  submitEditHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChangeEditHandler: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const EditModal = ({
  todoToEdit,
  isOpenEditModal,
  closeEditModal,
  submitEditHandler,
  setIsOpenEditModal,
  isUpdating,
  onChangeEditHandler,
}: IEditModal) => {
  return (
    <Modal
      isOpen={isOpenEditModal}
      closeModal={closeEditModal}
      title="Edit Todo"
    >
      <form onSubmit={submitEditHandler}>
        <div className="space-y-3 mt-3">
          <Input
            value={todoToEdit.title}
            name="title"
            onChange={onChangeEditHandler}
          />
          <Textarea
            value={todoToEdit.body}
            name="body"
            onChange={onChangeEditHandler}
          />
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
