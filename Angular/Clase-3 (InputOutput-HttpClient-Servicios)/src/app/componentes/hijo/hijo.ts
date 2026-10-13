import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-hijo',
  styleUrl: './hijo.css',
  templateUrl: './hijo.html',
})
export class Hijo implements OnChanges {
  dato = input('dato');

  ngOnChanges(changes: SimpleChanges): void {
  console.log("Hijo: ngOnChanges", changes);
  }
}
