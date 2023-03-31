import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'disclaimer-container',
  templateUrl: './disclaimer-container.component.html',
  styleUrls: ['./disclaimer-container.component.scss'],
})
export class DisclaimerContainerComponent implements OnInit {
  @Input() description: string;
  
  constructor() { }

  ngOnInit() {}

}
