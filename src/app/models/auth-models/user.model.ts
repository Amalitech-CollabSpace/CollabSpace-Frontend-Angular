export interface User{
    fullName:string,
    email:string,
    password:string,
    role?:string,
}

export interface LoggedInUser{
    email:string,
    password:string,

}