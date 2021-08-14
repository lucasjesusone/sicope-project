import { User, UserDataToken, UserLogged } from "../_models/user.models";

export class Security {

    public static set(userLogged: UserLogged) {
        const data = JSON.stringify(userLogged.data);
        localStorage.setItem('sicope.user', btoa(data));
        localStorage.setItem('sicope.token', userLogged.data.token);
    }

    public static getUser(): UserDataToken {
        const data = localStorage.getItem('sicope.user');
        if (data) {
            return JSON.parse(atob(data));
        } else {
            return null;
        }
    }

    public static getToken(): string {
        const data = localStorage.getItem('sicope.token');
        if (data) {
            return data;
        } else {
            return null;
        }
    }

    public static hasToken(): boolean {
        if (this.getToken())
            return true;
        else
            return false;
    }

    public static clear() {
        localStorage.removeItem('sicope.user');
        localStorage.removeItem('sicope.token');
    }
}