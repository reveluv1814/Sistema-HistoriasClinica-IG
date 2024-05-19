import React from "react";

const AntecedentePView = ({ antecedenteP }) => {
  return (
    <>
      <div className="p-4">
        <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-700 w-full">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-1 dark:text-gray-300">Antecedentes Personales</h2>
            <hr className="mb-4 border border-sky-700 shadow w-full dark:border-sky-800" style={{ width: "100%" }}/>
            <div className="flex flex-row flex-wrap">
              {antecedenteP == null ? (
                <span className="text-xl italic font-medium">Sin datos ...</span>
              ) : (
                <div className="flex flex-col w-full">
                  <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-sky-700">1. Gestación</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                      <span className="font-semibold dark:text-gray-300">Gesta:</span>{" "}
                      {antecedenteP.g_embarazo || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                      <span className="font-semibold dark:text-gray-300">Obs.:</span>{" "}
                      {antecedenteP.g_obs || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-sky-700">2. Patologías en el embarazo</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">Fiebre:</span>{" "}
                            {antecedenteP.pat_fiebre !== null ? (
                                antecedenteP.pat_fiebre ? (
                                  <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">Enf. Infec.:</span>{" "}
                            {antecedenteP.pat_enfInfec !== null ? (
                                antecedenteP.pat_enfInfec ? (
                                  <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                              
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">Diabetes:</span>{" "}
                            {antecedenteP.pat_diabetes !== null ? (
                                antecedenteP.pat_diabetes ? (
                                  <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                          <span className="font-semibold dark:text-gray-300">Epilepsia:</span>{" "}
                            {antecedenteP.pat_epilepsia !== null ? (
                                antecedenteP.pat_epilepsia ? (
                                  <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base">
                      <span className="font-semibold dark:text-gray-300">Otras enfermedades crónicas:</span>{" "}
                      {antecedenteP.pat_otras || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-sky-700">3. Factores físicos durante el embarazo</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                            <span className="font-semibold dark:text-gray-300">Rayos X:</span>{" "}
                              {antecedenteP.factFis_rayosx !== null ? (
                                  antecedenteP.factFis_rayosx ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>  
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                            <span className="font-semibold dark:text-gray-300">Ecografia:</span>{" "}
                              {antecedenteP.factFis_ecografia !== null ? (
                                  antecedenteP.factFis_ecografia ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base">
                      <span className="font-semibold dark:text-gray-300">Lugar donde se realizó:</span>{" "}
                      {antecedenteP.factFis_lugar || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base">
                      <span className="font-semibold dark:text-gray-300">Nº de veces:</span>{" "}
                      {antecedenteP.factFis_numVeces || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-sky-700">4. Factores químicos durante la gestación</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                        <span className="font-semibold dark:text-gray-300">Fármacos anticonvulsivantes:</span>{" "}
                        {antecedenteP.factQuim_farmacos || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                        <span className="font-semibold dark:text-gray-300">otros:</span>{" "}
                        {antecedenteP.factQuim_farmOtros || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base capitalize">
                        <span className="font-semibold dark:text-gray-300">Anticonceptivos orales:</span>{" "}
                        {antecedenteP.factQuim_anticonceptivos || 'sin dato...'}
                    </p>
                    <p className="w-full  mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Gestágenos para evitar AB:</span>{" "}
                        {antecedenteP.fact_Quim_gestagenosAB || 'sin dato...'}
                    </p>
                    <p className="w-full  mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Exposición Profesional:</span>{" "}
                        {antecedenteP.factQuim_expProfesional || 'sin dato...'}
                    </p>
                    <p className="w-full mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Enolismo:</span>{" "}
                        {antecedenteP.factQuim_enolismo || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-sky-700">5. Observaciones durante la gestación</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Gesta:</span>{" "}
                        {antecedenteP.gesta || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Para:</span>{" "}
                        {antecedenteP.gesta_para || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Nº Nativivos:</span>{" "}
                        {antecedenteP.gesta_nroNativivos || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Malformados:</span>{" "}
                        {antecedenteP.gesta_malformados || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Nº Natimortos:</span>{" "}
                        {antecedenteP.gesta_nroNatimortos || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Nº AB:</span>{" "}
                        {antecedenteP.gesta_nroAB || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Exp.:</span>{" "}
                        {antecedenteP.gesta_exp || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Ind. de uso de anticonceptivos:</span>{" "}
                        {antecedenteP.gesta_anticonceptivos !== null ? (
                                  antecedenteP.gesta_anticonceptivos ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Tipo:</span>{" "}
                        {antecedenteP.gesta_anticonsTipo || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Período entre 1º y 2º gestación:</span>{" "}
                        {antecedenteP.gesta_periodo_1_2 || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Período entre 2º y 3º gestación:</span>{" "}
                        {antecedenteP.gesta_periodo_2_3 || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Período entre 3º y 4º gestación:</span>{" "}
                        {antecedenteP.gesta_periodo_3_4 || 'sin dato...'}
                    </p>
                    <p className="w-full text-base mb-2">
                        <span className="font-semibold dark:text-gray-300">Período de uso:</span>{" "}
                        {antecedenteP.gesta_periodoUso || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-sky-700">6. Parto</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full text-base mb-2">
                        <span className="font-semibold dark:text-gray-300">Parto:</span>{" "}
                        {antecedenteP.parto || 'sin dato...'}
                    </p>
                    <p className="w-full text-base mb-2">
                        <span className="font-semibold dark:text-gray-300">¿Por que?:</span>{" "}
                        {antecedenteP.parto_porque || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full dark:bg-gray-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-1 text-sky-600 dark:text-sky-700">7. Datos del nacimiento</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Peso:</span>{" "}
                          {antecedenteP.dn_peso || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Talla:</span>{" "}
                          {antecedenteP.dn_talla || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">PC:</span>{" "}
                          {antecedenteP.dn_pc || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">APGAR:</span>{" "}
                          {antecedenteP.dn_apgar || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Llanto:</span>{" "}
                          {antecedenteP.dn_llanto || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Cianosis:</span>{" "}
                          {antecedenteP.dn_cianosis || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Oxígeno terapia:</span>{" "}
                          {antecedenteP.dn_oxigeno || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Incubadora:</span>{" "}
                          {antecedenteP.dn_incubadora || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Ictericia Neonatal:</span>{" "}
                          {antecedenteP.dn_ictericia || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Fototerapia:</span>{" "}
                        {antecedenteP.dn_fotop !== null ? (
                                  antecedenteP.dn_fotop ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Exsanguineo:</span>{" "}
                        {antecedenteP.dn_exsanguineo !== null ? (
                                  antecedenteP.dn_exsanguineo ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Fiebre:</span>{" "}
                        {antecedenteP.dn_exsan_fiebre !== null ? (
                                  antecedenteP.dn_exsan_fiebre ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-base ">
                        <span className="font-semibold dark:text-gray-300">Convulsiones:</span>{" "}
                        {antecedenteP.dn_exsan_convul !== null ? (
                                  antecedenteP.dn_exsan_convul ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Hemorragias:</span>{" "}
                          {antecedenteP.dn_hemorragia || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Inicio:</span>{" "}
                          {antecedenteP.dn_hemoIni || 'sin dato...'}
                    </p>
                    <p className="w-full text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Duración:</span>{" "}
                          {antecedenteP.dn_hemoDura || 'sin dato...'}
                    </p>
                    <h3 className="text-base font-semibold mb-1 w-full text-indigo-500 dark:text-indigo-600">Otras alteraciones</h3>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Criptorquidea:</span>{" "}
                          {antecedenteP.dn_altCriptorquidea !== null ? (
                                  antecedenteP.dn_altCriptorquidea ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Cardiopatía Congénita:</span>{" "}
                          {antecedenteP.dn_altCardiopatia !== null ? (
                                  antecedenteP.dn_altCardiopatia ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">FLAP:</span>{" "}
                          {antecedenteP.dn_altFlap !== null ? (
                                  antecedenteP.dn_altFlap ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Atresia anal:</span>{" "}
                          {antecedenteP.dn_altAnal !== null ? (
                                  antecedenteP.dn_altAnal ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Defectos de tubo Neural:</span>{" "}
                          {antecedenteP.dn_altNeural !== null ? (
                                  antecedenteP.dn_altNeural ? (
                                    <span className="font-semibold text-emerald-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-rose-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full text-base mb-2">
                          <span className="font-semibold dark:text-gray-300">Obs.:</span>{" "}
                          {antecedenteP.dn_altObs || 'sin dato...'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AntecedentePView;
