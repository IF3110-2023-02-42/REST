import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export class DiscussionModel
{
    async getAllDiscussions(){
        const result = await prisma.diskusi.findMany();
        return result; 
    }
    
    async addNewDiscussion(judul: string, author:string, content:string, numOfComment:number, keywords:string){
        const discussion = await prisma.diskusi.create({
            data:{
                Judul : judul,
                Penulis : author,
                Konten : content,
                JumlahKomentar : numOfComment,
                Keywords : keywords,
                },
            })
        return discussion;
    }
}

