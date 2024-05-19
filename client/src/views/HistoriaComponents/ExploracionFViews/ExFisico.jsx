import React from "react";

const ExFisico = ({ exploracionF }) => {
  return (
    <div>
      <div className="flex flex-row flex-wrap">
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Peso:</span>{" "}
          {exploracionF.peso || "-"}
          {" gr. / "}
          {exploracionF.peso_porcentaje || "- "}%
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Talla:</span>{" "}
          {exploracionF.talla || "-"}
          {" cm. / "}
          {exploracionF.talla_porcentaje || "- "}%
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">PC:</span>{" "}
          {exploracionF.pc || "-"}
          {" cm. / "}
          {exploracionF.pc_porcentaje || "- "}%
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">PT:</span>{" "}
          {exploracionF.pt || "-"}
          {" cm. / "}
          {exploracionF.pt_porcentaje || "- "}%
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Envergadura:</span>{" "}
          {exploracionF.envergadura || "-"}
          {" cm."}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">DII:</span>{" "}
          {exploracionF.dii || "-"}
          {" mm. / "}
          {exploracionF.dii_porcentaje || "- "}%
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Seg. Sup:</span>{" "}
          {exploracionF.seg_sup || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Seg. Inf:</span>{" "}
          {exploracionF.seg_inf || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">
            Distancia intermamilar:
          </span>{" "}
          {exploracionF.distancia_inter || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Bregma:</span>{" "}
          {exploracionF.bregma || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">
            Largo de manao D:
          </span>{" "}
          {exploracionF.largo_manoD || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">
            Largo dedo medio D:
          </span>{" "}
          {exploracionF.largo_dedoMD || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">
            Distancia intercantal interna:
          </span>{" "}
          {exploracionF.distancia_intercantal || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">
            Largo de mano I:
          </span>{" "}
          {exploracionF.largo_manoI || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">
            Largo dedo medio I:
          </span>{" "}
          {exploracionF.largo_dedoMI || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Oreja D:</span>{" "}
          {exploracionF.orejaD || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Oreja I:</span>{" "}
          {exploracionF.orejaI || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Pie D:</span>{" "}
          {exploracionF.pieD || "-"}
        </p>
        <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
          <span className="font-semibold dark:text-gray-300">Pie I:</span>{" "}
          {exploracionF.pieI || "-"}
        </p>
        <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
      </div>
    </div>
  );
};

export default ExFisico;
