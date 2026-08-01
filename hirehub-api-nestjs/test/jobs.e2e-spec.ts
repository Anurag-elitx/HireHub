import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Role } from './../src/users/user.entity';
import { JobType, JobStatus } from './../src/jobs/job.entity';

describe('JobsModule (e2e)', () => {
  let app: INestApplication;
  let employerToken: string;
  let jobId: string;
  const employerEmail = `employer_${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Register employer and get token
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: employerEmail, password: 'password123', role: Role.EMPLOYER, full_name: 'Employer User' });
    employerToken = res.body.access_token;
  });

  it('/jobs (POST) - Create Job', () => {
    return request(app.getHttpServer())
      .post('/api/jobs')
      .set('Authorization', `Bearer ${employerToken}`)
      .send({
        title: 'Senior Developer',
        description: 'Great role',
        company: 'Tech Corp',
        location: 'Remote',
        salary_min: 100000,
        salary_max: 150000,
        job_type: JobType.FULL_TIME
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('Senior Developer');
        jobId = res.body.id;
      });
  });

  it('/jobs (GET) - List Jobs', () => {
    return request(app.getHttpServer())
      .get('/api/jobs')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('total');
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
