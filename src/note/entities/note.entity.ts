import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export class Note {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ type: 'boolean', default: false })
  fixed: boolean;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
