import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/services/auth.service';
import { timer, tap, Subject, finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private _auth = inject(AuthService);
  private _router = inject(Router);

  readonly loading$ = new Subject();

  login() {
    this.loading$.next(true);

    timer(1000)
      .pipe(
        tap(() => {
          this._auth.setToken('Bearer ___123456');
        }),
        finalize(() => {
          this.loading$.next(false);
          this._router.navigate(['admin/form-tab', 123], {
            queryParams: { id: 37, username: 'jimmy' },
          });
        })
      )
      .subscribe();
  }
}
