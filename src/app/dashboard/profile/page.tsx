"use client";

import { useState } from "react";
import Layout from "./profile.layout";
import EditProfileForm from "./components/edit-profile";
import BusinessList from "./components/business-list";
import CreateBusinessForm from "./components/create-business";
import PasswordForm from "./components/password-form";
import EmailNotifications from "./components/email-notification";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [showCreateBusiness, setShowCreateBusiness] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<{ id: number; name: string } | null>(null);

  const handleEditBusiness = (business: { id: number; name: string }) => {
    setEditingBusiness(business);
    setShowCreateBusiness(true);
    setActiveTab("edit-business");
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      showCreateBusiness={showCreateBusiness}
      setShowCreateBusiness={setShowCreateBusiness}
    >
      {activeTab === "edit-profile" && <EditProfileForm />}
      {activeTab === "password" && <PasswordForm />}
      {activeTab === "business" && !showCreateBusiness && (
        <BusinessList
          onCreateNew={() => setShowCreateBusiness(true)}
          onEdit={handleEditBusiness} // Pass the new handler
        />
      )}
      {activeTab === "business" && showCreateBusiness && (
        <CreateBusinessForm onBack={() => setShowCreateBusiness(false)} />
      )}
      {activeTab === "edit-business" && showCreateBusiness && editingBusiness && (
        <CreateBusinessForm
          isEdit
          business={editingBusiness}
          onBack={() => {
            setShowCreateBusiness(false);
            setEditingBusiness(null);
            setActiveTab("business");
          }}
        />
      )}
      {activeTab === "email-notifications" && <EmailNotifications />}
    </Layout>
  );
}