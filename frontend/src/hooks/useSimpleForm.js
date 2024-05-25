import { useState } from "react";

export const useSimpleForm = (initialValues) => {
  const [data, updateData] = useState(initialValues);

  const onChange = (event) => {
    updateData({ ...data, [event.target.name]: event.target.value });
  };

  return [data, onChange];
};
