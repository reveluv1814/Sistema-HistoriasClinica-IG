import "./../layouts/css/additional-styles/collapse.css";
import React, { useRef, useState, useEffect } from "react";

const Collapse = ({ label, children,bgc, bgdark }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = open
        ? contentRef.current.scrollHeight + "px"
        : "0px";
    }
  }, [open]);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        className={`w-full ${bgc} ${bgdark} cursor-pointer shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md p-3 flex justify-between items-center`}
        onClick={toggle}
      >
        <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-zinc-300">
          {label}
        </h2>
        {open ? (
          <svg
            viewBox="0 -4.5 20 20"
            width={24}
            height={24}
            version="1.1"
            fill=""
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>arrow_up [#337]</title> <desc>Created with Sketch.</desc>{" "}
              <defs> </defs>{" "}
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-260.000000, -6684.000000)"
                  fill="rgb(3 105 161)"
                >
                  {" "}
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    {" "}
                    <path
                      d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378"
                      id="arrow_up-[#337]"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        ) : (
          <svg
            viewBox="0 -4.5 20 20"
            version="1.1"
            fill="#000000"
            width={24}
            height={24}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>arrow_down [#338]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-220.000000, -6684.000000)"
                  fill="rgb(3 105 161)"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                      id="arrow_down-[#338]"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        )}
      </div>
      {open && (
        <div className="content-parent" ref={contentRef}>
          <div className="content">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Collapse;
