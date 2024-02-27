interface IProps {
  msg: string;
}
const InputErrorMsg = ({ msg }: IProps) => {
  return msg ? (
    <span className="text-red-600 font-medium text-sm">{msg}</span>
  ) : null;
};

export default InputErrorMsg;
