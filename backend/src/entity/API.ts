import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class API {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column()
  login: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  pushed_at: string;

  @Column()
  language: string;
}
