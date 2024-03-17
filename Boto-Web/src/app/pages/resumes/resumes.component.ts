import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AxiosService } from '../../../libs/axios.service';

import { transformMonthsInYears } from '../../../utils/transformMonthsInYears';
import { compareAcademicInformation } from '../../../utils/compareAcademicInformation';

@Component({
  selector: 'app-resumes',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './resumes.component.html',
  styleUrl: './resumes.component.css',
})
export class ResumesComponent {
  timeFilter = [
    {
      option: '0 a 1 ano',
    },
    {
      option: '1 a 3 ano',
    },
    {
      option: '3 a 5 ano',
    },
    {
      option: 'A partir de 5 anos',
    },
  ];
  educationFilter = [
    {
      option: 'Ensino médio',
    },
    {
      option: 'Ensino superior',
    },
    {
      option: 'Pós graduação',
    },
    {
      option: 'Mestrado',
    },
    {
      option: 'Doutorado',
    },
  ];
  resumes: Resume[] = [];

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

  transformMonthsInYears(time: number): string {
    return transformMonthsInYears(time);
  }

  compareAcademicInformation(resume: Resume): string {
    return compareAcademicInformation(resume);
  }
}
