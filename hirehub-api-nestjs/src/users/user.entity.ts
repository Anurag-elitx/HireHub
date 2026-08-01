import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Job } from '../jobs/job.entity';
import { Application } from '../applications/application.entity';

export enum Role {
  CANDIDATE = 'CANDIDATE',
  EMPLOYER = 'EMPLOYER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ nullable: true })
  full_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Job, (job: Job) => job.employer)
  jobs: Job[];

  @OneToMany(() => Application, (application: Application) => application.candidate)
  applications: Application[];
}
