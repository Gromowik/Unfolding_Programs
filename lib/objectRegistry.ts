export type ProgramRef = {
  id: string;
  title: string;
  href: string;
  status: "working" | "developing" | "prototype";
};

export type ObjectProjection = {
  id: string;
  programId: string;
  sideTitle: string;
  description: string;
  modelNote?: string;
  relatedCenterId?: string;
};

export type SituationObject = {
  id: string;
  title: string;
  summary: string;
  symbol: string;
  accent: "amber" | "violet" | "sky" | "emerald" | "rose";
  createdAt: string;
  sourceCloud?: string;
  relatedCenterIds?: string[];
  projections: ObjectProjection[];
};

export const programs: ProgramRef[] = [
  {
    id: "math-engine",
    title: "Math Engine",
    href: "https://math-engine-olive.vercel.app/",
    status: "working",
  },
  {
    id: "plus-minus",
    title: "Plus / Minus Neiron",
    href: "https://plus-minus-neuron.vercel.app/",
    status: "working",
  },
  {
    id: "b-neuron",
    title: "BNeuron",
    href: "https://b-neuron.vercel.app/",
    status: "developing",
  },
  {
    id: "phenomenal-quiz",
    title: "Phenomenal Quiz",
    href: "https://next-project-vert-one.vercel.app/",
    status: "working",
  },
  {
    id: "models",
    title: "Models (G/D)",
    href: "https://models-pi-nine.vercel.app/",
    status: "prototype",
  },
  {
    id: "tech-repair",
    title: "Технологии и ремонт",
    href: "https://technology-and-repair.vercel.app/",
    status: "developing",
  },
  {
    id: "kalender",
    title: "Kalender Hub",
    href: "https://calendar-woad-ten.vercel.app/",
    status: "prototype",
  },
];

