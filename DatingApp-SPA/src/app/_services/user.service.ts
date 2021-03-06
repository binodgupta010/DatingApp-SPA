import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

// const httpoption = {
//     headers: new HttpHeaders({
//       'Authorization' : 'Bearer ' + localStorage.getItem('token')
//     })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  // return this.http.get<User[]>(this.baseUrl + 'users' , httpoption);//token passed in appmodule
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id): Observable<User> {
 // return this.http.get<User>(this.baseUrl + 'users/' + id , httpoption);
 return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number , user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}

DeletePhoto(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

}
