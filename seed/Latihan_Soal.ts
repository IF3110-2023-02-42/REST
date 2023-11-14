import { PrismaClient } from '@prisma/client';
import { generateSentence, getRandomNumberInRange } from './faker';
const prisma = new PrismaClient();

async function clearTable() {
    await prisma.history_Latsol.deleteMany({});
    await prisma.jawaban_Pengguna.deleteMany({});
    await prisma.soal.deleteMany({});
    await prisma.latihan_Soal.deleteMany({});
}

async function createLatihanSoal(ID_Material: number, judul: string, deksripsi: string) {
    const latihanSoal = await prisma.latihan_Soal.create({
        data: {
            ID_Material,
            judul,
            deksripsi
        },
    });
    const today = new Date();
    await createHistoryLatsol(latihanSoal.ID_Latsol, 2, new Date(today.setDate(today.getDate() - 2)), getRandomNumberInRange(0, 100))
    for (let i = 0; i < 10; i++) {
        const pertanyaan = generateSentence(10);
        const jawaban_benar = generateSentence(5);
        const jawaban_salah1 = generateSentence(5);
        const jawaban_salah2 = generateSentence(5);
        const jawaban_salah3 = generateSentence(5);
        await createSoal(latihanSoal.ID_Latsol, pertanyaan, jawaban_benar, jawaban_salah1, jawaban_salah2, jawaban_salah3)
    }
}

async function createSoal(ID_Latsol: string, pertanyaan: string, jawaban_benar: string, jawaban_salah1: string, jawaban_salah2: string, jawaban_salah3: string) {
    const soal = await prisma.soal.create({
        data: {
            ID_Latsol,
            pertanyaan,
            jawaban_benar,
            jawaban_salah1,
            jawaban_salah2,
            jawaban_salah3
        },
    });

    const jawaban = getRandomNumberInRange(1, 4);
    if (jawaban == 1) {
        await createJawabanPengguna(soal.ID_Soal, 2, jawaban_benar)
    } else {
        await createJawabanPengguna(soal.ID_Soal, 2, jawaban_salah2)
    }
}

async function createJawabanPengguna(ID_Soal: string, ID_Pengguna: number, jawaban: string,) {
    await prisma.jawaban_Pengguna.create({
        data: {
            ID_Soal,
            ID_Pengguna,
            jawaban,
        },
    });
}

async function createHistoryLatsol(ID_Latsol: string,
    ID_Pengguna: number,
    modified_at: Date,
    nilai: number) {
    await prisma.history_Latsol.create({
        data: {
            ID_Latsol,
            ID_Pengguna, // Replace with an actual user ID
            modified_at,
            nilai,
        },
    });
}

async function main() {
    await clearTable();

    // Seeding Latihan_Soal
    for (let i = 0; i < 10; i++) {
        const judul = generateSentence(8)
        const deksripsi = generateSentence(12)
        await createLatihanSoal(i + 1, judul, deksripsi)
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });