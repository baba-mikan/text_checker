const TEXTBOOK_FEATURES = {
  "ターゲット1900": {
    overview: "大学入試英単語集の決定版。共通テストから国公立2次・難関私大レベルをカバー。でる順配列。",
    level: "共通テスト〜早慶・旧帝大",
    totalWords: 1900,
    sections: [
      { part: "Part 1", name: "常にでる基本単語", sections: "Sec.1〜8", range: "No.1〜800", wordCount: 800, level: "基礎〜標準", description: "共通テスト・中堅大で必須。頻出度が非常に高く、ここを落とすと致命的" },
      { part: "Part 2", name: "常にでる重要単語", sections: "Sec.9〜15", range: "No.801〜1500", wordCount: 700, level: "標準〜やや難", description: "MARCH・地方国公立レベル。多義語や抽象語が増え、1語あたりの負荷が上がる" },
      { part: "Part 3", name: "ここで差がつく難単語", sections: "Sec.16〜19", range: "No.1501〜1900", wordCount: 400, level: "難", description: "早慶・旧帝大レベル。見慣れない語が多く、定着に時間がかかる" }
    ]
  },
  "ターゲット1400": {
    overview: "共通テスト〜中堅私大（日東駒専）レベルをカバー。ターゲットシリーズの中級編。100語ごとのセクション区切り。",
    level: "共通テスト〜中堅私大",
    totalWords: 1400,
    sections: [
      { part: "Part 1", name: "これだけは覚えたい600語", sections: "Sec.1〜6", range: "No.1〜600", wordCount: 600, level: "基礎", description: "共通テストの土台。最頻出の基本語を網羅" },
      { part: "Part 2", name: "さらに実力を伸ばす500語", sections: "Sec.7〜11", range: "No.601〜1100", wordCount: 500, level: "基礎〜標準", description: "共通テスト〜日東駒専レベル。語彙の幅が広がる" },
      { part: "Part 3", name: "ここで差がつく300語", sections: "Sec.12〜14", range: "No.1101〜1400", wordCount: 300, level: "標準", description: "中堅私大で差がつくレベル。ここまで覚えれば共通テスト〜中堅私大をカバー" }
    ]
  },
  "ターゲット1200": {
    overview: "高校の基礎固めから大学受験準備レベル。中学既習200語＋高校必修1200語＋熟語300の計1700語を5セクションに収録。",
    level: "中学復習〜入試準備",
    totalWords: 1700,
    sections: [
      { part: "Sec.1", name: "中学校で習った200語", sections: "-", range: "No.1〜200 (+熟語50)", wordCount: 250, level: "中学復習", description: "中学既習語の総復習。ここが不安な人は最優先" },
      { part: "Sec.2", name: "基礎を固める300語", sections: "-", range: "No.251〜550 (+熟語60)", wordCount: 360, level: "高校基礎", description: "高校必修の基本語。日常的な語彙の土台" },
      { part: "Sec.3", name: "テーマで身に付ける500語", sections: "-", range: "No.611〜1110 (+熟語60)", wordCount: 560, level: "高校標準", description: "テーマ別構成。文脈の中で語彙力を強化" },
      { part: "Sec.4", name: "語法で覚える200語", sections: "-", range: "No.1171〜1370 (+熟語60)", wordCount: 260, level: "高校標準", description: "語法・用法に注目。使い方まで覚える" },
      { part: "Sec.5", name: "入試によく出る200語", sections: "-", range: "No.1431〜1630 (+熟語70)", wordCount: 270, level: "入試準備", description: "大学入試頻出語。ターゲット1400へのステップ" }
    ]
  },
  "STOCK3000": {
    overview: "関正生先生の単語帳。文法・読解・4技能の切り口で構成。記憶ブースター付きで覚えやすい。見出し語約1249語＋トレンド語279語＋派生語854語。",
    level: "高校基礎〜共通テスト",
    totalWords: 2382,
    sections: [
      { part: "Part 1", name: "文法×単語", sections: "動詞と文型・時制 / 助動詞・不定詞 / 前置詞・接続詞 / 品詞と語法", range: "-", wordCount: null, level: "高校基礎", description: "文法知識と連動して覚える構成。文法が苦手な人にも効果的" },
      { part: "Part 2", name: "読解×単語", sections: "長文の語彙 / テーマ別①〜④ / 多義語", range: "-", wordCount: null, level: "基礎〜共通テスト", description: "長文で出会う語彙をテーマ別に整理。読解力と語彙力を同時強化" },
      { part: "Part 3", name: "4技能×単語", sections: "発音・アクセント / リスニング / スピーキング / ライティング / 英検3級・準2級", range: "-", wordCount: null, level: "共通テスト", description: "4技能対応。英検対策にも有効" }
    ]
  },
  "STOCK4500": {
    overview: "関正生先生の上級単語帳。Stock3000の上位版で基礎語は省略。見出し語約1645語＋注目トレンド語310語＋最新トレンド語200語。最新入試トレンドを反映。",
    level: "MARCH〜早慶・国公立2次",
    totalWords: 2155,
    sections: [
      { part: "Part 1", name: "文法×単語", sections: "語法系の重要語 / 入試頻出の動詞・形容詞", range: "-", wordCount: null, level: "高校標準", description: "Stock3000の上位版。基礎語は省略されている" },
      { part: "Part 2", name: "読解×単語", sections: "長文テーマ別の上級語彙 / 多義語", range: "-", wordCount: null, level: "MARCH〜早慶", description: "難関大で差がつく語彙。最新の入試トレンドを反映" },
      { part: "Part 3", name: "4技能×単語", sections: "英検2級レベル / トレンド語", range: "-", wordCount: null, level: "難関私大・国公立2次", description: "最新トレンド語も収録。時事テーマに強い" }
    ]
  },
  "速読英単語 入門編": {
    overview: "Z会の文脈型単語帳。英文68本の中で約1,400語を学ぶ。1単語1例文スタイルで、レイアウトが見やすい。",
    level: "高校基礎〜共通テスト",
    totalWords: 1400,
    sections: [
      { part: "-", name: "英文68本＋単語約1,400語", sections: "難易度順に掲載", range: "英文40〜170words", wordCount: 1400, level: "高校基礎〜共通テスト", description: "長文の中で単語を覚える形式。1単語1例文スタイル。基礎固めから共通テストまでをカバー" }
    ]
  },
  "速読英単語 必修編": {
    overview: "Z会の文脈型単語帳の中核。英文70本（80〜250words）で約1,945語を収録。大学受験の核となる必修単語を文脈で学ぶ。",
    level: "共通テスト〜中堅私大",
    totalWords: 1945,
    sections: [
      { part: "-", name: "英文70本＋単語約1,945語", sections: "テーマ別に掲載", range: "英文80〜250words", wordCount: 1945, level: "共通テスト〜中堅私大", description: "大学受験の核となる必修単語を文脈で学ぶ。偏差値67.5到達の目安" }
    ]
  },
  "速読英単語 上級編": {
    overview: "Z会の文脈型単語帳の最上位。英文48本（130〜270words）で約1,255語を収録。東大・京大・早慶上智レベル。",
    level: "難関〜最難関大",
    totalWords: 1255,
    sections: [
      { part: "-", name: "英文48本＋単語約1,255語", sections: "テーマ別に掲載", range: "英文130〜270words", wordCount: 1255, level: "難関〜最難関大", description: "東大・京大・早慶上智レベル。英検準1級相当。専門的テーマの長文で高度な語彙を身につける" }
    ]
  },
  "出る順パス単 3級": {
    overview: "英検3級（中学卒業程度）対応。頻出語をでる順に配列。日常生活で使う基本語彙が中心。",
    level: "中学卒業〜高校初級（英検3級）",
    totalWords: 1100,
    sections: [
      { part: "-", name: "でる度A〜C＋熟語", sections: "頻出度順", range: "-", wordCount: 1100, level: "英検3級", description: "英検3級の頻出語をでる順に配列。日常生活で使う基本語彙が中心" }
    ]
  },
  "出る順パス単 4級": {
    overview: "英検4級（中学中級程度）対応。頻出語をでる順に配列。簡単な日常語彙が中心。",
    level: "中学中級（英検4級）",
    totalWords: 600,
    sections: [
      { part: "-", name: "でる度A〜C＋熟語", sections: "頻出度順", range: "-", wordCount: 600, level: "英検4級", description: "英検4級の頻出語。簡単な日常語彙が中心。英語学習の出発点" }
    ]
  },
  "出る順パス単 準2級": {
    overview: "英検準2級（高校中級程度）対応。日常〜学校生活の語彙に加え、やや抽象的な語も登場。",
    level: "高校初級〜中級（英検準2級）",
    totalWords: 1300,
    sections: [
      { part: "-", name: "でる度A〜C＋熟語", sections: "頻出度順", range: "-", wordCount: 1300, level: "英検準2級", description: "英検準2級の頻出語。日常〜学校生活の語彙に加え、やや抽象的な語も登場" }
    ]
  },
  "出る順パス単 2級": {
    overview: "英検2級（高校卒業程度）対応。社会的なテーマの語彙が増え、大学受験にも直結。",
    level: "高校中級〜上級（英検2級）",
    totalWords: 1700,
    sections: [
      { part: "-", name: "でる度A〜C＋熟語", sections: "頻出度順", range: "-", wordCount: 1700, level: "英検2級", description: "英検2級の頻出語。社会的なテーマの語彙が増え、大学受験にも直結" }
    ]
  },
  "出る順パス単 準1級": {
    overview: "英検準1級対応。学術的・社会的な高度語彙。大学受験最難関レベルをカバー。",
    level: "大学中級〜上級（英検準1級）",
    totalWords: 1850,
    sections: [
      { part: "-", name: "でる度A〜C＋熟語", sections: "頻出度順", range: "-", wordCount: 1850, level: "英検準1級", description: "英検準1級の頻出語。学術的・社会的な高度語彙。大学受験最難関レベルをカバー" }
    ]
  }
};

export default TEXTBOOK_FEATURES;
