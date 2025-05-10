export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  
  export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const removeUser = () => {
    localStorage.removeItem('user');
  };

  // Admin auth functions
export const setAdmin = () => {
  localStorage.setItem('isAdmin', 'true');
};

export const isAdmin = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

export const removeAdmin = () => {
  localStorage.removeItem('isAdmin');
};