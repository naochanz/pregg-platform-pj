// lib/mock-data.ts
export const professionTypes = [
    { id: "LAWYER", label: "弁護士" },
    { id: "TAX_ACCOUNTANT", label: "税理士" },
    { id: "CPA", label: "公認会計士" },
    { id: "JUDICIAL_SCRIVENER", label: "司法書士" },
    { id: "ADMINISTRATIVE_SCRIVENER", label: "行政書士" },
    { id: "LABOR_CONSULTANT", label: "社会保険労務士" },
    { id: "PATENT_ATTORNEY", label: "弁理士" },
    { id: "REAL_ESTATE_APPRAISER", label: "不動産鑑定士" },
    { id: "LAND_SURVEYOR", label: "土地家屋調査士" },
    { id: "SME_CONSULTANT", label: "中小企業診断士" },
    { id: "OTHER", label: "その他" },
];

export const specialties = [
    { id: "1", name: "企業法務", category: "法律" },
    { id: "2", name: "相続", category: "法律" },
    { id: "3", name: "不動産", category: "法律" },
    { id: "4", name: "税務申告", category: "税務" },
    { id: "5", name: "事業再生", category: "経営" },
    { id: "6", name: "組織再編", category: "経営" },
    // ...他の専門分野
];

export const mockUsers = [
    {
        id: "1",
        name: "山田 太郎",
        email: "yamada@example.com",
        image: "https://i.pravatar.cc/150?img=1",
        professionalType: "LAWYER",
        yearOfExperience: 5,
        bio: "東京都内で企業法務を中心に活動しています。ベンチャー企業の支援に関心があります。",
        area: "東京都",
        specialties: ["1", "2"],
        socialLinks: [
            { type: "TWITTER", url: "https://twitter.com/example" },
            { type: "LINKEDIN", url: "https://linkedin.com/in/example" },
        ],
    },
    // ... 他のユーザー
];

export const mockRequests = [
    {
        id: "1",
        createdAt: new Date(2023, 5, 15),
        senderId: "2",
        senderName: "佐藤 次郎",
        receiverId: "1",
        purpose: "CONSULTATION",
        message: "IT企業の契約書レビューについて相談したいです。",
        status: "PENDING",
    },
    // ... 他のリクエスト
];