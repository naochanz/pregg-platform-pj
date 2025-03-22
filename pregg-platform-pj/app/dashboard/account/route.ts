// app/api/account/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import { accountApiSchema } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    // 現時点では認証機能が完全ではないため、ダミーのユーザーIDを使用
    // 実際の実装では、getServerSessionを使用して認証済みユーザーのIDを取得
    const dummyUserId = "user-id-123"; // 仮のID
    
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
      where: { userId: dummyUserId },
      update: validatedData,
      create: {
        userId: dummyUserId,
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
    // 認証チェック（実際の実装ではこちらを使用）
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user) {
    //   return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    // }
    // const userId = session.user.id;
    
    // ダミーのユーザーID（実際の実装では削除）
    const dummyUserId = "user-id-123";
    
    // ユーザーのアカウント情報を取得
    const account = await prisma.account.findUnique({
      where: { userId: dummyUserId },
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