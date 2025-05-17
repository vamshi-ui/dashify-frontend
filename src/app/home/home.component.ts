import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  auth = inject(AuthService);

  name = JSON.parse(sessionStorage.getItem('loggedIUser')!).name;
  userprofileImage = JSON.parse(sessionStorage.getItem('loggedIUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('loggedIUser')!).email;
  number = JSON.parse(sessionStorage.getItem('loggedIUser')!).nbf;

  ngOnInit(): void {}

  signout() {
    this.auth.signOut();
    sessionStorage.removeItem('loggedIUser');
    this.auth.signOut();
  }
}
