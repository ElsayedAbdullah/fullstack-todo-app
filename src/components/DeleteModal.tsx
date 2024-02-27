import Button from "./ui/Button";
import Modal from "./ui/Modal";

interface IDeleteModal {
  isOpenDeleteModal: boolean;
  isUpdating: boolean;
  closeDeleteModal: () => void;
  setIsOpenDeleteModal: (val: boolean) => void;
  submitDeleteHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const DeleteModal = ({
  isOpenDeleteModal,
  closeDeleteModal,
  submitDeleteHandler,
  setIsOpenDeleteModal,
  isUpdating,
}: IDeleteModal) => {
  return (
    <Modal
      isOpen={isOpenDeleteModal}
      closeModal={closeDeleteModal}
      title="Delete Todo"
      description="Are you sure to delete this todo?"
    >
      <form onSubmit={submitDeleteHandler}>
        <div className="mt-4 space-x-3">
          <Button
            isLoading={isUpdating}
            variant={"danger"}
            type="submit"
            size={"sm"}
          >
            Delete
          </Button>
          <Button
            variant={"cancel"}
            type="reset"
            size={"sm"}
            onClick={() => setIsOpenDeleteModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteModal;
