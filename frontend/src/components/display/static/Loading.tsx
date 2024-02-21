import React from "react";
import { BeatLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="text-center d-flex justify-content-center">
      <div className="m-1">
        <BeatLoader color="#B0E3F6" />
      </div>
    </div>
  );
};

export default Loading;
