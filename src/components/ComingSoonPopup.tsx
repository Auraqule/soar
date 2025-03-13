const message = "Feature coming soon!";
const ComingSoonPopup = () => {
  return (
    <>
      {/* 🟢 Coming soon message */}(
      <div className="fixed top-10  transform left-1/2 -translate-x-1/2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded">
        {message}
      </div>
      )
    </>
  );
};

export default ComingSoonPopup;
