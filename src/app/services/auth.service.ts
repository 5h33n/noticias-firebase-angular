import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public aFireAuth: AngularFireAuth) { }
  async login(email:string, password: string){
    try{
      return await this.aFireAuth.signInWithEmailAndPassword(email,password);
    }catch(error){
      console.log(error);
      return error;
    }
  }
  async register(email:string,password:string){
    try{
      return await this.aFireAuth.createUserWithEmailAndPassword(email,password);
    }catch(error){
      console.log(error);
      return error;
    }
  }
  async logout(){
    try{
      return await this.aFireAuth.signOut();
    }catch(error){
      console.log(error);
      return error;
    }
  }
  removeUser(){
    localStorage.removeItem("currentUser");
  }
  setUser(user:string){
    localStorage.setItem("currentUser",user);
  }
  getCurrentUser(){
    return localStorage.getItem("currentUser");
  }
}
