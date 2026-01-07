import Label from "../form/Label";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import AddIcon from '@mui/icons-material/Add';
import { RootState } from "../../redux/store";
import TextArea from "../form/input/TextArea";
import { useLocation, useNavigate } from "react-router";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { getPloBySpecailty, Plo } from "../../services/plo/ploService";
import { getSloBySpecialty, Slo } from "../../services/slo/sloService";
import { Gco, getGcosBySpecailty } from "../../services/gco/gcoService";
import { Competency, getCompetencyBySpecialty } from "../../services/competency/competencyService";
import { getSpecialtyChar, SpecialtyChar } from "../../services/specialtCharacteristics/specialtyChar";

export default function SpecialtyDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setError] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const { specialtyCode } = location.state as { specialtyCode: string };
  const { specialtyName } = location.state as { specialtyName: string };

  console.log(specialtyCode);


  // specialty characteristics logic

  const [openSection, setOpenSection] = useState<null | "characteristics" | "plo" | "slo" | "gco" | "competency">(null);
  const [, setCharLoading] = useState(false);
  const [, setCharNoContent] = useState(false);

  useEffect(() => {
    const getSpecChar = async () => {
      try {
        setCharLoading(true);
        const result = await getSpecialtyChar(specialtyCode, token ? token : "");
        if (typeof result === "object") {
          setSpecilatyChar(result);
        } else if (result === "NO CONTENT") {
          setCharNoContent(true);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    }
    getSpecChar();
  }, []);

  // PLO (Program Learning outcomes)

  const [plo, setPlo] = useState<Plo[]>([]);
  const [, setPloNoContent] = useState(false);

  useEffect(() => {
    const getPlos = async () => {
      try {
        const result = await getPloBySpecailty(specialtyCode);

        if (typeof result === "object") {
          setPlo(result);
        } else if (result === "NO CONTENT") {
          setPloNoContent(true);
        }
      } catch (e) {
        setError(true);
      }
    }
    getPlos();
  }, []);

  // slo (student learning outcome)

  const [slo, setSlo] = useState<Slo[]>([]);
  const [, setSloNoContent] = useState(false);

  useEffect(() => {
    const getSlos = async () => {
      try {
        const result = await getSloBySpecialty(specialtyCode, token ? token : "");

        if (typeof result === "object") {
          setSlo(result);
        } else if (result === "NO CONTENT") {
          setSloNoContent(true);
        }
      } catch (e) {
        setError(true);
      }
    };

    getSlos();
  }, []);

  console.log(slo);

  // GCO (Graduate Career Opportunities)

  const [gco, setGco] = useState<Gco[]>([]);
  const [, setGcoNoContent] = useState(false);

  useEffect(() => {
    const getGcos = async () => {
      try {
        const result = await getGcosBySpecailty(specialtyCode, token ? token : "");

        if (typeof result === "object") {
          setGco(result)
        } else if (result === "NO CONTENT") {
          setGcoNoContent(true);
        }
      } catch (e) {
        setError(true);
      }
    }

    getGcos();
  }, []);

  // competency

  const [competency, setCompetency] = useState<Competency[]>([]);
  const [, setCompNoContent] = useState(false);

  useEffect(() => {
    const getCompetencies = async () => {
      try {
        const result = await getCompetencyBySpecialty(specialtyCode, token ? token : "");

        if (typeof result === "object") {
          setCompetency(result)
        } else if (result === "NO CONTENT") {
          setCompNoContent(true);
        }
      } catch (e) {
        setError(true);
      }
    }

    getCompetencies();
  }, []);

  console.log(competency);

  const [specialtyChar, setSpecilatyChar] = useState<SpecialtyChar>();

  console.log(specialtyChar);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <div style={{
          width: "calc((100% / 2) - 20px)"
        }}>
          <Label>
            Major name
          </Label>
          <Input value={specialtyName} readOnly />
        </div>
        <div style={{
          width: "calc((100% / 2) - 20px)"
        }}>
          <Label>
            Major code
          </Label>
          <Input value={specialtyCode} readOnly />
        </div>
      </div>
      <div
        style={{
          border: openSection === "characteristics" ? "1.5px solid #22c55e" : "1px solid #ccc",
          padding: "10px",
          marginTop: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10
        }}
        onClick={() => setOpenSection(openSection === "characteristics" ? null : "characteristics")}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">Qualification Characteristics (Program Description and Program Requirements)</span>
        <AddIcon
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ transform: openSection === "characteristics" ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
        />
      </div>

      {openSection === "characteristics" && (
        <div style={{ marginTop: "10px" }}>
          {specialtyChar?.degree_requirements && specialtyChar.degree_requirements.length !== 0 ? (
            <>
              <Label>
                Program Description
              </Label>
              <TextArea
                value={specialtyChar?.program_desc || ""}
                readOnly
                placeholder="Proqramın təsviri"
              />
              <Label>
                Program Requirements
              </Label>
              <TextArea
                value={Array.isArray(specialtyChar?.degree_requirements) ? specialtyChar.degree_requirements.join("\n") : specialtyChar?.degree_requirements || ""}
                readOnly
                placeholder="Proqramın tələbləri"
              />
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p className="bg-yellow-100 text-yellow-800 p-2 rounded-[20px] w-[200px] text-center mr-[10px]">
                Not found
              </p>
              <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center" onClick={() => {
                navigate("/specialty-details/new-specialty-characteristics", { state: { specialtyCode, specialtyName } })
              }}>
                <AddIcon />
              </button>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          border: openSection === "plo" ? "1.5px solid #22c55e" : "1px solid #ccc",
          padding: "10px",
          marginTop: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10
        }}
        onClick={() => setOpenSection(openSection === "plo" ? null : "plo")}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">Program Learning Objectives</span>
        <AddIcon
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ transform: openSection === "plo" ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
        />
      </div>

      {openSection === "plo" && (
        <div style={{ marginTop: "10px" }}>
          {plo.length !== 0 ? (
            <>
              <Label>
                Program Training Objectives
              </Label>
              {plo.map((item, index) => {
                return (
                  <TextArea key={index}
                    value={item?.plo_content || ""}
                    readOnly
                    placeholder="Program Training Objectives"
                  />
                )
              })}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p className="bg-yellow-100 text-yellow-800 p-2 rounded-[20px] w-[200px] text-center mr-[10px]">
                Not found
              </p>
              <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center" onClick={() => {
                navigate("/specialty-details/new-plo", { state: { specialtyCode, specialtyName } })
              }}>
                <AddIcon />
              </button>
            </div>
          )}
          <div className="flex justify-end items-center">
            <Label>
              New Program Training Objectives
            </Label>
            <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center ml-[20px]" onClick={() => {
              navigate("/specialty-details/new-plo", { state: { specialtyCode, specialtyName } })
            }}>
              <AddIcon />
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          border: openSection === "slo" ? "1.5px solid #22c55e" : "1px solid #ccc",
          padding: "10px",
          marginTop: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10
        }}
        onClick={() => setOpenSection(openSection === "slo" ? null : "slo")}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">Student Learning Outcomes</span>
        <AddIcon
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ transform: openSection === "slo" ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
        />
      </div>

      {openSection === "slo" && (
        <>
          <div style={{ marginTop: "10px" }}>
            {slo.length !== 0 ? (
              <>
                <Label>
                  Student Learning Outcomes
                </Label>
                {slo.map((item, index) => {
                  return (
                    <TextArea
                      key={index}
                      value={item?.slo_content || ""}
                      readOnly
                      placeholder="Student Learning Outcomes"
                    />
                  )
                })}
              </>
            ) : (
              <div className="flex justify-center items-center">
                <p className="bg-yellow-100 text-yellow-800 p-2 rounded-[20px] w-[200px] text-center mr-[10px]">
                  Not found
                </p>
                <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center" onClick={() => {
                  navigate("/specialty-details/new-slo", { state: { specialtyCode, specialtyName } })
                }}>
                  <AddIcon />
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center">
            <Label>
              Yeni Student Learning Outcomes
            </Label>
            <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center ml-[20px]" onClick={() => {
              navigate("/specialty-details/new-slo", { state: { specialtyCode, specialtyName } })
            }}>
              <AddIcon />
            </button>
          </div>
        </>
      )}

      <div
        style={{
          border: openSection === "gco" ? "1.5px solid #22c55e" : "1px solid #ccc",
          padding: "10px",
          marginTop: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10
        }}
        onClick={() => setOpenSection(openSection === "gco" ? null : "gco")}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">Career Opportunities for Graduates</span>
        <AddIcon
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ transform: openSection === "gco" ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
        />
      </div>

      {openSection === "gco" && (
        <div style={{ marginTop: "10px" }}>
          {gco && gco?.length !== 0 ? (
            <>
              {gco.map((gco, index) => (
                <div
                  className="w-full flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  key={index}
                >
                  <div className="flex-shrink-0 w-full md:w-1/5 mb-2 md:mb-0 pr-4">
                    <Label className="font-semibold text-gray-700">{gco.career_title}</Label>
                  </div>
                  <div className="w-full md:w-4/5">
                    <TextArea
                      value={gco?.career_content || ""}
                      readOnly
                      placeholder="Student Learning Outcomes"
                      className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 resize-none"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-end items-center">
                <Label>
                  New career opporunity
                </Label>
                <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center ml-[20px]" onClick={() => {
                  navigate("/specialty-details/new-gco", { state: { specialtyCode, specialtyName } })
                }}>
                  <AddIcon />
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p className="bg-yellow-100 text-yellow-800 p-2 rounded-[20px] w-[200px] text-center mr-[10px]">
                Not found
              </p>
              <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center" onClick={() => {
                navigate("/specialty-details/new-gco", { state: { specialtyCode, specialtyName } })
              }}>
                <AddIcon />
              </button>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          border: openSection === "competency" ? "1.5px solid #22c55e" : "1px solid #ccc",
          padding: "10px",
          marginTop: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10
        }}
        onClick={() => setOpenSection(openSection === "competency" ? null : "competency")}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">Competencies</span>
        <AddIcon
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ transform: openSection === "competency" ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}
        />
      </div>

      {openSection === "competency" && (
        <div style={{ marginTop: "10px" }}>
          {competency.length !== 0 ? (
            <>
              <Label>
                Competencies
              </Label>
              {competency.map((item, index) => {
                return (
                  <TextArea
                    key={index}
                    value={item.competency_content || ""}
                    readOnly
                    placeholder="Səriştələr"
                  />
                )
              })}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p className="bg-yellow-100 text-yellow-800 p-2 rounded-[20px] w-[200px] text-center mr-[10px]">
                Not found
              </p>
              <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center" onClick={() => {
                navigate("/specialty-details/new-competency", { state: { specialtyCode, specialtyName } })
              }}>
                <AddIcon />
              </button>
            </div>
          )}
          <div className="flex justify-end items-center">
            <Label>
              Yeni Səriştələr
            </Label>
            <button className="bg-blue-500 text-white p-2 rounded-[50px] hover:bg-blue-600 flex items-center justify-center ml-[20px]" onClick={() => {
              navigate("/specialty-details/new-competency", { state: { specialtyCode, specialtyName } })
            }}>
              <AddIcon />
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex justify-between items-center">
        <div
          className="w-full mr-2  p-4 flex justify-between items-center 
        bg-blue-500 text-white border-2 border-blue-500 rounded-[15px]
        transition-colors duration-300
        hover:bg-white hover:text-blue-500
        cursor-pointer"
        >
          <Link to={"/specialty-details/subjects"} state={{ specialtyCode: specialtyCode, specialtyName: specialtyName }} className="flex justify-between items-center w-full">
            <p>Curriculum</p>
            <div>
              <ArrowOutwardIcon sx={{ fontSize: 25 }} />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}