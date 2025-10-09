-- CreateTable
CREATE TABLE "Docente" (
    "id_docente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id_docente")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id_Estudiante" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id_Estudiante")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id_Materia" SERIAL NOT NULL,
    "nombre_Materia" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id_Materia")
);

-- CreateTable
CREATE TABLE "Matricula" (
    "id_Matricula" SERIAL NOT NULL,
    "fecha_Matricula" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("id_Matricula")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id_Carrera" SERIAL NOT NULL,
    "nombre_Carrera" TEXT NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id_Carrera")
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "id_Especialidad" SERIAL NOT NULL,
    "nombre_Especialidad" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id_Especialidad")
);

-- CreateTable
CREATE TABLE "Ciclo" (
    "id_Ciclo" SERIAL NOT NULL,
    "numero_Ciclo" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Ciclo_pkey" PRIMARY KEY ("id_Ciclo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Docente_cedula_key" ON "Docente"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_email_key" ON "Docente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_cedula_key" ON "Estudiante"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_email_key" ON "Estudiante"("email");

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id_Carrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "Ciclo"("id_Ciclo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id_docente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "Ciclo"("id_Ciclo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id_Estudiante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id_Materia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Especialidad" ADD CONSTRAINT "Especialidad_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id_Carrera") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ciclo" ADD CONSTRAINT "Ciclo_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id_Carrera") ON DELETE RESTRICT ON UPDATE CASCADE;
