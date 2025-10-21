import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpiando base de datos...');
  await prisma.matricula.deleteMany({});
  await prisma.materia.deleteMany({});
  await prisma.estudiante.deleteMany({});
  await prisma.especialidad.deleteMany({});
  await prisma.ciclo.deleteMany({});
  await prisma.docente.deleteMany({});
  await prisma.carrera.deleteMany({});

  console.log('Creando carreras...');
  const carrera1 = await prisma.carrera.create({
    data: { nombre_Carrera: "Ingeniería de Sistemas" }
  });
  const carrera2 = await prisma.carrera.create({
    data: { nombre_Carrera: "Administración de Empresas" }
  });
  const carrera3 = await prisma.carrera.create({
    data: { nombre_Carrera: "Medicina" }
  });
  const carrera4 = await prisma.carrera.create({
    data: { nombre_Carrera: "Derecho" }
  });
  const carrera5 = await prisma.carrera.create({
    data: { nombre_Carrera: "Arquitectura" }
  });

  console.log('Creando especialidades...');
  await prisma.especialidad.createMany({
    data: [
      { nombre_Especialidad: "Desarrollo Web", descripcion: "Aplicaciones web modernas", carreraId: carrera1.id_Carrera },
      { nombre_Especialidad: "Inteligencia Artificial", descripcion: "IA y Machine Learning", carreraId: carrera1.id_Carrera },
      { nombre_Especialidad: "Ciberseguridad", descripcion: "Seguridad informática", carreraId: carrera1.id_Carrera },
      { nombre_Especialidad: "Gestión Financiera", descripcion: "Finanzas y contabilidad", carreraId: carrera2.id_Carrera },
      { nombre_Especialidad: "Marketing Digital", descripcion: "Marketing en línea", carreraId: carrera2.id_Carrera },
      { nombre_Especialidad: "Cirugía General", descripcion: "Especialidad quirúrgica", carreraId: carrera3.id_Carrera },
      { nombre_Especialidad: "Pediatría", descripcion: "Medicina infantil", carreraId: carrera3.id_Carrera },
      { nombre_Especialidad: "Derecho Civil", descripcion: "Normativa civil", carreraId: carrera4.id_Carrera },
      { nombre_Especialidad: "Derecho Penal", descripcion: "Normativa penal", carreraId: carrera4.id_Carrera }
    ]
  });

  console.log('Creando ciclos...');
  const ciclos: any[] = [];
  for (const carrera of [carrera1, carrera2, carrera3, carrera4, carrera5]) {
    for (let i = 1; i <= 8; i++) {
      const ciclo = await prisma.ciclo.create({
        data: { numero_Ciclo: i, periodo: "2025-1", carreraId: carrera.id_Carrera }
      });
      ciclos.push(ciclo);
    }
  }

  console.log('Creando docentes...');
  const docentes = [
    { nombre: "Juan", apellido: "Pérez", cedula: "0102030405", email: "juan.perez@university.edu", telefono: "0991234567" },
    { nombre: "María", apellido: "Gómez", cedula: "0203040506", email: "maria.gomez@university.edu", telefono: "0987654321" },
    { nombre: "Pedro", apellido: "Rodríguez", cedula: "0304050607", email: "pedro.rodriguez@university.edu", telefono: "0986543210" },
    { nombre: "Ana", apellido: "Martínez", cedula: "0405060708", email: "ana.martinez@university.edu", telefono: "0985432109" },
    { nombre: "Luis", apellido: "Fernández", cedula: "0506070809", email: "luis.fernandez@university.edu", telefono: "0984321098" },
    { nombre: "Carmen", apellido: "López", cedula: "0607080910", email: "carmen.lopez@university.edu", telefono: "0983210987" },
    { nombre: "Jorge", apellido: "Sánchez", cedula: "0708091011", email: "jorge.sanchez@university.edu", telefono: "0982109876" },
    { nombre: "Elena", apellido: "Ramírez", cedula: "0809101112", email: "elena.ramirez@university.edu", telefono: "0981098765" },
    { nombre: "Roberto", apellido: "Torres", cedula: "0910111213", email: "roberto.torres@university.edu", telefono: "0980987654" },
    { nombre: "Isabel", apellido: "Flores", cedula: "1011121314", email: "isabel.flores@university.edu", telefono: "0989876543" },
    { nombre: "Miguel", apellido: "Castro", cedula: "1112131415", email: "miguel.castro@university.edu", telefono: "0988765432" },
    { nombre: "Laura", apellido: "Moreno", cedula: "1213141516", email: "laura.moreno@university.edu", telefono: "0987654322" },
    { nombre: "Diego", apellido: "Ortiz", cedula: "1314151617", email: "diego.ortiz@university.edu", telefono: "0986543211" },
    { nombre: "Sofía", apellido: "Vega", cedula: "1415161718", email: "sofia.vega@university.edu", telefono: "0985432100" },
    { nombre: "Fernando", apellido: "Romero", cedula: "1516171819", email: "fernando.romero@university.edu", telefono: "0984321099" }
  ];

  const docentesCreados: any[] = [];
  for (const docente of docentes) {
    const docenteCreado = await prisma.docente.create({ data: docente });
    docentesCreados.push(docenteCreado);
  }

  console.log('Creando materias...');
  const materiasData = [
    { nombre_Materia: "Programación I", creditos: 4 },
    { nombre_Materia: "Programación II", creditos: 4 },
    { nombre_Materia: "Base de Datos", creditos: 5 },
    { nombre_Materia: "Estructuras de Datos", creditos: 4 },
    { nombre_Materia: "Algoritmos", creditos: 4 },
    { nombre_Materia: "Redes de Computadoras", creditos: 3 },
    { nombre_Materia: "Sistemas Operativos", creditos: 4 },
    { nombre_Materia: "Ingeniería de Software", creditos: 5 },
    { nombre_Materia: "Administración Básica", creditos: 3 },
    { nombre_Materia: "Contabilidad General", creditos: 4 },
    { nombre_Materia: "Microeconomía", creditos: 3 },
    { nombre_Materia: "Macroeconomía", creditos: 3 },
    { nombre_Materia: "Marketing", creditos: 3 },
    { nombre_Materia: "Recursos Humanos", creditos: 3 },
    { nombre_Materia: "Anatomía", creditos: 6 },
    { nombre_Materia: "Fisiología", creditos: 6 },
    { nombre_Materia: "Farmacología", creditos: 5 },
    { nombre_Materia: "Patología", creditos: 5 },
    { nombre_Materia: "Derecho Constitucional", creditos: 4 },
    { nombre_Materia: "Derecho Romano", creditos: 3 },
    { nombre_Materia: "Derecho Mercantil", creditos: 4 },
    { nombre_Materia: "Diseño Arquitectónico", creditos: 5 },
    { nombre_Materia: "Teoría de la Arquitectura", creditos: 3 },
    { nombre_Materia: "Construcción", creditos: 4 }
  ];

  const materias: any[] = [];
  for (let i = 0; i < materiasData.length; i++) {
    const materia = await prisma.materia.create({
      data: {
        nombre_Materia: materiasData[i].nombre_Materia,
        creditos: materiasData[i].creditos,
        docenteId: docentesCreados[i % docentesCreados.length].id_docente,
        cicloId: ciclos[i % ciclos.length].id_Ciclo
      }
    });
    materias.push(materia);
  }

  console.log('Creando estudiantes...');
  const estudiantesData = [
    { nombre: "Carlos", apellido: "García", cedula: "1234567890", email: "carlos.garcia@student.edu", telefono: "0987654321" },
    { nombre: "Ana", apellido: "López", cedula: "2345678901", email: "ana.lopez@student.edu", telefono: "0976543210" },
    { nombre: "José", apellido: "Hernández", cedula: "3456789012", email: "jose.hernandez@student.edu", telefono: "0965432109" },
    { nombre: "Lucía", apellido: "Díaz", cedula: "4567890123", email: "lucia.diaz@student.edu", telefono: "0954321098" },
    { nombre: "Andrés", apellido: "Vargas", cedula: "5678901234", email: "andres.vargas@student.edu", telefono: "0943210987" },
    { nombre: "Valentina", apellido: "Cruz", cedula: "6789012345", email: "valentina.cruz@student.edu", telefono: "0932109876" },
    { nombre: "Mateo", apellido: "Ruiz", cedula: "7890123456", email: "mateo.ruiz@student.edu", telefono: "0921098765" },
    { nombre: "Camila", apellido: "Jiménez", cedula: "8901234567", email: "camila.jimenez@student.edu", telefono: "0910987654" },
    { nombre: "Santiago", apellido: "Morales", cedula: "9012345678", email: "santiago.morales@student.edu", telefono: "0909876543" },
    { nombre: "Daniela", apellido: "Núñez", cedula: "0123456789", email: "daniela.nunez@student.edu", telefono: "0908765432" },
    { nombre: "Sebastián", apellido: "Gutiérrez", cedula: "1234567891", email: "sebastian.gutierrez@student.edu", telefono: "0907654321" },
    { nombre: "Sofía", apellido: "Méndez", cedula: "2345678902", email: "sofia.mendez@student.edu", telefono: "0906543210" },
    { nombre: "David", apellido: "Paredes", cedula: "3456789013", email: "david.paredes@student.edu", telefono: "0905432109" },
    { nombre: "Isabella", apellido: "Silva", cedula: "4567890124", email: "isabella.silva@student.edu", telefono: "0904321098" },
    { nombre: "Gabriel", apellido: "Reyes", cedula: "5678901235", email: "gabriel.reyes@student.edu", telefono: "0903210987" },
    { nombre: "Mariana", apellido: "Aguilar", cedula: "6789012346", email: "mariana.aguilar@student.edu", telefono: "0902109876" },
    { nombre: "Nicolás", apellido: "Campos", cedula: "7890123457", email: "nicolas.campos@student.edu", telefono: "0901098765" },
    { nombre: "Victoria", apellido: "Ramos", cedula: "8901234568", email: "victoria.ramos@student.edu", telefono: "0900987654" },
    { nombre: "Emilio", apellido: "Serrano", cedula: "9012345679", email: "emilio.serrano@student.edu", telefono: "0999876543" },
    { nombre: "Alejandra", apellido: "Blanco", cedula: "0123456780", email: "alejandra.blanco@student.edu", telefono: "0998765432" },
    { nombre: "Felipe", apellido: "Ríos", cedula: "1234567892", email: "felipe.rios@student.edu", telefono: "0997654321" },
    { nombre: "Paula", apellido: "Mendoza", cedula: "2345678903", email: "paula.mendoza@student.edu", telefono: "0996543210" },
    { nombre: "Ricardo", apellido: "Peña", cedula: "3456789014", email: "ricardo.pena@student.edu", telefono: "0995432109" },
    { nombre: "Natalia", apellido: "Luna", cedula: "4567890125", email: "natalia.luna@student.edu", telefono: "0994321098" },
    { nombre: "Álvaro", apellido: "Córdoba", cedula: "5678901236", email: "alvaro.cordoba@student.edu", telefono: "0993210987" }
  ];

  const estudiantes: any[] = [];
  for (let i = 0; i < estudiantesData.length; i++) {
    const cicloIndex = Math.floor(i / 5) % ciclos.length;
    const estudiante = await prisma.estudiante.create({
      data: {
        ...estudiantesData[i],
        carreraId: ciclos[cicloIndex].carreraId,
        cicloId: ciclos[cicloIndex].id_Ciclo
      }
    });
    estudiantes.push(estudiante);
  }

  console.log('Creando matrículas...');
  const matriculas = [];
  for (const estudiante of estudiantes) {
    const numMaterias = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < numMaterias; i++) {
      const materiaIndex = Math.floor(Math.random() * materias.length);
      try {
        await prisma.matricula.create({
          data: {
            fecha_Matricula: "2025-10-21",
            estado: ["Inscrito", "Aprobado", "Reprobado"][Math.floor(Math.random() * 3)],
            estudianteId: estudiante.id_Estudiante,
            materiaId: materias[materiaIndex].id_Materia
          }
        });
      } catch (error) {
      }
    }
  }

  console.log('\n✅ Base de datos poblada con éxito!');
  console.log(`✅ ${await prisma.carrera.count()} carreras creadas`);
  console.log(`✅ ${await prisma.especialidad.count()} especialidades creadas`);
  console.log(`✅ ${await prisma.ciclo.count()} ciclos creados`);
  console.log(`✅ ${await prisma.docente.count()} docentes creados`);
  console.log(`✅ ${await prisma.materia.count()} materias creadas`);
  console.log(`✅ ${await prisma.estudiante.count()} estudiantes creados`);
  console.log(`✅ ${await prisma.matricula.count()} matrículas creadas`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
