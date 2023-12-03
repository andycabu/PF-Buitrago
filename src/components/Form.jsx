import PropTypes from "prop-types";
import Button from "./Button";
import React from "react";
import { useTranslation } from "react-i18next";

function Form({ onSubmit, contentForm, style }) {
  const { t } = useTranslation();
  return (
    <>
      <form className={style} onSubmit={onSubmit}>
        {contentForm.map((item, i) => (
          <React.Fragment key={i}>
            <div>
              <label className=" text-[var(--text-color)]" htmlFor={item.name}>
                {item.labelText}
              </label>
              <input
                name={item.name}
                id={item.name}
                placeholder={item.placeholder}
                autoComplete={item.autoComplete}
                type={item.typeInput}
                onChange={item.onChange}
                className="block w-full px-4 py-2 mt-2  bg-[var(--background-color)] text-[var(--text-color)] border border-[var(--background-color)] rounded-md   focus:border-[var(--text-color)]  "
              />
            </div>

            {item.textArea ? (
              <div>
                <label
                  className=" text-[var(--text-color)]"
                  htmlFor={item.textArea.labelText}
                >
                  {item.textArea.labelText}
                </label>
                <textarea
                  id={item.textArea.name}
                  className={item.textArea.className}
                  name={item.textArea.name}
                  placeholder={item.textArea.placeholder}
                  onChange={item.textArea.onChange}
                ></textarea>
              </div>
            ) : null}
            {item.img ? (
              <div className="text-[var(--text-color)]">
                <label className="block text-sm font-medium ">
                  {item.img.labelText}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2  border-dashed rounded-md">
                  <div className="space-y-1 text-center text-[var(--text-color)]">
                    {item.img.src ? (
                      <img
                        src={item.img.src}
                        alt="imagen"
                        className=" h-40 mx-auto rounded-md object-cover"
                      />
                    ) : null}
                    {!item.img.src ? (
                      <svg
                        className="mx-auto h-12 w-12 text-[var(--text-color)]"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : null}
                    <div className="flex text-sm items-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-[var(--card-label-color)] rounded-md font-medium py-1 px-2"
                      >
                        <span className=" text-[var(--background-color)] hover">
                          {t("form.upload")}
                        </span>
                        <input
                          onChange={item.img.onChange}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only "
                        />
                      </label>
                      <p className="pl-1 ">{t("form.drag_or_drop")}</p>
                    </div>
                    <p className="text-xs ">PNG, JPG, GIF max 10MB</p>
                  </div>
                </div>
              </div>
            ) : null}
          </React.Fragment>
        ))}

        <div className="flex justify-end mt-6 items-end">
          <Button text={contentForm[0].textButton} type="submit" />
        </div>
      </form>
    </>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contentForm: PropTypes.array.isRequired,
  style: PropTypes.string,
};

export default Form;
