const preCheckFields = (requiredFields, inputs) => {
  if (!inputs.every((i) => Object.values(i))) return false;
  if (!requiredFields.every((field) => inputs.every((inp) => inp[field]))) return false;
  if (Object.values(inputs).some((value) => value.length > 127)) return false;
  return true;
};

module.exports = preCheckFields;