import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column({ generated: 'uuid', primary: true })
  @ApiProperty()
  @Expose()
  id: string;

  @Column()
  @ApiProperty()
  @Expose()
  first_name: string;

  @Column({ nullable: true })
  @ApiProperty()
  @Expose()
  middle_name?: string;

  @Column()
  @ApiProperty()
  @Expose()
  last_name: string;

  @Column({ unique: true })
  @ApiProperty()
  @Expose()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
