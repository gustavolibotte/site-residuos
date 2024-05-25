import { useFormikContext } from "formik";
import InputMask from "react-input-mask";
import cep from "cep-promise";

let cepConsult = 0;
export const CepInput = ({ name, label, ...props }) => {
     const { values, touched, handleChange, handleBlur, errors, setFieldValue } = useFormikContext();

     const handleCepChange = (e) => {
       const { value } = e.currentTarget;
       const cleanCep = value.replace("-", "").replace("_", "").trim();

       if (cleanCep.length === 8 && cepConsult <= 2) {
         cep(cleanCep).then((data) => {
           setFieldValue("cidade", data.city);
           setFieldValue("rua", data.address);
           setFieldValue("estado", data.state);
           setFieldValue("bairro", data.neighborhood);
         });

         cepConsult++;
       }
       handleChange(e);
     };

    return <div
       className={`fieldGroup ${
         errors[name] && touched[name] && "fieldGroupError"
       }`}
     >
       <label htmlFor={name} className={"fieldLabel"}>
         {label}
       </label>
       <InputMask
         mask="99999-999"
         type="text"
         name={name}
         onChange={handleCepChange}
         onBlur={handleBlur}
         value={values[name]}
         className={"fieldInput"}
       />
       <span className={"error"}>
         {" "}
         {errors[name] && touched[name] && errors[name]}
       </span>
     </div>;
}