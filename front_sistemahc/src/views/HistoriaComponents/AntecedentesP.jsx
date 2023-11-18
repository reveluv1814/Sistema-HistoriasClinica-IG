import React from "react";

const AntecedentePView = ({ antecedenteP }) => {
  return (
    <>
      <div className="p-4">
        <div className="border rounded-md p-4 shadow-md flex bg-zinc-100 dark:bg-stone-800 dark:border-stone-500 w-full">
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-semibold mb-1">Antecedentes Personales</h2>
            <hr className="mb-4 border border-sky-700 shadow w-full" style={{ width: "100%" }}/>
            <div className="flex flex-row flex-wrap">
              {antecedenteP == null ? (
                <span className="text-xl italic font-medium">Sin datos ...</span>
              ) : (
                <div className="flex flex-col w-full">
                  <h2 className="text-lg font-semibold mb-1">1. Gestación</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                      <span className="font-semibold">Gesta:</span>{" "}
                      {antecedenteP.g_embarazo || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                      <span className="font-semibold">Obs.:</span>{" "}
                      {antecedenteP.g_obs || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full " />
                  </div>
                  <h2 className="text-lg font-semibold mb-1">2. Patologías en el embarazo</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                          <span className="font-semibold">Fiebre:</span>{" "}
                            {antecedenteP.pat_fiebre !== null ? (
                                antecedenteP.pat_fiebre ? (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                          <span className="font-semibold">Enf. Infec.:</span>{" "}
                            {antecedenteP.pat_enfInfec !== null ? (
                                antecedenteP.pat_enfInfec ? (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                          <span className="font-semibold">Diabetes:</span>{" "}
                            {antecedenteP.pat_diabetes !== null ? (
                                antecedenteP.pat_diabetes ? (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                          <span className="font-semibold">Epilepsia:</span>{" "}
                            {antecedenteP.pat_epilepsia !== null ? (
                                antecedenteP.pat_epilepsia ? (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                ) : (
                                  <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                )
                              ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm">
                      <span className="font-semibold">Otras enfermedades crónicas:</span>{" "}
                      {antecedenteP.pat_otras || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full " />
                  </div>
                  <h2 className="text-lg font-semibold mb-1">3. Factores físicos durante el embarazo</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                            <span className="font-semibold">Rayos X:</span>{" "}
                              {antecedenteP.factFis_rayosx !== null ? (
                                  antecedenteP.factFis_rayosx ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>  
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                            <span className="font-semibold">Ecografia:</span>{" "}
                              {antecedenteP.factFis_ecografia !== null ? (
                                  antecedenteP.factFis_ecografia ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm">
                      <span className="font-semibold">Lugar donde se realizó:</span>{" "}
                      {antecedenteP.factFis_lugar || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm">
                      <span className="font-semibold">Nº de veces:</span>{" "}
                      {antecedenteP.factFis_numVeces || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full " />
                  </div>
                  <h2 className="text-lg font-semibold mb-1">4. Factores químicos durante la gestación</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                        <span className="font-semibold">Fármacos anticonvulsivantes:</span>{" "}
                        {antecedenteP.factQuim_farmacos || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                        <span className="font-semibold">otros:</span>{" "}
                        {antecedenteP.factQuim_farmOtros || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm capitalize">
                        <span className="font-semibold">Anticonceptivos orales:</span>{" "}
                        {antecedenteP.factQuim_anticonceptivos || 'sin dato...'}
                    </p>
                    <p className="w-full  mb-2 text-sm ">
                        <span className="font-semibold">Gestágenos para evitar AB:</span>{" "}
                        {antecedenteP.fact_Quim_gestagenosAB || 'sin dato...'}
                    </p>
                    <p className="w-full  mb-2 text-sm ">
                        <span className="font-semibold">Exposición Profesional:</span>{" "}
                        {antecedenteP.factQuim_expProfesional || 'sin dato...'}
                    </p>
                    <p className="w-full mb-2 text-sm ">
                        <span className="font-semibold">Enolismo:</span>{" "}
                        {antecedenteP.factQuim_enolismo || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full " />
                  </div>
                  <h2 className="text-lg font-semibold mb-1">5. Observaciones durante la gestación</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Gesta:</span>{" "}
                        {antecedenteP.gesta || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Para:</span>{" "}
                        {antecedenteP.gesta_para || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Nº Nativivos:</span>{" "}
                        {antecedenteP.gesta_nroNativivos || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Malformados:</span>{" "}
                        {antecedenteP.gesta_malformados || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Nº Natimortos:</span>{" "}
                        {antecedenteP.gesta_nroNatimortos || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Nº AB:</span>{" "}
                        {antecedenteP.gesta_nroAB || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Exp.:</span>{" "}
                        {antecedenteP.gesta_exp || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Ind. de uso de anticonceptivos:</span>{" "}
                        {antecedenteP.gesta_anticonceptivos !== null ? (
                                  antecedenteP.gesta_anticonceptivos ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Tipo:</span>{" "}
                        {antecedenteP.gesta_anticonsTipo || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Período entre 1º y 2º gestación:</span>{" "}
                        {antecedenteP.gesta_periodo_1_2 || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Período entre 2º y 3º gestación:</span>{" "}
                        {antecedenteP.gesta_periodo_2_3 || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Período entre 3º y 4º gestación:</span>{" "}
                        {antecedenteP.gesta_periodo_3_4 || 'sin dato...'}
                    </p>
                    <p className="w-full text-sm mb-2">
                        <span className="font-semibold">Período de uso:</span>{" "}
                        {antecedenteP.gesta_periodoUso || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full " />
                  </div>
                  <h2 className="text-lg font-semibold mb-1">6. Parto</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full text-sm mb-2">
                        <span className="font-semibold">Parto:</span>{" "}
                        {antecedenteP.parto || 'sin dato...'}
                    </p>
                    <p className="w-full text-sm mb-2">
                        <span className="font-semibold">¿Por que?:</span>{" "}
                        {antecedenteP.parto_porque || 'sin dato...'}
                    </p>
                    <hr className="mb-2 border-0 h-px  bg-gray-300  shadow w-full " />
                  </div>
                  <h2 className="text-lg font-semibold mb-1">7. Datos del nacimiento</h2>
                  <div className="flex flex-row flex-wrap">
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Peso:</span>{" "}
                          {antecedenteP.dn_peso || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Talla:</span>{" "}
                          {antecedenteP.dn_talla || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">PC:</span>{" "}
                          {antecedenteP.dn_pc || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">APGAR:</span>{" "}
                          {antecedenteP.dn_apgar || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Llanto:</span>{" "}
                          {antecedenteP.dn_llanto || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Cianosis:</span>{" "}
                          {antecedenteP.dn_cianosis || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Oxígeno terapia:</span>{" "}
                          {antecedenteP.dn_oxigeno || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Incubadora:</span>{" "}
                          {antecedenteP.dn_incubadora || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Ictericia Neonatal:</span>{" "}
                          {antecedenteP.dn_ictericia || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Fototerapia:</span>{" "}
                        {antecedenteP.dn_fotop !== null ? (
                                  antecedenteP.dn_fotop ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Exsanguineo:</span>{" "}
                        {antecedenteP.dn_exsanguineo !== null ? (
                                  antecedenteP.dn_exsanguineo ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Fiebre:</span>{" "}
                        {antecedenteP.dn_exsan_fiebre !== null ? (
                                  antecedenteP.dn_exsan_fiebre ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 mb-2 text-sm ">
                        <span className="font-semibold">Convulsiones:</span>{" "}
                        {antecedenteP.dn_exsan_convul !== null ? (
                                  antecedenteP.dn_exsan_convul ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Hemorragias:</span>{" "}
                          {antecedenteP.dn_hemorragia || 'sin dato...'}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Inicio:</span>{" "}
                          {antecedenteP.dn_hemoIni || 'sin dato...'}
                    </p>
                    <p className="w-full text-sm mb-2">
                          <span className="font-semibold">Duración:</span>{" "}
                          {antecedenteP.dn_hemoDura || 'sin dato...'}
                    </p>
                    <h3 className="text-base font-semibold mb-1 w-full">Otras alteraciones</h3>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Criptorquidea:</span>{" "}
                          {antecedenteP.dn_altCriptorquidea !== null ? (
                                  antecedenteP.dn_altCriptorquidea ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Cardiopatía Congénita:</span>{" "}
                          {antecedenteP.dn_altCardiopatia !== null ? (
                                  antecedenteP.dn_altCardiopatia ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">FLAP:</span>{" "}
                          {antecedenteP.dn_altFlap !== null ? (
                                  antecedenteP.dn_altFlap ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Atresia anal:</span>{" "}
                          {antecedenteP.dn_altAnal !== null ? (
                                  antecedenteP.dn_altAnal ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full md:w-1/2 lg:w-1/3 text-sm mb-2">
                          <span className="font-semibold">Defectos de tubo Neural:</span>{" "}
                          {antecedenteP.dn_altNeural !== null ? (
                                  antecedenteP.dn_altNeural ? (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✓</span>
                                  ) : (
                                    <span className="font-semibold text-sky-800 bg-gray-300 px-1">✗</span>
                                  )
                                ) : ('sin dato...')}
                    </p>
                    <p className="w-full text-sm mb-2">
                          <span className="font-semibold">Obs.:</span>{" "}
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
