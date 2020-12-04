import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project; // objeto para crear proyecto
  public save_project; //proyecto guardado
  public status: string;
  public filesToUpload: Array<File>; //ficheros para subir, array de tipo File
  public url: string;

  constructor(
    // propiedad _projectServices de tipo ProjectService(objeto)
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project('', '', '', '', 2020 , '', '');
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  // se pasa el form como parametro
  onSubmit(form){
    console.log(this.project);
    /**
     * Guarda datos basicos
     * saveProject metodo se encuentra project.service.ts
     * Agrega un project que se esta almacenando en public project: Project;
     * un metodo subscribe( recoge los valores por ajax) con el Observable, tiene dos callbacks result y error
     */

    this._projectService.saveProject(this.project).subscribe(
      response => {
        // console.log(response);
        if(response.project){
          // Subir imagen
          if(this.filesToUpload){
            // #Paso 2.- Subir la imagen con promesa, makeFileRequest, tiene varios parametros para subir los archivos por ajax
            // url de la api, []=> array de parametros opcionales, filesToUpload => array de archivos, image => nombre del campo que va a recibir el backend
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            // result => Recoge todo los datos que llegan del servicio o que devuelve el API REST
            .then((result: any)=>{
              // project, objeto creado por el result
              this.save_project = result.project;

              this.status = 'success';

              console.log(result);

              form.reset();
            });
          }else{
            this.save_project = response.project;
            this.status = 'success'
            form.reset();
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

  /**
   * @param fileInput => capura el evento fileInput, contiene toda la informacion del archivo
   */
  // #Paso 1.- Una vez que se ha capturado los archivos
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    // castear a que sea un array de tipo File, fileInput => captura el evento y accedemos a los archivos
    this.filesToUpload = <Array<File>>fileInput.target.files; // captura todo los archivos que se desea subir
  }

}
