import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  // Obtiene el elemento nativo del view
  constructor(public el: ElementRef) {


  }

  ngOnInit(){
    let element = this.el.nativeElement;
        element.style.background = "blue";
        element.style.padding = "20px";
        element.style.marginTop = "15px";
        element.style.color = "white";

        // Guardar en el elemento nativo el texto en mayuscula que se encuentra en element
        element.innerText = element.innerText.toUpperCase().replace("CONTACTO", 'Texto remplazado');
  }

}
