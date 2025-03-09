import { UserManager, User } from 'oidc-client-ts';

const config = {
    authority: 'http://localhost:5020', // Your OpenIddict Authorization Server URL
    client_id: 'react-client',
    client_secret: 'f3c91c89-2a9f-4e6c-bfc2-7b78cbe0567c',
    redirect_uri: 'http://localhost:3000/signin-oidc', // Adjust for Vite's default port
    response_type: 'code',
    scope: 'profile email roles',
};

console.log("AUTH", config);

const userManager = new UserManager(config);

export const login = (): Promise<void> => userManager.signinRedirect();

//export const handleCallback = (): Promise<User> => userManager.signinRedirectCallback();
export const handleCallback = async (): Promise<User> => {
    try {
      const user = await userManager.signinRedirectCallback();
      console.log("USER:", user);
      return user;  // Return the user object after successful sign-in
    } catch (error) {
      console.error('Error handling callback:', error);
      throw new Error('Failed to handle callback');
    }
  };

export const logout = (): Promise<void> => userManager.signoutRedirect();

export const getUser = (): Promise<User | null> => userManager.getUser();
