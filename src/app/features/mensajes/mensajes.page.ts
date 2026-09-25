import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  templateUrl: './mensajes.page.html',
  styleUrls: ['./mensajes.page.scss'],
  imports: [IonContent]
})
export class MensajesPage {}
