import { Component } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AxiosService } from '../../../libs/axios.service';
import { GetTextFromPDF } from '../../../utils/extractTextFromPDF';

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

  constructor(private apiService: AxiosService) {}

  updateFile(event: any) {
    const file: FileList = event.target.files[0];
    this.file = file;
  }

  uploadData() {
    setTimeout(() => {
      window.handleGlobalText().then((resp: any) => {
        this.apiService.post({
          nome: this.nome.value ?? '',
          fullText: resp,
        });
      });
    }, 5000);
  }

}
