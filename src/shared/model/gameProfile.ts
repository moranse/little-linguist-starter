export class GameProfile{
    id: number;
    name:string;
    details:string;
    url:URL;

    constructor(id:number,name:string,details:string,url:URL){
        this.id=id;
        this.name=name;
        this.details=details;
        this.url=url;
    }
}