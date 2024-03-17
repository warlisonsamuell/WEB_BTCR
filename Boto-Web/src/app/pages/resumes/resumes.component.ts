import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AxiosService } from '../../../libs/axios.service';

import { transformMonthsInYears } from '../../../utils/transformMonthsInYears';
import { compareAcademicInformation } from '../../../utils/compareAcademicInformation';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-resumes',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './resumes.component.html',
  styleUrl: './resumes.component.css',
})
export class ResumesComponent {
  timeFilter = [
    {
      name: '0 a 1 ano',
      option: '12',
    },
    {
      name: '1 a 3 ano',
      option: '36',
    },
    {
      name: '3 a 5 ano',
      option: '60',
    },
    {
      name: 'A partir de 5 anos',
      option: '61',
    },
  ];
  educationFilter = [
    {
      name: 'Ensino médio',
      option: 'ensinomedio',
    },
    {
      name: 'Ensino superior',
      option: 'ensinosuperior',
    },
    {
      name: 'Pós graduação',
      option: 'posgraduacao',
    },
    {
      name: 'Mestrado',
      option: 'mestrado',
    },
    {
      name: 'Doutorado',
      option: 'doutorado',
    },
  ];
  resumes: Resume[] = [];

  form = new FormGroup({
    tempoExp: new FormControl(''),
    escolaridade: new FormControl(''),
  });

  constructor(private apiService: AxiosService) {}

  getResumes() {
    this.apiService
      .getCompleteResume()
      .then((response) => {
        this.resumes = response.data;
      })
      .catch((error) => {});
  }

  ngOnInit(): void {
    this.getResumes();
  }

  filterResumes(): void {
    this.apiService
      .getCompleteResume(this.form.value)
      .then((response) => {
        console.log(response);
        this.resumes = response.data;
      })
      .catch((error) => {});
  }

  transformMonthsInYears(time: number): string {
    return transformMonthsInYears(time);
  }

  compareAcademicInformation(resume: Resume): string {
    return compareAcademicInformation(resume);
  }
}
