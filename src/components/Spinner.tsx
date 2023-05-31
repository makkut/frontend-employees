import { FC } from "react";
import GridLoader from "react-spinners/GridLoader";

const Spinner: FC = () => {
  return (
    <div className="flex justify-center items-center absolute ">
      <GridLoader
        color="red"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
export default Spinner;
