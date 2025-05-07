"use client"
import { useUserState } from "@/api/context/UserContext";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import AuthButton from "../auth/component/auth-button";
import { useSearchParams } from "next/navigation";
import { BiLoader } from "react-icons/bi";
import InviteError from "./iserror";
import { useRouter } from "next/navigation";


const AcceptsForm = () => {

  const router = useRouter()
  const searchParams = useSearchParams(); // this gets the real query params

  const reference = searchParams.get("reference");
  const status = searchParams.get("status");


    console.log("reference", reference)
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
      firstname: "",
      lastname: "",
           password: "",
           
         });
   const [error, setError] = useState({
          firstname: false,
          lastname: false,
           password: false,
          
        });

    const [isInviteError, setIsInviteError] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const [isChecking, setIsChecking] = useState(false)
    const [userDetail, setUserDetail] = useState({
          email: "", exists: false})

   const { acceptInviteUsers, onboardInvitedUsers  } = useUserState();

   const [formData, setFormData] = useState({
     password: "",
     firstname: "",
     lastname: ""
   });
 
   const handleChange = (e: any) => {
     const { name, value, type, checked } = e.target;
     setFormData((prevData) => ({
       ...prevData,
       [name]: type === "checkbox" ? checked : value,
     }));
   };

   const validateForms = () => {
     if (formData.password === "") {
         setError((prevState) => ({
           ...prevState,
           password: true,
         }));
         setErrorMessage((prevState) => ({
           ...prevState,
           password: "Password is required",
         }));
         return false;
     }
     if (formData.firstname === "") {
         setError((prevState) => ({
           ...prevState,
           firstname: true,
         }));
         setErrorMessage((prevState) => ({
           ...prevState,
           firstname: "Firstname is required",
         }));
         return false;
     }
     if (formData.lastname === "") {
      setError((prevState) => ({
        ...prevState,
        lastname: true,
      }));
      setErrorMessage((prevState) => ({
        ...prevState,
        lastname: "Lastname is required",
      }));
      return false;
  }
     if (formData.password.length < 6) {
         setError((prevState) => ({
           ...prevState,
           password: true,
         }));
         setErrorMessage((prevState) => ({
           ...prevState,
           password: "Password must be at least 6 characters long",
         }));
         return false;
     }

     return true;
 }

 const CheckUser = async () => {
  setIsChecking(true)
  const response = await acceptInviteUsers({
    reference: reference as string,
    status: status as string
  })

  if(response){
    console.log("check", response)
    setUserDetail(response as unknown as {
      email: string, exists: boolean} )

      const data = response as unknown as {
        email: string, exists: boolean}
      if(data.exists) {
        
        router.replace("/auth/login")
      }
    setIsChecking(false)
  } else {
    setIsInviteError(true)
  }
}

 useEffect(() => {

  CheckUser()
 }, [])

 
   const handleSubmit = async (e: any) => {
     e.preventDefault();
     console.log("form data");
     setIsLoading(true);
     const isValid = validateForms();
     if (!isValid) {
       console.log("invalid form data");	
     setIsLoading(false);
     return;
   }
     try {
       console.log(formData);
       await onboardInvitedUsers({
         email: "omokefeovie1@gmail.com",
         password: formData.password,
         reference: reference as string,
         firstname: formData.firstname,
         lastname: formData.lastname
       });
       setIsLoading(false);
     } catch (error) {
       setIsLoading(false);
       console.error("Signup failed:", error);
     }
   };

    return (
       <>
        {
         isInviteError ? <InviteError setIsERROR={setIsInviteError} setIsChecking={setIsChecking} CheckUser={CheckUser} message="Invite error, please try again" /> :  isChecking ? (<div className="flex justify-center items-center h-screen bg-white w-full">
            <p>Accepting invite</p>
            <BiLoader className="animate-spin" />
         </div>) : ( <div className="flex justify-center items-center h-screen bg-white w-full">
          <div className="px-4  w-full">
           
          <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">You've accepted the invite</span>
                    </div>
                  </div>
            <div className="mt-6 lg:text-2xl text-lg lg:leading-10 text-left font-semibold mb-5">
              Sign Up to continue with {userDetail?.email ?? "johndoe@gmail.com"}
            </div>
      
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
           <div>
           <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg mt-1 font-light outline-none focus:border-blue-500"
                placeholder="John"
                  name="firstname"
              />
              {
                error.firstname && <span className='text-red-500 font-medium text-sm'>{errorMessage.firstname}</span>
              }
           </div>
           <div>
           <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg mt-1 font-light outline-none focus:border-blue-500"
                placeholder="Doe"
                  name="lastname"
              />
              {
                error.lastname && <span className='text-red-500 font-medium text-sm'>{errorMessage.lastname}</span>
              }
           </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border rounded-lg mt-1 outline-none focus:border-blue-500 font-light"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
                {
                  error.password && <span className='text-red-500 font-medium text-sm'>{errorMessage.password}</span>
                }
              </div>
              <AuthButton title="Continue" isLoading={isLoading} disabled={isLoading || (!formData.lastname || !formData.firstname || !formData.password)} />
            </form>
      
          </div>
        </div>)
        }
       </>
    )
}


export default AcceptsForm