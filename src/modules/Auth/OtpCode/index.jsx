import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  code: Yup.array()
    .of(
      Yup.string()
        .matches(/^[0-9]$/, "Only digits allowed")
        .required("Required")
    )
    .min(4, "Code must be 4 digits")
    .max(4, "Code must be 4 digits"),
});

const VerificationCode = () => {
  const inputRefs = useRef([]);

  const handleChange = (index, value, setFieldValue, values) => {
    if (isNaN(value)) return;
    const newCode = [...values.code];
    newCode[index] = value.slice(-1);
    setFieldValue("code", newCode);

    if (value && index < values.code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event, values, setFieldValue) => {
    if (event.key === "Backspace" && !values.code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Verification Code</h2>
      <p className="text-gray-500 text-base font-bold p-4">
        Enter the number that was sent
      </p>
      <Formik
        initialValues={{ code: ["", "", "", ""] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full pt-2">
            <div className="flex justify-center gap-3 mb-4">
              {values.code.map((num, idx) => (
                <div key={idx}>
                  <Field
                    name={`code[${idx}]`}
                    type="text"
                    maxLength="1"
                    value={num}
                    innerRef={(el) => (inputRefs.current[idx] = el)}
                    onChange={(e) =>
                      handleChange(idx, e.target.value, setFieldValue, values)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(idx, e, values, setFieldValue)
                    }
                    className="w-12 h-12 text-xl text-center border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name={`code[${idx}]`}
                    component="div"
                    className="text-red-500 text-xs text-center"
                  />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm text-center">
              Don’t receive code?
              <span className="text-blue-500 cursor-pointer"> Re-send</span>
            </p>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-3/6 bg-blue-500 text-white p-3 rounded-xl mt-4 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerificationCode;
