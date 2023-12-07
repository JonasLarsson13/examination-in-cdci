import "./Input.scss";

function Input({
  label,
  type,
  customClass,
  name,
  handleChange,
  defaultValue,
  disabled,
  testId,
}) {
  return (
    <section className="input">
      <label className="input__label">{label}</label>
      <input
        type={type}
        className={`input__field ${customClass ? customClass : ""}`}
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ""}
        disabled={disabled}
        data-testid={testId ? testId : null}
      />
    </section>
  );
}

export default Input;
