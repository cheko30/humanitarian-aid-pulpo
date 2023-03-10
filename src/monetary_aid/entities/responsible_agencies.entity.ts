import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResponsibleAgencies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;
}
