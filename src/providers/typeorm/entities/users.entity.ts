import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column({ generated: 'uuid', primary: true })
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  first_name: string;

  @Column({ nullable: true })
  @ApiProperty()
  middle_name?: string;

  @Column()
  @ApiProperty()
  last_name: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  password: string;
}
