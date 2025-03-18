export const dynamic = "force-static";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { signupSchema } from "@/lib/utils";

const prisma = new PrismaClient();
// import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  // console.log("body", request);
  try {
    // リクエストボディの解析
    const body = await request.json();

    // データのバリデーション
    const validationResult = signupSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "入力データが無効です",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, password, professionalType, yearOfExperience } =
      validationResult.data;

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
