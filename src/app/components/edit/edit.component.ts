import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  // Reutilizar el template
  // templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {
    this.title = "Editar proyecto";
    this.url = Global.url;
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

  // Guarda datos basicos
  // saveProject metodo se encuentra project.service.ts
  // Agrega un project que se esta almacenando en public project: Project;
  // un metodo subscribe( recoge los valores por ajax) con el Observable, tiene dos callbacks result y error
  onSubmit(){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        // console.log(response);
        if(response.project){
          // Subir imagen
          // Si en el array files hay un elemento
          if(this.filesToUpload){
            // #2.- Subir la imagen con promesa, makeFileRequest, tiene varios parametros para subir los archivos por ajax
            // url de la api, []=> array de parametros opcionales, filesToUpload => array de archivos, image => nombre del campo que va a recibir el backend
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            // result => Recoge todo los datos que llegan del servicio o que devuelve el API REST
            .then((result: any)=>{
              // project, objeto creado por el result
              this.save_project = result.project;

              this.status = 'success';

              console.log(result);
            });
          }else{
            this.save_project = response.project;
            this.status = 'success'
          }
        }else{

          this.status = 'failed';

        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // #1.- Una vez que se ha capturado los archivos
  // recibe el fileInput(captura el evento)
  fileChangeEvent(fileInput: any){
    // contiene toda la informacion del archivo
    console.log(fileInput);
    // castear a que sea un array de tipo File, fileInput => captura el evento y accedemos a los archivos
    this.filesToUpload = <Array<File>>fileInput.target.files; // captura todo los archivos que se desea subir
  }

}
