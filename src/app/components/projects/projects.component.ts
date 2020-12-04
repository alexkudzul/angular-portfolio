import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService] // servicios
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public url: string;

  constructor(
    private _projectService : ProjectService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }
  // llama al metodo getProject que se encuentra en el servicio project
  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        console.log(response);
        // Si el respuesta tiene projects, guardar en la propiedad projects
        if(response.projects){
          this.projects = response.projects;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
