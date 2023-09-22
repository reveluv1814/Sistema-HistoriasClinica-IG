import React from "react";

const ComposicionFView = ({ composicionesF }) => {
  return (
    <>
      <div className="p-4">
        <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-500 w-full">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-1">Composición de la Familia</h2>
            <hr className="mb-4 border border-sky-700 shadow w-full" style={{ width: "100%" }}/>
            <div className="flex flex-row flex-wrap">
              {composicionesF.length === 0 ? (
                <span className="text-xl italic font-medium">Sin datos ...</span>
              ) : (
                <span>Holaaa</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComposicionFView;
