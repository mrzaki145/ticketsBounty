export const homePath = () => "/";
export const ticketsPath = () => "/tickets";
export const ticketPathId = (id: number) => `${ticketsPath()}/${id}`;
export const ticketEditPath = (id: number) => `${ticketsPath()}/${id}/edit`;
// export const ticketsByUserIdPath = (userId: string) => `${ticketsPath()}/${userId}`;

export const profilePath = () => "/profile";
export const signInPath = () => "/sign-in";
export const signUpPath = () => "/sign-up";
export const forgotPasswordPath = () => "/forgot-password";
export const resetPasswordPath = () => "/reset-password";
