import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor() { }

  messageEmitter= new EventEmitter<Object>();
}
