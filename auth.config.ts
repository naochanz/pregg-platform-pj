import type { NextAuthConfig, Session, User } from "next-auth";
import { NextRequest } from "next/server";

export const authConfig = {
  pages: {
    signIn: "signin",
  },
  callbacks: {
    // Middlewareでユーザーの認証を行うときに呼び出される
    // NextResponseを返すことでリダイレクトやエラーを返すことができる
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      console.log("authorized", auth, nextUrl.pathname);

      // /user以下のルートの保護
      const isOnAuthenticatedPage = nextUrl.pathname.startsWith("/user");

      if (isOnAuthenticatedPage) {
        const isLoggedin = !!auth?.user;
        if (!isLoggedin) {
          // falseを返すと，Signinページにリダイレクトされる
          return false;
        }
        return true;
      }
      return true;
    },
    // JSON Web Token が作成されたとき（サインイン時など）や更新されたとき（クライアントでセッションにアクセスしたときなど）に呼び出される。ここで返されるものはすべて JWT に保存され，session callbackに転送される。そこで、クライアントに返すべきものを制御できる。それ以外のものは、フロントエンドからは秘匿される。JWTはAUTH_SECRET環境変数によってデフォルトで暗号化される。
    // セッションに何を追加するかを決定するために使用される
    jwt: ({ token, user }) => {
        if (user) {
          token.id = user.id;
          token.backendToken = user.backendToken;
          token.professionalType = user.professionalType;
        }
        return token;
      },
      session: ({ session, token }) => {
        if (token && session.user) {
          session.user.id = token.id as string;
          session.user.backendToken = token.backendToken as string;
          session.user.professionalType = token.professionalType as string;
          // セッション自体にも設定する場合
          session.backendToken = token.backendToken as string;
        }
        return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
