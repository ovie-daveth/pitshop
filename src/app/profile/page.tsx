"use client"

import { useState } from "react"
import Layout from "./profile.layout"
import EditProfileForm from "./components/edit-profile"
import BusinessList from "./components/business-list"
import CreateBusinessForm from "./components/create-business"
import PasswordForm from "./components/password-form"
import EmailNotifications from "./components/email-notification"

export default function ProfileSettings() {
    const [activeTab, setActiveTab] = useState("edit-profile")
    const [showCreateBusiness, setShowCreateBusiness] = useState(false)
  
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
          <BusinessList onCreateNew={() => setShowCreateBusiness(true)} />
        )}
        {activeTab === "business" && showCreateBusiness && (
          <CreateBusinessForm onBack={() => setShowCreateBusiness(false)} />
        )}
        {activeTab === "email-notifications" && <EmailNotifications />}
      </Layout>
    )
  }