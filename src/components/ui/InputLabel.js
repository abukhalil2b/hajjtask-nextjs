const InputLabel = ({ value, children, className, ...props }) => {
  return (
    <label
      {...props}
      className={`block font-medium text-sm text-gray-700 ${
        className || props.class
      }`}
    >
      {value ?? children}
    </label>
  );
};


export default InputLabel;