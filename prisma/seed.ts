import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const carrera1 = await prisma.carrera.create({
    data: { nombre_Carrera: "Ingeniería de Sistemas" }
  });
  const carrera2 = await prisma.carrera.create({
    data: { nombre_Carrera: "Administración de Empresas" }
  });

  await prisma.especialidad.createMany({
    data: [
      { nombre_Especialidad: "Desarrollo Web", descripcion: "Aplicaciones web", carreraId: carrera1.id_Carrera },
      { nombre_Especialidad: "Inteligencia Artificial", descripcion: "IA y Machine Learning", carreraId: carrera1.id_Carrera },
      { nombre_Especialidad: "Gestión Financiera", descripcion: "Finanzas y contabilidad", carreraId: carrera2.id_Carrera }
    ]
  });

  const ciclo1 = await prisma.ciclo.create({
    data: { numero_Ciclo: 1, periodo: "2025-1", carreraId: carrera1.id_Carrera }
  });
  const ciclo2 = await prisma.ciclo.create({
    data: { numero_Ciclo: 1, periodo: "2025-1", carreraId: carrera2.id_Carrera }
  });

  const docente1 = await prisma.docente.create({
    data: { nombre: "Juan", apellido: "Pérez", cedula: "0102030405", email: "juan@example.com", telefono: "0991234567" }
  });
  const docente2 = await prisma.docente.create({
    data: { nombre: "María", apellido: "Gómez", cedula: "0203040506", email: "maria@example.com", telefono: "0987654321" }
  });

  const materia1 = await prisma.materia.create({
    data: {
      nombre_Materia: "Programación I",
      creditos: 4,
      docenteId: docente1.id_docente,
      cicloId: ciclo1.id_Ciclo
    }
  });
  const materia2 = await prisma.materia.create({
    data: {
      nombre_Materia: "Administración Básica",
      creditos: 3,
      docenteId: docente2.id_docente,
      cicloId: ciclo2.id_Ciclo
    }
  });

  const estudiante1 = await prisma.estudiante.create({
    data: {
      nombre: "Carlos",
      apellido: "García",
      cedula: "1234567890",
      email: "carlos@example.com",
      telefono: "0987654321",
      carreraId: carrera1.id_Carrera,
      cicloId: ciclo1.id_Ciclo
    }
  });
  const estudiante2 = await prisma.estudiante.create({
    data: {
      nombre: "Ana",
      apellido: "López",
      cedula: "2345678901",
      email: "ana@example.com",
      telefono: "0976543210",
      carreraId: carrera2.id_Carrera,
      cicloId: ciclo2.id_Ciclo
    }
  });

  await prisma.matricula.createMany({
    data: [
      { fecha_Matricula: "2025-10-08", estado: "Inscrito", estudianteId: estudiante1.id_Estudiante, materiaId: materia1.id_Materia },
      { fecha_Matricula: "2025-10-08", estado: "Inscrito", estudianteId: estudiante2.id_Estudiante, materiaId: materia2.id_Materia }
    ]
  });

  console.log("Base de datos inicial creada con éxito!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
