import { Component } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AxiosService } from '../../../libs/axios.service';
import { NgToastService } from 'ng-angular-popup';


const padrao = /\(LinkedIn\)/;

declare global {
  interface Window {
    handleGlobalText: () => any;
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

  constructor(
    private apiService: AxiosService,
    private toast: NgToastService
  ){}

  updateFile(event: any) {
    const file: FileList = event.target.files[0];
    this.file = file;
  };

  ngOnInit(){
      // window.location.reload();
  }
  
  uploadData() {
    setTimeout(() => {
      window.handleGlobalText().then((resp:any) => {
        if (!resp || !this.nome.value || !padrao.test(resp)) {
          console.log("dentro",resp)
          console.log('file', this.file);
          console.log('nome', this.nome.value);
          this.toast.error({
            detail: 'Mensagem de erro',
            summary: 'Nome ou PDF inválido',
            duration: 5000,
            position: 'topCenter',
          });
          return;
        };
        
        console.log("fora",resp)
        
        this.toast.success({
          detail: 'SUCESSO',
          summary: 'PDF cadastrado com sucesso',
          duration: 5000,
          position: 'topCenter',
        });

        this.apiService.post({
          nome: this.nome.value ?? '',
          fullText: resp,
        });
      });

    }, 2000);
 
    setTimeout(() => {
      window.location.reload();
    }, 4000);
    
  }

}