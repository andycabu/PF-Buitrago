import { useTranslation } from "react-i18next";
import { CatalanFlag, EnglandFlag, SpainFlag } from "./Icon";

const Language = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <div className="group flex">
      <div
        onClick={() => changeLanguage("en-EN")}
        className={`${
          i18n.language === "en-EN" ? "block" : "hidden group-hover:block"
        }`}
      >
        <EnglandFlag />
      </div>
      <div
        onClick={() => changeLanguage("ca-CA")}
        className={`${
          i18n.language === "ca-CA" ? "block" : "hidden group-hover:block"
        }`}
      >
        <CatalanFlag />
      </div>
      <div
        onClick={() => changeLanguage("es-ES")}
        className={`${
          i18n.language === "es-ES" ? "block" : "hidden group-hover:block"
        }`}
      >
        <SpainFlag />
      </div>
    </div>
  );
};

export default Language;
