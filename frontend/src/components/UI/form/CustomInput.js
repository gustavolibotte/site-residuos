import { useFormikContext } from "formik";

export const CustomInput = (
    { type, name, label }) => {
    const { values, touched, handleChange, handleBlur, errors } = useFormikContext();

    return <div className={`${"fieldGroup"} ${errors[name] && touched[name] && "fieldGroupError"}`}>
        <label htmlFor={name} className={"fieldLabel"}>{label}</label>
        <input
            type={type ? type : "text"}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[name]}
            className={"fieldInput"}
        />
        <span className={"error"}> {errors[name] && touched[name] && errors[name]}</span>
    </div>;
};
