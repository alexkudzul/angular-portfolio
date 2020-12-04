// Modulos para crear un servicio
import { Injectable } from '@angular/core';
import { Global } from './global';

// Decorado para definir un servicio
@Injectable()
export class UploadService{
  // definir la url de la API
  public url: string;

  constructor(){
    this.url = Global.url;
  }
  /**
   * @param url => donde se hara la peticion
   * @param params => posibles parametros que se estara enviando
   * @param files => array de archivos  de tipo file, viene por defecto en Angular
   * @param name => nombre del archivo que va a recibir el backend
   */

  // Subir imagen al backend con ajax clasica xml
  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
    /**
     * Promesas tiene una funcion de callback
     * resolve => se ha resuelto reject => no se ha resuelto
     */
    return new Promise(function (resolve, reject) {
      // formData simula una peticion clasica, FormData => Objeto que permite crear un formulario dentro de un objeto
      var formData: any = new FormData();
      // xhr simula ajax, XMLHttpRequest objeto de peticiones asincronas
      var xhr = new XMLHttpRequest();

      // Recorre el array de archivos que puede llegar
      for( var i = 0; i < files.length; i++){
        // adjunta el archivo a formData con el name, files[i] añade los archivos en la peticion, files[i].name obtiene su nombre
        formData.append(name, files[i], files[i].name);
      }

      // cuando alla un cambio ejecutar la funcion
      xhr.onreadystatechange = function(){
        // Si la peticion ajax es igual a 4(valores que funcionan con angular)
        if(xhr.readyState == 4){
          // si la peticion tiene un estatus de 200
          if(xhr.status == 200){
            // convertir el response en json
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }

      // Realizar la peticion, con el verbo, la url y true para realizar la peticion
      xhr.open('POST', url, true);
      // Enviar todo el formulario
      xhr.send(formData);
    });
  }
}
