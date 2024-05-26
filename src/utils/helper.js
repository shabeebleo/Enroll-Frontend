export const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  export const validatePassword = (password) => {
    if (password.length >= 4) {
      return true;
    }
  };
  
  export const getInitials = (name) => {
    // Split the name by spaces to get all components
    const nameParts = name?.trim().split(" ");
  
    // Get the first letter of each component and combine them
    const initials = nameParts?.map((part) => part[0].toUpperCase()).join("");
    return initials;
  };
  