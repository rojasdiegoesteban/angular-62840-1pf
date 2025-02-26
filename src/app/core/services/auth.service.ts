import { Injectable } from "@angular/core";
import { LoginPayload } from "../../modules/auth/models";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../../modules/dashboard/pages/users/models";
import { generateRandomString } from "../../shared/utils";
import { Router } from "@angular/router";

const FAKE_USERS_DB: User[] = [
    {
        id: generateRandomString(6),
        name: "Empleado01",
        email: "employee01@email.com",
        password: "123456",
        role: "EMPLOYEE",
        accessToken: "flkjfdsEWRSsdaeees45234ASDasdf"
    },
    {
        id: generateRandomString(6),
        name: "Administrador01",
        email: "admin01@email.com",
        password: "123456",
        role: "ADMIN",
        accessToken: "gkmdsEWRSsmslis72546lojsohfh"
    }
];

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private router: Router) {}

    private _authUser$ = new BehaviorSubject<null | User>(null);
    authUser$ = this._authUser$.asObservable();

    get isAdmin$(): Observable<boolean> {
        return this.authUser$.pipe(map((user) => user?.role === 'ADMIN'));
    }
 
    login(payload: LoginPayload): void {
        const loginResult = FAKE_USERS_DB.find(
            (user) => user.email === payload.email && user.password === payload.password);

        if (!loginResult) {
            alert("Usuario o contraseña incorrectos");
            return;
        }

        localStorage.setItem('access_token', loginResult.accessToken);
        this._authUser$.next(loginResult);
        this.router.navigate(['dashboard', 'home']);
    }

    logout(): void {
        localStorage.removeItem('access_token');
        this._authUser$.next(null);
        this.router.navigate(['auth', 'login']);
    }

    isAuthenticated(): Observable<boolean> {
        const storageUser = FAKE_USERS_DB.find(x => x.accessToken === localStorage.getItem('access_token'));
        this._authUser$.next(storageUser || null);
        return this.authUser$.pipe(map((user) => !!user));
    }

}