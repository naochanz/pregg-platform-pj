import { ProfessionalType } from "@prisma/client";
import { z } from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// 入力データのバリデーション用スキーマ
export const signupSchema = z.object({
  name: z.string().min(1, "名前は必須です").max(50, {
    message: "名前は50文字以内で入力してください",
  }),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
  professionalType: z.nativeEnum(ProfessionalType, {
    errorMap: () => ({ message: "有効な士業タイプを選択してください" }),
  }),
  yearOfExperience: z.number().optional(),
  termsAgreed: z.boolean().refine((data) => data, {
    message: "利用規約とプライバシーポリシーに同意してください",
  }),
});

export const accountFormSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phoneNumber: z.string().optional(),
  postalCode: z.string().optional(),
  prefecture: z.string().optional(),
  city: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  bio: z.string().max(500, "自己紹介は500文字以内で入力してください").optional(),
  website: z.string().url("有効なURLを入力してください").optional().or(z.literal("")),
  company: z.string().optional(),
  position: z.string().optional(),
});

// APIで使用するアカウント情報のバリデーションスキーマ
export const accountApiSchema = z.object({
  phoneNumber: z.string().optional(),
  postalCode: z.string().optional(),
  prefecture: z.string().optional(),
  city: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal("")),
  company: z.string().optional(),
  position: z.string().optional(),
});