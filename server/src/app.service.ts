import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  name: string;
  version: string;
  status: boolean;

  constructor(){
    this.name = "Gatriz Doces API";
    this.version = "1.0.0";
    this.status = true;
  }
  
  getHello(): {name: string, version: string, status: boolean} {
    const name: string = this.name;
    const version: string = this.version;
    const status: boolean = this.status;
    return {name, version, status};
  }

}
