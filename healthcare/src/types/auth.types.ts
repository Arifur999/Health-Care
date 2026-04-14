export interface ILoginResponse {
    token:string;
    accessToken:string;
    refreshToken:string;
    user : {
        needsPasswordChange:boolean;
        email:string;
        id:string;
        name:string;
        role:string;
        image:string;
        status:string;
        isDeleted:boolean;
        emailVerified:boolean;
    }
    
}

export interface IRegisterResponse {
    success: boolean;
    message: string;
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
    }
}