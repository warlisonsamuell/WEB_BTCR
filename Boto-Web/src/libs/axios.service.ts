import { Injectable } from '@angular/core';
import api from './axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor() {}

  getResumes() {
    return api.get('/pessoa');
  }

  getCompleteResume() {
    return api.get('/completeResume');
  }

  post(data: { nome: string; fullText: string }) {
    console.log('data', data);
    return api.post('/pessoa', data);
  }
}
