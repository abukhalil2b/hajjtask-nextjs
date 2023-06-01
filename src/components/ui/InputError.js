const InputError = ({ messages, className, ...props }) => {
  return (
    <ul
      className={`text-sm text-red-600 space-y-1 ${className || props.class}`}
    >
      {messages.map((message, i) => (
        <li key={i}>{message}</li>
      ))}
    </ul>
  );
};

export default InputError;