export const situationObjects: SituationObject[] = [
  {
    id: "binary",
    title: "Бинарность",
    summary:
      "Плюс и минус как видимый ответ — один объект, разные стороны в программах бинарного восприятия.",
    symbol: "±",
    accent: "rose",
    createdAt: "2025-09-10",
    sourceCloud: "plus_minus_igra",
    relatedCenterIds: ["loop", "function"],
    projections: [
      {
        id: "binary-pm",
        programId: "plus-minus",
        sideTitle: "Геометрия фигуры → ➕ или ➖",
        description:
          "Объект рисуется, предсказывается знак, trace показывает суммирование a1→a4. Бинарность — верхний видимый слой.",
        modelNote: "Демонстратор a1→a4, trace по столбцам",
        relatedCenterId: "function",
      },
      {
        id: "binary-bn",
        programId: "b-neuron",
        sideTitle: "Путь мысли через бинарные узлы",
        description:
          "Бинарность как центр притяжения — сеть отражает плюс/минус относительно восприятия.",
        modelNote: "Центр бинарности, Happy Eyes",
      },
      {
        id: "binary-quiz",
        programId: "phenomenal-quiz",
        sideTitle: "R-вопрос как бинарный выбор на ветке",
        description:
          "На каждом шаге дерева — конкретный ответ, но ветвление остаётся бинарным по сути: идти или остановиться.",
        modelNote: "M+ → R → Rf, срез дерева",
      },
    ],
  },
  {
    id: "g-d-link",
    title: "Связь G и D",
    summary:
      "Центр (G) и проявление (D) — объект «связь» отражается в программах, где модель должна работать.",
    symbol: "G→D",
    accent: "violet",
    createdAt: "2025-09-05",
    sourceCloud: "G_D_force",
    relatedCenterIds: ["function", "class", "constant"],
    projections: [
      {
        id: "gd-models",
        programId: "models",
        sideTitle: "Create · Search · Navigate",
        description:
          "G в центре, D по окружности. Связь создаётся, ищется и визуализируется — модель уже обрабатывает объект.",
        modelNote: "Prototype Control Center, API model1",
        relatedCenterId: "function",
      },
      {
        id: "gd-math",
        programId: "math-engine",
        sideTitle: "D · E · A · C как формулы центра",
        description:
          "Тот же объект «связь центра и проявления», но в языке математики: тело, итерации, выбор, результат.",
        modelNote: "Страница моделей A, A2…",
        relatedCenterId: "function",
      },
    ],
  },
  {
    id: "calendar-time",
    title: "Календарь / итерация времени",
    summary:
      "Время как E — объект «цикл по датам» проецируется в календарных программах.",
    symbol: "📅",
    accent: "sky",
    createdAt: "2025-08-20",
    sourceCloud: "calendar_dipol",
    relatedCenterIds: ["loop"],
    projections: [
      {
        id: "cal-hub",
        programId: "kalender",
        sideTitle: "Hub экспериментов",
        description:
          "Много HTML-страниц и прототипов — календарь как поле проб, пока модель не созрела.",
        modelNote: "Static HTML → API + DB",
        relatedCenterId: "loop",
      },
      {
        id: "cal-dipol",
        programId: "math-engine",
        sideTitle: "Диполь времени в формулах",
        description:
          "Тот же объект, но уже как мысль о двух полюсах итерации — не UI, а структура.",
        relatedCenterId: "loop",
      },
    ],
  },
  {
    id: "function-rest",
    title: "Функция в покое",
    summary:
      "Объект «функция, которую не замечаешь» — когда D стремится к нулю между входом и выходом.",
    symbol: "ƒ",
    accent: "amber",
    createdAt: "2025-08-01",
    sourceCloud: "start_2",
    relatedCenterIds: ["function", "loop"],
    projections: [
      {
        id: "fn-math",
        programId: "math-engine",
        sideTitle: "D как тело, E как итерация",
        description:
          "Функция описана формально — центр виден в формулах, итерации — в E.",
        relatedCenterId: "function",
      },
      {
        id: "fn-quiz",
        programId: "phenomenal-quiz",
        sideTitle: "Rf-принцип как обобщённая функция",
        description:
          "Не конкретный код, а принцип работы — функция на уровне «как устроено в общем».",
        relatedCenterId: "function",
      },
    ],
  },
  {
    id: "repair-situation",
    title: "Ситуация ремонта",
    summary:
      "Конкретная бытовая ситуация — объект, который можно разложить в шаблон и программу помощи.",
    symbol: "🔧",
    accent: "emerald",
    createdAt: "2025-10-01",
    sourceCloud: "fish",
    projections: [
      {
        id: "repair-tech",
        programId: "tech-repair",
        sideTitle: "Шаблон: электрика стеклоподъёмника",
        description:
          "Симптомы → диагностика → чек-лист → варианты ремонта. Ситуация стала рабочей программой.",
        modelNote: "layers.md + фото обшивки",
      },
    ],
  },
];

export type SituationWithMeta = SituationObject & {
  programCount: number;
  projectionCount: number;
};

export function getProgram(id: string): ProgramRef | undefined {
  return programs.find((p) => p.id === id);
}

export function enrichObject(obj: SituationObject): SituationWithMeta {
  const programIds = new Set(obj.projections.map((p) => p.programId));
  return {
    ...obj,
    programCount: programIds.size,
    projectionCount: obj.projections.length,
  };
}

export function getAllObjects(): SituationWithMeta[] {
  return situationObjects
    .map(enrichObject)
    .sort((a, b) => b.projectionCount - a.projectionCount);
}

export function getObjectById(id: string): SituationWithMeta | null {
  const obj = situationObjects.find((o) => o.id === id);
  return obj ? enrichObject(obj) : null;
}

export function getAllObjectIds(): string[] {
  return situationObjects.map((o) => o.id);
}

export const objectsMethod = {
  title: "Объекты и проекции",
  principle:
    "Трансляция идёт до тех пор, пока центр не сможет сам отражать объект обработкой в модели или программе.",
  steps: [
    "Есть объект или ситуация — то, что рассматриваем",
    "В разных программах он выглядит по-разному — это проекции",
    "Каждая проекция дополняет понимание — новая сторона карточки",
    "Когда модель работает — объект уже обрабатывается программой сам",
  ],
};
