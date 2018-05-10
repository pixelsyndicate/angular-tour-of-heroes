import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service'; // <-- for DI

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    //  ensure the depend inj is public, as it will be bound in a template.
    constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
