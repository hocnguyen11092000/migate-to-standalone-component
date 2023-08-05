import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-test-ng-template',
  templateUrl: './test-ng-template.component.html',
  styleUrls: ['./test-ng-template.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TestNgTemplateComponent implements OnInit {
  @Input() errorTip!: TemplateRef<any>;
  error = 'required';

  constructor() {}

  ngOnInit() {
    console.log(this.errorTip);
  }
}
