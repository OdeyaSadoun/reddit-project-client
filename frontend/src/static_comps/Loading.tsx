import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="text-center d-flex justify-content-center">
      {/* <h2 className="lead" >Loading</h2> */}
      <div className="m-1">
        <BeatLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default Loading;
