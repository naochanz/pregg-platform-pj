import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import * as bcrypt from "bcrypt";
import { signupSchema } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // バリデーション
    const validationResult = signupSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "入力データが無効です" },
        { status: 400 }
      );
    }

    const { name, email, password, professionalType } = validationResult.data;

    // 既存ユーザーの確認
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 409 }
      );
    }

    // パスワードハッシュ化
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        professionalType,
      },
    });

    const account = await prisma.account.create({
      data: {
        userId: user.id,
      },
    });

    // ユーザーIDを含めてレスポンス
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      account: account.id,
    });
  } catch (error) {
    console.error("ユーザー登録エラー:", error);
    return NextResponse.json(
      { error: "ユーザー登録に失敗しました" },
      { status: 500 }
    );
  }
}


export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const requestData = req.nextUrl.searchParams;
  const email = requestData.get("email") || undefined;
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, exists: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("ユーザー検索エラー:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};