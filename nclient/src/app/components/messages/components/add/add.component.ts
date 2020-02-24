import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../../models/message';
import { MessageService } from '../../../../services/message.service';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { Follow } from '../../../../models/follow';
import { FollowService } from '../../../../services/follow.service' ;
import { GLOBAL } from '../../../../services/global';


@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: [FollowService, MessageService]
})
export class AddComponent implements OnInit{
    public title: string;
    public message: Message;
    public identity;
    public token;
    public url: string;
    public status: string;
    public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.title = 'Enviar Mensaje';
        
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.message = new Message('','','','',this.identity._id,'');


        
    }
    ngOnInit(){
        console.log('add.component cargado');
    }
}