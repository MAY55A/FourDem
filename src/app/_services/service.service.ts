import { Injectable } from '@angular/core';
import { Service } from '../_models/service';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  public getService(id: number) {
    return this.httpClient.get<Service>(`${environment.apiUrl}/services/${id}`);
  }

  public getAllServices() {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services`);
  }
    
  public getServicesByUser(user: number) {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services/user/${user}`);
  }
  
  public getServicesByDomain(domain: string) {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services/domain/${domain}`);
  }
  
  public getServicesByProject(project: number) {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/services/project/${project}`);
  }
  
  public createService(service: Service) {
    return this.httpClient.post<Service>(`${environment.apiUrl}/services/create`, service);
  }

  public updateService(service: Service) {
    return this.httpClient.put<Service>(`${environment.apiUrl}/services/${service.id}/update`, service);
  }

  public deleteService(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/services/${id}/delete`);
  }
}
