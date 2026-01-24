export const useRegexValidation = () => {
  const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;


  const validateUsername = (username)=>
    USERNAME_REGEX.test(username);


  const validateEmail = (email)=>{
    return EMAIL_REGEX.test(email);
  }

  const validatePassword = (password)=>{
    return PASSWORD_REGEX.test(password);
  }

  return{
    validateUsername,
    validateEmail,
    validatePassword,
  };
};

