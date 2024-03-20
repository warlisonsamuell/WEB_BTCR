import { Injectable } from '@angular/core';
import api from './axios';

interface Parametros {
  tempoExp: string;
  escolaridade: string;
  idioma: string;
}

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor() {}

  getResumes() {
    return api.get('/pessoa');
  }

  getCompleteResume(params?: any) {
    return api.get('/pessoa', { params });
  }

  post(data: { nome: string; fullText: string }) {
    return api.post('/pessoa', data);
  }
}
