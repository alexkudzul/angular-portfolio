import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService]
})
export class DetailComponent implements OnInit {

  public url: string;
  public project: Project; //guarda el projecto que devuelve la peticion
  public confirm: boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit() {
    // Recoge los parametros de la url al ejecutarse el componente
    this._route.params.subscribe(params => {
      let id = params.id;
      // Una vez obtenido se lo pasamos al metodo el id
      this.getProject(id);
    });
  }

  // getProject, llama al metodo que se encuentra en servicios de project, invoca al metodo y hace una peticion ajax
  // Recibe un id para pasarlo al metodo de servicio, para eso se tiene que importar los componentes del Router, ActivatedRoute y params
  getProject(id){
    // invocamos el servicio con el metodo, se le pasa el id que llega por parametro y subscribe recoge la respuesta
    this._projectService.getProject(id).subscribe(
      response => {
        // guarda el projecto que devuelve la peticion
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
      response => {
        // si la respuesta tiene un proyecto
        if(response.project){
          // hacer la direccion a proyectos
          this._router.navigate(['/projects']);
        }
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  setConfirm(confirmDelete){
    this.confirm = confirmDelete;
  }

}
