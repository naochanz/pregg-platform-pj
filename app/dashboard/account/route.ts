// app/api/account/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { accountApiSchema } from '@/lib/utils';
import { auth } from "@/lib/auth"; 

export async function POST(req: NextRequest) {
  try {
    // セッションからユーザー情報を取得
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }
    
    // 認証済みユーザーのID
    const userId = session.user.id;
    
    // リクエストボディを取得
    const data = await req.json();
    
    // データのバリデーション
    const validationResult = accountApiSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: '入力データが無効です', details: validationResult.error.format() }, 
        { status: 400 }
      );
    }
    
    const validatedData = validationResult.data;
    
    // プロフィール情報をアップサート（更新または作成）
    const account = await prisma.account.upsert({
      where: { userId },
      update: validatedData,
      create: {
        userId,
        ...validatedData
      },
    });

    return NextResponse.json({ 
      message: 'アカウント情報を保存しました',
      account 
    });
  } catch (error) {
    console.error('アカウント情報の保存中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'アカウント情報の保存に失敗しました' }, 
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // セッションからユーザー情報を取得
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }
    
    // 認証済みユーザーのID
    const userId = session.user.id;
    
    // ユーザーのアカウント情報を取得
    const account = await prisma.account.findUnique({
      where: { userId },
    });
    
    if (!account) {
      // アカウント情報がなければ空のオブジェクトを返す
      return NextResponse.json({});
    }
    
    return NextResponse.json(account);
  } catch (error) {
    console.error('アカウント情報の取得中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: 'アカウント情報の取得に失敗しました' }, 
      { status: 500 }
    );
  }
}