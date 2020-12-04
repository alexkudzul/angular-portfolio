// Modulos para crear un servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';
import { Global } from './global';

@Injectable()
export class ProjectService{
  public url: string;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.url;
  }

  testService(){
    return 'Probando el servicio de Angular'
  }

  // Ajax Post
  saveProject(project: Project): Observable<any>{
    // configuracion
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // envio por post
    return this._http.post(this.url+'save-project', params, {headers: headers});
  }

  // projects
  getProjects(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // hacer la peticion con get a la url
    return this._http.get(this.url+'projects', {headers:headers});
  }

  // details, pasar un id al API para buscarlo en la BD
  getProject(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // hacer la peticion con get a la url
    return this._http.get(this.url+'project/'+id, {headers:headers});
  }

  // delete details
  deleteProject(id): Observable <any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url+'project/'+id, {headers:headers});
  }

  // update completed detail project
  updateProject(project): Observable<any>{
    // convertir el project completo en json
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url+'project/'+ project._id ,params, {headers: headers});
  }

}
