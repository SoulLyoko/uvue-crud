export function useMethods(formRef: any) {
  const validate = () => formRef.value.validate();
  const setRules = (...args: any) => formRef.value.setRules(...args);
  const validateField = (...args: any) => formRef.value.validateField(...args);
  const resetFields = () => formRef.value.resetFields();
  const clearValidate = (...args: any) => formRef.value.clearValidate(...args);

  return { validate, setRules, validateField, resetFields, clearValidate };
}
