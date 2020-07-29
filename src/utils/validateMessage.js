const validateMessage = (values) => {
  const errors = {};

  if (!values.message) {
    errors.message = "Le message est requis";
  } else if (values.message.length > 280) {
    errors.message = "Le message est trop long";
  }

  return errors;
};

export default validateMessage;
