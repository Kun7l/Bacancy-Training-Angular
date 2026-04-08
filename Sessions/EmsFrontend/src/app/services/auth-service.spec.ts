import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns login response from the api', () => {
    service.loginUser('admin', '1234').subscribe((response) => {
      expect(response.token).toBe('token-123');
    });

    const request = httpMock.expectOne('http://localhost:5059/api/user/login');
    expect(request.request.method).toBe('POST');
    request.flush({ token: 'token-123' });
  });

  it('stores and clears the token', () => {
    service.setToken('token-123');
    expect(service.getToken()).toBe('token-123');

    service.logout();

    expect(service.getToken()).toBeNull();
  });
});
