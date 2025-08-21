import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged, User, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth) {

    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

 
  get currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }


  async login(email: string, password: string) {
    await setPersistence(this.auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(this.auth, email, password);
  }


  forgetPass(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }


  logout() {
    return signOut(this.auth);
  }
}
