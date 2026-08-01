import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/users/user.entity';

describe('AuthModule (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  const uniqueEmail = `test_${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: uniqueEmail,
        password: 'password123',
        role: Role.CANDIDATE,
        full_name: 'Test Candidate'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: uniqueEmail,
        password: 'password123'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('user');
        jwtToken = res.body.access_token;
      });
  });

  it('/users/profile (GET) - Protected', () => {
    return request(app.getHttpServer())
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toEqual(uniqueEmail);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
