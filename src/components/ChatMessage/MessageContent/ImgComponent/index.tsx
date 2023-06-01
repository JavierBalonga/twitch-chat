import { Components } from "react-markdown";
import ErrorComponent from "../../../ErrorComponent";

const ImgComponent: Components["img"] = () => {
  return <ErrorComponent error="No jodas con tu imagen papa" />;
};

export default ImgComponent;
