import { Message, ChatService } from './../../service/chat.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
  
})
export class ChatComponent implements OnInit {
  toggled:boolean=true;
  @Output('hideChatEvent') 
  hideChatEvent = new EventEmitter<number>();  

  messages: Observable<Message[]>;
  formValue: string;
  constructor(public chat: ChatService) { }
  ngOnInit() {
    
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );
  }
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }


  hideChat() {
    
    this.hideChatEvent.emit(parseInt('2'));
}

  
}
