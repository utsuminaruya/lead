export type Locale = "ja" | "vi" | "en";

type Translation = {
  appTitle: string;
  tagline: string;
  dashboard: string;
  chat: string;
  jobs: string;
  life: string;
  jpStudy: string;
  login: string;
  googleLogin: string;
  todayTasks: string;
  askAi: string;
  aiPlaceholder: string;
  send: string;
  region: string;
  role: string;
  level: string;
  apply: string;
  hospital: string;
  housing: string;
  visa: string;
  studyLinks: string;
  quizSoon: string;
  loading: string;
};

export const dict: Record<Locale, Translation> = {
  ja: {
    appTitle: "Mediflow",
    tagline: "次にやることがすぐ分かる生活・就労サポート",
    dashboard: "ダッシュボード",
    chat: "チャットAI",
    jobs: "求人検索",
    life: "生活サポート",
    jpStudy: "日本語学習",
    login: "メールログイン",
    googleLogin: "Googleログイン",
    todayTasks: "今日のタスク",
    askAi: "AIに相談",
    aiPlaceholder: "例）病院予約をしたい。次に何をすればいい？",
    send: "送信",
    region: "地域",
    role: "職種",
    level: "日本語レベル",
    apply: "応募する",
    hospital: "病院検索",
    housing: "住居情報",
    visa: "ビザ情報",
    studyLinks: "レベル別教材リンク",
    quizSoon: "クイズ機能（近日公開）",
    loading: "読み込み中..."
  },
  vi: {
    appTitle: "Mediflow",
    tagline: "Hỗ trợ việc làm & đời sống: biết ngay việc cần làm tiếp theo",
    dashboard: "Bảng điều khiển",
    chat: "Chat AI",
    jobs: "Tìm việc",
    life: "Hỗ trợ đời sống",
    jpStudy: "Học tiếng Nhật",
    login: "Đăng nhập email",
    googleLogin: "Đăng nhập Google",
    todayTasks: "Việc cần làm hôm nay",
    askAi: "Hỏi AI",
    aiPlaceholder: "Ví dụ: Tôi muốn đặt lịch bệnh viện, nên làm gì tiếp?",
    send: "Gửi",
    region: "Khu vực",
    role: "Ngành nghề",
    level: "Trình độ tiếng Nhật",
    apply: "Ứng tuyển",
    hospital: "Tìm bệnh viện",
    housing: "Thông tin nhà ở",
    visa: "Thông tin visa",
    studyLinks: "Tài liệu theo cấp độ",
    quizSoon: "Chức năng quiz (sắp ra mắt)",
    loading: "Đang tải..."
  },
  en: {
    appTitle: "Mediflow",
    tagline: "Life + work support that tells you your next best action",
    dashboard: "Dashboard",
    chat: "Chat AI",
    jobs: "Job Search",
    life: "Life Support",
    jpStudy: "Japanese Study",
    login: "Email Login",
    googleLogin: "Google Login",
    todayTasks: "Today's Tasks",
    askAi: "Ask AI",
    aiPlaceholder: "Ex: I need a hospital appointment. What's my next step?",
    send: "Send",
    region: "Region",
    role: "Role",
    level: "Japanese Level",
    apply: "Apply",
    hospital: "Find Hospital",
    housing: "Housing Info",
    visa: "Visa Info",
    studyLinks: "Level-based learning links",
    quizSoon: "Quiz feature (coming soon)",
    loading: "Loading..."
  }
};
