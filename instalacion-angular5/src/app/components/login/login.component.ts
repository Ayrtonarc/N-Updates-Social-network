import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit{
  public title:string;
  public user:User;
  public status:string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Identificate';
    this.user = new User("","","","","","","ROLE_USER","","");
  }
  ngOnInit(){
    console.log('Componente del login cargado...');
  }
  onSubmit(){
  //loguear al usuario y conseguir los datos
  this._userService.signup(this.user).subscribe(
    response => {
      this.identity = response.user;

      console.log(this.identity);

      if(!this.identity || !this.identity._id){
        this.status = 'error';
      }else{
        this.status = 'success';
        //PERSISTIR DATOS DEL USUARIO
        localStorage.setItem('identity', JSON.stringify(this.identity));
        //CONSEGUIR EL TOKKEN
        this.gettoken();
      }

    },
    error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
            this.status = 'error';
                }
            }
        );
    }

        gettoken(){
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              this.token = response.token;

              if(this.token.lenght <= 0){
                this.status = 'error';
              }else{
                this.status = 'success';
                //PERSISTIR TOKEN DEL USUARIO
                localStorage.setItem('token',this.token);
                //CONSEGUIR ESTADISTICAS DEL USUARIO
               // this.getCounters();
              }

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                        }
                    }
                );

    }
  /*  getCounters(){
      this._userService.getCounters().subscribe(
        response => {
         console.log(response);
         this._router.navigate(['/']);
        },
        error => {
          console.log(<any>error);
        }
      )
    } */
}
