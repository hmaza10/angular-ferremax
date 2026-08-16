import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './model/LoginRequest';
import { Usuario } from './model/Usuario';

const API_URL = 'http://localhost:8080/api/auth';

interface AuthResponse {
  mensaje: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<AuthResponse> {
    const body = new LoginRequest(usuario, password);
    return this.http.post<AuthResponse>(`${API_URL}/login`, body, { withCredentials: true });
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    const body = { username, email, password };
    return this.http.post<AuthResponse>(`${API_URL}/register`, body, { withCredentials: true });
  }

  me(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${API_URL}/me`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${API_URL}/logout`, {}, { withCredentials: true });
  }

}
