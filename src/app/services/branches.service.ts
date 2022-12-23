import { Injectable, Injector } from '@angular/core';
import { BaseserviceService } from './baseservice.service';

@Injectable({
  providedIn: 'root'
})
export class BranchesService  extends BaseserviceService {

  constructor(inj: Injector) {
    super(inj);
  }

  getAllbranches() {
    const url = this.getUrlConfigurations().getAllBranches;
    
    return this.get<any>(url);
}

}
