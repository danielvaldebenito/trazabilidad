export class User {
    public name: string;
    public _id: string;
    public isAdmin: boolean;
    public image: string;
    public distributor: string;
    constructor(
        public username: string,
        public password: string,
        
    ){}
    
}