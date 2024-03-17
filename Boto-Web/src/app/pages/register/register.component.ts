import { Component } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AxiosService } from '../../../libs/axios.service';
import { GetTextFromPDF } from '../../../utils/extractTextFromPDF';
import {NgToastService} from 'ng-angular-popup'


declare global {
  interface Window {
    handleGlobalText: () => any
  }
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  nome = new FormControl('');
  fullText = '';
  file: FileList | null = null;

  constructor(private apiService: AxiosService, private toast: NgToastService) {}

  updateFile(event: any) {
    const file: FileList = event.target.files[0];
    this.file = file;
  }

  uploadData() {
    setTimeout(() => {
      window.handleGlobalText().then((resp: any) => {
        if(!resp || !this.nome.value){
          console.log("file",this.file)
          console.log("nome",this.nome.value)
          return this.toast.error({detail:"Error message", summary:"Nome ou PDF inválido", duration:3000})
        }
        this.apiService.post({
          nome: this.nome.value ?? '',
          fullText: resp,
        }),
        this.toast.success({detail:"Success message", summary:"PDF cadastrado com sucesso", duration:3000})
      });
    }, 5000);
  }

}
