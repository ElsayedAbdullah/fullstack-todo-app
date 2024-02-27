import Button from "./ui/Button";
import { userData } from "../data";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { useState } from "react";
import { ITodo } from "../interfaces";
import { axiosInstance } from "../config/axios.config";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const TodoList = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    body: "",
  });

  const { isLoading, data } = useCustomQuery({
    queryKey: ["todoList", `${todoToEdit.id}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // Edit Modal Handlers
  const closeEditModal = () => {
    setTodoToEdit({ id: 0, title: "", body: "" });
    setIsOpenEditModal(false);
  };
  const openEditModal = (todo: ITodo) => {
    setIsOpenEditModal(true);
    setTodoToEdit(todo);
  };

  // Delete Modal Handlers
  const closeDeleteModal = () => {
    setTodoToEdit({ id: 0, title: "", body: "" });
    setIsOpenDeleteModal(false);
  };
  const openDeleteModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenDeleteModal(true);
  };

  // Update Todo
  const onChangeEditHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoToEdit({
      ...todoToEdit,
      [name]: value,
    });
  };

  const submitEditHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, body } = todoToEdit;

    if (!title) return;
    setIsUpdating(true);
    try {
      await axiosInstance.put(
        `/todos/${todoToEdit.id}`,
        { data: { title, body } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }

    closeEditModal();
  };

  // Delete Todo
  const submitDeleteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);
    try {
      await axiosInstance.delete(`/todos/${todoToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }

    closeDeleteModal();
  };

  if (isLoading) return <h3>loading....</h3>;

  return (
    <>
      <div className="space-y-1">
        {data?.data.todos.length ? (
          data?.data.todos.map((todo: { id: number; title: string }) => (
            <div
              key={todo.id}
              className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            >
              <p className="w-full font-semibold">{todo.title}</p>
              <div className="flex items-center justify-end w-full space-x-3">
                <Button
                  type="button"
                  size={"sm"}
                  onClick={() => openEditModal(todo)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant={"danger"}
                  size={"sm"}
                  onClick={() => openDeleteModal(todo)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No Todos yet!</p>
        )}
      </div>

      {/* EDIT MODAL */}
      <EditModal
        isUpdating={isUpdating}
        closeEditModal={closeEditModal}
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={setIsOpenEditModal}
        submitEditHandler={submitEditHandler}
        onChangeEditHandler={onChangeEditHandler}
        todoToEdit={todoToEdit}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        isUpdating={isUpdating}
        closeDeleteModal={closeDeleteModal}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        submitDeleteHandler={submitDeleteHandler}
      />
    </>
  );
};

export default TodoList;
