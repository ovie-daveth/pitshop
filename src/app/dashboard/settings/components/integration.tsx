"use client"

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

import { useEffect, useState } from "react"
import { FiChevronRight, FiEye, FiArrowLeft, FiLoader, FiEyeOff } from "react-icons/fi"
import { FaFacebook, FaSnapchat } from "react-icons/fa"
import { Switch } from "@headlessui/react"
import fb from "../../../../../public/images/fb.png"
import tiktok from "../../../../../public/images/tiktok.png"
import snapshot from "../../../../../public/images/snapshot.png"
import ads from "../../../../../public/images/adds.png"
import Image from "next/image"
import { useAdPlatformState } from "@/api/context/AdPlatformContext";
import { IIntegrateAdPlatformAccount } from "@/api/types";

function loadFacebookSDK(appId: string): Promise<void> {
  return new Promise((resolve) => {
    if (window.FB) {
      resolve();
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: "v22.0",
      });
      resolve(); // ✅ only resolve after FB.init()
    };

    // Check if the script already exists
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      document.body.appendChild(script);
    }
  });
}


// Integration data
const integrations = [
  { id: 1, name: "Meta Ads", icon: fb  },
  { id: 2, name: "Google Ads", icon: ads  },
  { id: 3, name: "Snapchat Ads", icon: snapshot },
  { id: 4, name: "TikTok Ads", icon: tiktok },
  { id: 5, name: "Google Ads", icon: ads  },
  { id: 6, name: "Google Ads", icon: ads  },
  { id: 7, name: "Google Ads", icon: ads  },
  { id: 8, name: "Google Ads", icon: ads  },
]

// Mock data for detailed view
const detailedAccounts = [
  {
    id: 1,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: false,
  },
  {
    id: 2,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: false,
  },
  {
    id: 3,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: false,
  },
  {
    id: 4,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: false,
  },
  {
    id: 5,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: false,
  },
  {
    id: 6,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: true,
  },
  {
    id: 7,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: false,
  },
  {
    id: 8,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: true,
  },
  {
    id: 9,
    name: "JP Trading Strengthshop GmbH",
    accountId: "1188828882829929929922",
    access: "Managed ad accounts",
    active: true,
  },
]

type IntegrationStatus = "disconnected" | "connecting" | "connected"

