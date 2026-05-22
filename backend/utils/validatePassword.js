const validatePassword = (
  password
) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;

  return regex.test(password);
};

module.exports = validatePassword;