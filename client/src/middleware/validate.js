export const validate = (form, errors, setErrors) => {
  let newErrors = {};

  if (!form.name) {
    newErrors = { ...newErrors, name: " name is missing" };
  }

  if (!form.difficulty) {
    newErrors = { ...newErrors, difficulty: " difficulty is missing" };
  }
  if (!form.duration) {
    newErrors = { ...newErrors, duration: " duration is missing" };
  }
  if (!form.season) {
    newErrors = { ...newErrors, season: " season is missing" };
  }
  if (!form.image) {
    newErrors = { ...newErrors, image: " image is missing" };
  }

  // Remove errors for the fields that are no longer missing
  for (const [field, error] of Object.entries(errors)) {
    if (newErrors[field] === undefined && error !== "") {
      newErrors = { ...newErrors, [field]: "" };
    }
  }

  setErrors({ ...errors, ...newErrors });
};
