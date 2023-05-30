import { Components } from "react-markdown";
import AlertIcon from "../../../icons/AlertIcon";

const ImgComponent: Components["img"] = (props) => {
  console.log(props);

  return (
    <p className="text-2xl text-red-600 flex items-center gap-2">
      <AlertIcon className="inline" />
      <span>No jodas con tu imagen papa</span>
    </p>
  );
};

export default ImgComponent;
