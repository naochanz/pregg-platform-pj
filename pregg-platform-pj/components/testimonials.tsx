"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  comment: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "山田 健太",
    role: "弁護士",
    comment: "税務の専門家との連携が簡単になり、クライアントへのサービスの幅が広がりました。",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "佐藤 美咲",
    role: "税理士",
    comment: "法務の相談がスムーズにできるようになり、業務の質が向上しました。",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "鈴木 大輔",
    role: "社会保険労務士",
    comment: "他の専門家との情報交換で、新しい知見を得ることができています。",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            利用者の声
          </h2>
          <p className="text-gray-600">
            PREGGを活用している専門家からの声をご紹介します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.comment}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}