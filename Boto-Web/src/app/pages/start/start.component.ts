import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../../../libs/axios.service';

@Component({
    selector: 'app-resumes',
    templateUrl: './start.component.html',
    styleUrl: './start.component.css',
})

export class StartComponent {
    constructor(private apiService: AxiosService) {}

}