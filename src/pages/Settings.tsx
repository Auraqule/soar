import { useState } from "react";
import Tabs from "../components/settings/Tabs";

import { EditProfileForm, Preferences, Security } from "../components/settings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");

  return (
    <div className="bg-white rounded-3xl overflow-hidden m-3 px-8">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "edit-profile" && <EditProfileForm />}

      {activeTab === "preferences" && <Preferences />}

      {activeTab === "security" && <Security />}
    </div>
  );
};

export default Settings;
