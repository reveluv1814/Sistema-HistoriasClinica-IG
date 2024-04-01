import ExFisico from "./ExploracionFViews/ExFisico";
import CraneoF from "./ExploracionFViews/CraneoF";
import Orejas from "./ExploracionFViews/Orejas";
import Ojos from "./ExploracionFViews/Ojos";
import Nariz from "./ExploracionFViews/Nariz";
import MaxMan from "./ExploracionFViews/MaxMan";
import Boca from "./ExploracionFViews/Boca";
import Cuello from "./ExploracionFViews/Cuello";
import Torax from "./ExploracionFViews/Torax";
import Columna from "./ExploracionFViews/Columna";
import Abdomen from "./ExploracionFViews/Abdomen";
import Miembros from "./ExploracionFViews/Miembros";
import GenitalesExt from "./ExploracionFViews/GenitalesExt";
import Tejido from "./ExploracionFViews/Tejido";
import Musculatura from "./ExploracionFViews/Musculatura";
import PielAnexos from "./ExploracionFViews/PielAnexos";
import ExNeurologico from "./ExploracionFViews/ExNeurologico";
import Collapse from "./../../components/Collapse";

const ExploracionFView = ({ exploracionF }) => {
  return (
    <>
      <div className="p-4">
        <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-700 w-full">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-1 dark:text-gray-300">
              Exploración Física
            </h2>
            <hr
              className="mb-4 border border-sky-700 shadow w-full dark:border-sky-800"
              style={{ width: "100%" }}
            />

            <div className="flex flex-row flex-wrap">
              {exploracionF == null ? (
                <span className="text-xl italic font-medium">
                  Sin datos ...
                </span>
              ) : (
                <>
                  <div className="flex flex-col w-full">
                    {/* ExFisico */}
                    <div>
                      <Collapse
                        label={"1. Examen Físico General"}
                        bgc={"bg-indigo-100"}
                        bgdark={"dark:bg-indigo-600"}
                      >
                        <ExFisico exploracionF={exploracionF} />
                      </Collapse>
                    </div>
                    {/* craneo */}
                    {exploracionF.craneoF !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"2. Craneo Facial"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <CraneoF craneoF={exploracionF.craneoF} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Orejas */}
                    {exploracionF.orejas !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"3. Orejas"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Orejas orejas={exploracionF.orejas} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Ojos */}
                    {exploracionF.ojos !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"4. Ojos"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Ojos ojos={exploracionF.ojos} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Nariz */}
                    {exploracionF.nariz !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"5. Nariz"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Nariz nariz={exploracionF.nariz} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* maxilar y mandibula */}
                    {exploracionF.maxMandibula !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"6. Maxilar y Mandíbula"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <MaxMan maxMandibula={exploracionF.maxMandibula} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Boca */}
                    {exploracionF.boca !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"7. Boca"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Boca boca={exploracionF.boca} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Cuello */}
                    {exploracionF.cuello !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"8. Cuello"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Cuello cuello={exploracionF.cuello} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Torax */}
                    {exploracionF.torax !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"9. Tórax"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Torax torax={exploracionF.torax} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Columna */}
                    {exploracionF.columna !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"10. Columna"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Columna columna={exploracionF.columna} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Abdomen */}
                    {exploracionF.abdomen !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"11. Abdomen"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Abdomen abdomen={exploracionF.abdomen} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Miembros */}
                    {exploracionF.miembros !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"12. Miembros"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Miembros miembros={exploracionF.miembros} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Genitales externos */}
                    {exploracionF.genitalesEx !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"13. Genitales Externos"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <GenitalesExt
                            genitalesEx={exploracionF.genitalesEx}
                          />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Tejido */}
                    {exploracionF.tejidoSub !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"14. Tejido Celular Subcutáneo"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Tejido tejidoSub={exploracionF.tejidoSub} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Musculatura */}
                    {exploracionF.musculatura !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"15. Musculatura"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <Musculatura musculatura={exploracionF.musculatura} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Piel y anexos */}
                    {exploracionF.pielAnexos !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"16. Piel y Anexos"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <PielAnexos pielAnexos={exploracionF.pielAnexos} />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* Examen Neurologiaco */}
                    {exploracionF.exNeurologico !== null ? (
                      <div className="mt-3">
                        <Collapse
                          label={"17. Exámen Neurológico"}
                          bgc={"bg-indigo-100"}
                          bgdark={"dark:bg-indigo-600"}
                        >
                          <ExNeurologico
                            exNeurologico={exploracionF.exNeurologico}
                          />
                        </Collapse>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploracionFView;
