import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from 'types';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: string;

  @Column()
  problem: boolean;
}
