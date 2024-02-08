import React from "react";
import { BeatLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="text-center d-flex justify-content-center">
      <div className="m-1">
        <BeatLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default Loading;
