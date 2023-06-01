const Username = ({ title, user }) => {
  return (
    <div className="p-3 text-orange-600 text-lg">
      {title && title} {user.name}
    </div>
  );
};

export default Username;
