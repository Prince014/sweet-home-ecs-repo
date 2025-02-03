

const useHandleLogout = () => {



  const handleLogout = () => {
   
    localStorage.removeItem("user_auth_token"); // Remove the token from localStorage
    window.location.href = "/login"; 
  };

  return handleLogout; // Return the function for use
};

export default useHandleLogout;
