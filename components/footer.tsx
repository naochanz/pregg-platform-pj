// components/layout/footer.tsx
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-6 border-t">
            <div className="container flex flex-col items-center justify-between px-4 mx-auto space-y-4 md:flex-row md:space-y-0">
                <div className="text-sm text-muted-foreground">
                    © 2025 PREGG. All rights reserved.
                </div>
                <nav className="flex space-x-4 text-sm">
                    <Link href="/terms" className="text-muted-foreground hover:underline">
                        利用規約
                    </Link>
                    <Link href="/privacy" className="text-muted-foreground hover:underline">
                        プライバシーポリシー
                    </Link>
                    <Link href="/contact" className="text-muted-foreground hover:underline">
                        お問い合わせ
                    </Link>
                </nav>
            </div>
        </footer>
    );
}