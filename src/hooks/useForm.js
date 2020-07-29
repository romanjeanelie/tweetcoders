import { useState, useEffect } from "react";

const useForm = (initialState, validate, next) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const isErrors = Object.keys(errors).length !== 0;
      if (isErrors) {
        setIsSubmitting(false);
      } else {
        next();
        setIsSubmitting(false);
        setValues(initialState);
      }
    }
  }, [errors, next, isSubmitting, initialState]);

  const handleChange = (event) => {
    event.persist();
    setValues((prevValues) => ({
      // permet de garder la veleurs d'autres inputs
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(values);
    setErrors(errors);
    setIsSubmitting(true);
  };
  return { handleSubmit, handleKeyDown, handleChange, values, errors };
};

export default useForm;
