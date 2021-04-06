import { TypeOrmModule } from '@nestjs/typeorm'

// TODO switch to .env
export const databaseConnections = [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'code',
      password: 'challenge',
      database: 'code-challenge',
      autoLoadEntities: true,
      synchronize: true,
    })
];