import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { DocentesModule } from './docentes/docentes.module';
import { MateriasModule } from './materias/materias.module';
import { CarrerasModule } from './carreras/carreras.module';
import { CiclosModule } from './ciclos/ciclos.module';

@Module({
  imports: [
    EstudiantesModule,
    DocentesModule,
    MateriasModule,
    CarrerasModule,
    CiclosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