export default function IntegrationComponent() {
  const [integrationStatuses, setIntegrationStatuses] = useState<Record<number, IntegrationStatus>>(
    integrations.reduce(
      (acc, integration) => {
        acc[integration.id] = "disconnected"
        return acc
      },
      {} as Record<number, IntegrationStatus>,
    ),
  )

  const {integrateAdAccount} = useAdPlatformState()

  const [showDetailView, setShowDetailView] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<number | null>(null)
  const [accountStatuses, setAccountStatuses] = useState<Record<number, boolean>>(
    detailedAccounts.reduce(
      (acc, account) => {
        acc[account.id] = account.active
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  // New state to track visibility of each account ID
  const [showAccountIds, setShowAccountIds] = useState<Record<number, boolean>>(
    detailedAccounts.reduce(
      (acc, account) => {
        acc[account.id] = false // Initially hidden
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )


  // useEffect(() => {
  //   // Load Facebook SDK
  //   if (typeof window !== "undefined" && !window.FB) {
  //     window.fbAsyncInit = function () {
  //       window.FB.init({
  //         appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
  //         cookie: true,
  //         xfbml: true,
  //         version: "v18.0",
  //       });
  //     };
  
  //     const script = document.createElement("script");
  //     script.src = "https://connect.facebook.net/en_US/sdk.js";
  //     script.async = true;
  //     document.body.appendChild(script);

  //     console.log("passed")
  //   }
  // }, []);

  // New function to toggle ID visibility
  
  const toggleIdVisibility = (accountId: number) => {
    setShowAccountIds((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }))
  }

  const handleConnect = async (integrationId: number) => {
    if (integrationId === 1) {
      try {
        setIntegrationStatuses((prev) => ({
          ...prev,
          [integrationId]: "connecting",
        }));

        // Wait for Facebook SDK to initialize
        await loadFacebookSDK(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!);

        // Ensure FB is initialized before proceeding
        if (!window.FB) {
          throw new Error('Facebook SDK not initialized');
        }

        window.FB.login((response: any) => {
            if (response.authResponse) {
              const accessToken = response.authResponse.accessToken;

              const request: IIntegrateAdPlatformAccount = {
                platformId: 1,
                token: accessToken,
              };

              (async () => {
                const res = await integrateAdAccount(request);
                console.log("Facebook login response:", res);
                if(res){
                  
                setIntegrationStatuses((prev) => ({
                  ...prev,
                  [integrationId]: "connected",
                }));
                }
              })
            } else {
              console.log("User cancelled login or did not authorize.");
              setIntegrationStatuses((prev) => ({
                ...prev,
                [integrationId]: "disconnected",
              }));
            }
          },
          {
            scope: "email,public_profile,pages_show_list,ads_management",
          }
        );
      } catch (error) {
        console.error("Error during Facebook SDK initialization or login", error);
        setIntegrationStatuses((prev) => ({
          ...prev,
          [integrationId]: "disconnected",
        }));
      }
    } else {
      // Simulate API call for other platforms
      setIntegrationStatuses((prev) => ({
        ...prev,
        [integrationId]: "connecting",
      }));
  
      setTimeout(() => {
        setIntegrationStatuses((prev) => ({
          ...prev,
          [integrationId]: "connected",
        }));
      }, 1500);
    }
  };
  
  // process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!

  const handleViewDetails = (integrationId: number) => {
    setSelectedIntegration(integrationId)
    setShowDetailView(true)
  }

  const handleGoBack = () => {
    setShowDetailView(false)
    setSelectedIntegration(null)
  }

  const toggleAccountStatus = (accountId: number) => {
    setAccountStatuses((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }))
  }

  if (showDetailView) {
    return (
      <div className="py-6">
        <div className="mb-8">
          <button onClick={handleGoBack} className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <span className="bg-white sm:shadow rounded-full sm:h-6 sm:w-6 flex items-center justify-center mr-2">
            <FiArrowLeft className="" />
            </span>
           
          <span className="hidden sm:block">Go back</span>
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="border rounded-lg overflow-hidden shadow-sm">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[640px]">
      {/* Header */}
      <thead>
        <tr className="bg-gray-50 border-b text-sm sm:text-base">
          <th className="py-4 px-6 text-left font-medium text-gray-600 w-[120px]">
            Status
          </th>
          <th className="py-4 px-6 text-left lg:pl-28 pl-10 font-medium text-gray-600">
            Name
          </th>
          <th className="py-4 px-6 text-left font-medium text-gray-600 w-[200px]">
            ID
          </th>
          <th className="py-4 px-6 text-left font-medium text-gray-600">
            Access
          </th>
        </tr>
      </thead>

      {/* Account rows */}
      <tbody>
        {detailedAccounts.map((account) => (
          <tr 
            key={account.id} 
            className="border-b last:border-b-0 hover:bg-gray-50"
          >
            <td className="py-4 px-6">
              <div className="flex items-center">
                <Switch
                  checked={accountStatuses[account.id]}
                  onChange={() => toggleAccountStatus(account.id)}
                  className={`${
                    accountStatuses[account.id] ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Toggle account</span>
                  <span
                    className={`${
                      accountStatuses[account.id]
                        ? "translate-x-6 flex justify-center items-center"
                        : "translate-x-1 flex justify-center items-center"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  >
                    {accountStatuses[account.id] ? (
                      <span className="text-blue-600 text-xs">✓</span>
                    ) : (
                      <span className="text-gray-400 text-xs">✕</span>
                    )}
                  </span>
                </Switch>
                <FaFacebook className="ml-2 text-blue-600 text-xl" />
              </div>
            </td>
            <td className="py-4 px-6 font-medium text-gray-800 sm:text-sm text-xs xl:text-center">
              {account.name}
            </td>
            <td className="py-4 px-6 text-gray-700 sm:text-sm text-xs">
              <div className="flex items-center gap-2 w-[180px] w-full">
                <span className="block ">
                  {showAccountIds[account.id]
                    ? account.accountId
                    : `${account.accountId.slice(0, 4)}•••••${account.accountId.slice(-4)}`}
                </span>
                <button
                  onClick={() => toggleIdVisibility(account.id)}
                  className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                >
                  {showAccountIds[account.id] ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </td>
            <td className="py-4 px-6 text-gray-700 sm:text-sm text-xs">
              Managed Ad accounts
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
      </div>
    )
  }

  return (
    <div className="py-6 flex flex-col gap-5">
      {integrations.map((integration) => (
        <div key={integration.id} className="flex items-center justify-between py-3 px-4 shadow last:border-b-0 rounded-md hover:scale-y-[95%] transition-all ease-in-out duration-500 ">
          <div className="flex items-center">
            <div className="mr-4">{<Image src={integration.icon} alt={integration.name}  className="w-4 sm:w-6 " />}</div>
            <span className="sm:text-sm lg:text-base text-xs font-medium text-gray-800">{integration.name}</span>
          </div>
          <div className="flex items-center">
            {integrationStatuses[integration.id] === "disconnected" && (
              <button
                onClick={() => handleConnect(integration.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-xs sm:text-sm lg:text-base"
              >
                Connect
              </button>
            )}
            {integrationStatuses[integration.id] === "connecting" && (
              <button
                disabled
                className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center opacity-80  text-xs sm:text-sm lg:text-base"
              >
                <FiLoader className="animate-spin mr-2 h-4 w-4" />
                Connecting...
              </button>
            )}
            {integrationStatuses[integration.id] === "connected" && (
              <p className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-6 rounded-md transition-colors  text-xs sm:text-sm lg:text-base">
                Connected
              </p>
            )}
              {integrationStatuses[integration.id] === "connected" && (
              <button
                onClick={() => handleViewDetails(integration.id)}
                className=" p-2 sm:h-10 h-8 bg-blue-600 text-white rounded-tr-md rounded-br-md -ml-2"
              >
                <FiChevronRight className="sm:h-5 sm:w-5 h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

