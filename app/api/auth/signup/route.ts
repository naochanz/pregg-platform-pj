export const dynamic = 'force-static';
import { NextRequest, NextResponse } from 'next/server';
import { ProfessionalType } from '@prisma/client';
import { z } from 'zod';
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
// import bcrypt from 'bcryptjs';

// 入力データのバリデーション用スキーマ
const signupSchema = z.object({
    name: z.string().min(1, "名前は必須です"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上必要です"),
    professionalType: z.nativeEnum(ProfessionalType, {
        errorMap: () => ({ message: "有効な士業タイプを選択してください" }),
    }),
    yearOfExperience: z.number().optional(),
});

export async function POST(request: NextRequest) {
    // console.log("body", request);
    try {
        // リクエストボディの解析
        const body = await request.json();


        // データのバリデーション
        const validationResult = signupSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: "入力データが無効です", details: validationResult.error.format() },
                { status: 400 }
            );
        }

        const { name, email, password, professionalType, yearOfExperience } = validationResult.data;

        // メールアドレスが既に使用されているか確認
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "このメールアドレスは既に登録されています" },
                { status: 409 }
            );
        }

        // // パスワードのハッシュ化
        // const hashedPassword = await bcrypt.hash(password, 10);

        // ユーザーの作成
        const user = await prisma.user.create({
            data: {
                name,
                email,
                professionalType,
                yearOfExperience: yearOfExperience || null,
                password,
            },
        });


        return NextResponse.json(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                professionalType: user.professionalType,
                password: user.password,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("ユーザー登録エラー:", error);
        return NextResponse.json(
            { error: "サーバーエラーが発生しました" },
            { status: 500 }
        );
    }
}