import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeorm.data-source';


@Module({
    imports:[ TypeOrmModule.forRoot(dataSourceOptions)]
})
export class MyTypeOrmModule {}
