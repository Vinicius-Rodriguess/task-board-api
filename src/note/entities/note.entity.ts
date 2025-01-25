import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Note {
  @PrimaryColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ type: 'boolean', default: false })
  fixed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
