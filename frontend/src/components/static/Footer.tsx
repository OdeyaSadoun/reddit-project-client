import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-around text-center">
          <div>
            <a href="#">
              <i
                className="px-3 my-2 fa fa-2x fa-facebook-square text-black"
                aria-hidden="true"
              ></i>
            </a>
            <a href="#">
              <i
                className="px-3 my-2 fa fa-2x fa-twitter-square text-black"
                aria-hidden="true"
              ></i>
            </a>
            <a href="#">
              <i
                className="px-3 my-2 fa fa-2x fa-instagram text-black"
                aria-hidden="true"
              ></i>
            </a>
            <a href="https://www.youtube.com/@out2in-siders" target="_blank">
              <i
                className="px-3 my-2 fa fa-2x fa-youtube-play text-black"
                aria-hidden="true"
              ></i>
            </a>
          </div>
          <p className="mb-1">&copy; Odeya Sadoun | reddit project | 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
