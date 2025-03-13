type TProps = {
  successMessage: string;
};
const SuccessPopup = ({ successMessage }: TProps) => {
  return (
    <>
      {/* 🟢 Success message */}
      {successMessage && (
        <div className="fixed top-10  transform left-1/2 -translate-x-1/2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}
    </>
  );
};

export default SuccessPopup;
