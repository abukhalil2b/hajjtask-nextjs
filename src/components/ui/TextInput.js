const TextInput = ({ ...props }) => {
  return (
    <input
      {...props}
      className={`border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-md shadow-sm ${props.className || props.class}`}
    />
  );
};

export default TextInput;
