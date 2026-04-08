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