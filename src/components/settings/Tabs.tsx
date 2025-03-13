type TProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const Tabs = ({ activeTab, setActiveTab }: TProps) => {
  return (
    <div className="border-b border-[#F4F5F7] pt-2">
      <nav className="flex">
        <button
          className={`px-4 py-4 text-sm font-medium transition-all duration-150 ease-linear ${
            activeTab === "edit-profile"
              ? "text-tab-active-text border-b-2 border-tab-active-text hover:!border-[#232323]"
              : "text-tab-inactive-text hover:text-tab-active-text"
          }`}
          onClick={() => setActiveTab("edit-profile")}
        >
          Edit Profile
        </button>
        <button
          className={`px-4 py-4 text-sm font-medium ${
            activeTab === "preferences"
              ? "text-tab-active-text border-b-2 border-tab-active-text hover:!border-[#232323]"
              : "text-tab-inactive-text hover:text-tab-active-text"
          }`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
        <button
          className={`px-4 py-4 text-sm font-medium ${
            activeTab === "security"
              ? "text-tab-active-text border-b-2 border-tab-active-text hover:!border-[#232323]"
              : "text-tab-inactive-text hover:text-tab-active-text"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </nav>
    </div>
  );
};

export default Tabs;
