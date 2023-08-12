import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit, OnChanges {
  @Input() data: any;
  constructor() {}

  ngOnInit() {
    console.log('init ', this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data']['currentValue']) {
      console.log('changes ', this.data);
    }
  }
}
