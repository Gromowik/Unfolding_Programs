import type { VisualModel } from "./centers";

export type CenterTranslation = {
  toCenterId: string;
  power: number;
  comment: string;
};

export type CenterRecord = {
  id: string;
  title: string;
  summary: string;
  invariant: string;
  projection: string;
  ownPower: number;
  symbol: string;
  accent: "amber" | "violet" | "sky" | "emerald" | "rose";
  createdAt: string;
  sourceCloud?: string;
  frequency?: number;
  importance?: number;
  visualModel?: VisualModel;
  translates: CenterTranslation[];
};

export const centerRecords: CenterRecord[] = [
  {
    id: "constant",
    title: "Константа",
    summary: "Инвариант как центр программы — D, которое данные транслируют.",
    invariant:
      "Создавайте инварианты как некие центры программы — делайте из них константы.",
    projection:
      "Константа — это D как число и удобная возможность его взять: увиденное в E мире изменения данных.",
    ownPower: 12,
    symbol: "◎",
    accent: "amber",
    createdAt: "2025-08-01",
    sourceCloud: "start_2",
    frequency: 4,
    importance: 3,
    translates: [],
  },
  {
    id: "variable",
    title: "Переменная",
    summary: "D как положить и взять — связанные данные в одном имени.",
    invariant: "Соедините связанные данные в переменную.",
    projection:
      "Переменная — это D как функция «положить и взять», увиденное в E мире изменения данных.",
    ownPower: 8,
    symbol: "↔",
    accent: "sky",
    createdAt: "2025-08-01",
    sourceCloud: "start_2",
    frequency: 2,
    importance: 2,
    translates: [
      {
        toCenterId: "constant",
        power: 5,
        comment: "Данные транслируют константу для своей работы.",
      },
    ],
  },
  {
    id: "function",
    title: "Функция",
    summary: "Тело D, итерации E, стремление в покой и результат в C.",
    invariant: "Создайте вместо повторяющегося кода функцию.",
    projection:
      "Функция создаёт зависимости, на которых показывает себя итерациями. Стремится в покой как D в центре.",
    ownPower: 28,
    symbol: "ƒ",
    accent: "violet",
    createdAt: "2025-08-01",
    sourceCloud: "start_2",
    frequency: 32,
    importance: 5,
    visualModel: {
      label: "Модель D · E · A · C",
      href: "https://math-engine-olive.vercel.app/pages/10",
    },
    translates: [
      {
        toCenterId: "constant",
        power: 6,
        comment: "На E смотрите, что создаёт его как D.",
      },
      {
        toCenterId: "variable",
        power: 4,
        comment: "Функция берёт данные из состояний, которые переменная держит.",
      },
    ],
  },
  {
    id: "object",
    title: "Объект",
    summary: "D как совокупность полей — упорядоченные связанные данные.",
    invariant:
      "Связанные данные превратите в поля и упорядочите в объект.",
    projection: "Объект — это D как совокупность и возможность взять для полей.",
    ownPower: 16,
    symbol: "{}",
    accent: "emerald",
    createdAt: "2025-08-02",
    sourceCloud: "start_2",
    frequency: 10,
    importance: 4,
    translates: [
      {
        toCenterId: "variable",
        power: 5,
        comment: "Поля объекта — именованные места для связанных данных.",
      },
    ],
  },
  {
    id: "class",
    title: "Класс",
    summary: "Объединение состояния A(C) и функций D в одной оболочке.",
    invariant:
      "Сделайте методы из функций над объектами — создайте класс.",
    projection:
      "Состояние — A(C): объект и актуальные значения, ищущие центр как функцию D.",
    ownPower: 18,
    symbol: "◈",
    accent: "violet",
    createdAt: "2025-08-02",
    sourceCloud: "start_2",
    frequency: 4,
    importance: 4,
    visualModel: {
      label: "Модель D · E · A · C",
      href: "https://math-engine-olive.vercel.app/pages/10",
    },
    translates: [
      {
        toCenterId: "object",
        power: 7,
        comment: "Класс оборачивает объект и его поля.",
      },
      {
        toCenterId: "function",
        power: 8,
        comment: "Методы — функции, выходящие из покоя объекта в E.",
      },
    ],
  },
  {
    id: "array",
    title: "Массив",
    summary: "След функции — порядок как C, в котором минимум видать D.",
    invariant:
      "Если данные связаны положением или обрабатываются вместе — создайте массив.",
    projection:
      "Массив — след работы функции, оставивший только порядок.",
    ownPower: 14,
    symbol: "[]",
    accent: "sky",
    createdAt: "2025-08-03",
    sourceCloud: "start_2",
    frequency: 7,
    importance: 3,
    translates: [
      {
        toCenterId: "function",
        power: 7,
        comment: "Массив — когда функция полностью проявила себя в порядке.",
      },
    ],
  },
  {
    id: "loop",
    title: "Цикл",
    summary: "E как итерации — проекция времени, карусель выбора в C.",
    invariant:
      "Если есть шаги для цели — сделайте цикл.",
    projection:
      "Цикл — E. C с порядком массива создаёт итерации. Функция есть проекция времени.",
    ownPower: 20,
    symbol: "↻",
    accent: "rose",
    createdAt: "2025-08-03",
    sourceCloud: "start_2",
    frequency: 6,
    importance: 4,
    visualModel: {
      label: "Модель D · E · A · C",
      href: "https://math-engine-olive.vercel.app/pages/10",
    },
    translates: [
      {
        toCenterId: "array",
        power: 8,
        comment: "Упорядоченный массив хорошо ложится на автоматический перебор.",
      },
      {
        toCenterId: "function",
        power: 6,
        comment: "Цикл — итерации тела функции во времени.",
      },
    ],
  },
];

export type CenterWithWeight = CenterRecord & {
  totalWeight: number;
  incoming: (CenterTranslation & { fromCenterId: string; fromTitle: string })[];
};

const accentStyles = {
  amber: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  violet: "border-violet-500/25 bg-violet-500/10 text-violet-300",
  sky: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  emerald: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  rose: "border-rose-500/25 bg-rose-500/10 text-rose-300",
};

export function getAccentStyle(accent: CenterRecord["accent"]) {
  return accentStyles[accent];
}

export function computeTotalWeight(
  centerId: string,
  records: CenterRecord[] = centerRecords,
): number {
  const center = records.find((c) => c.id === centerId);
  if (!center) return 0;

  const incomingPower = records.flatMap((source) =>
    source.translates
      .filter((t) => t.toCenterId === centerId)
      .map((t) => t.power),
  );

  return center.ownPower + incomingPower.reduce((sum, p) => sum + p, 0);
}

export function enrichCenter(center: CenterRecord): CenterWithWeight {
  const incoming = centerRecords.flatMap((source) =>
    source.translates
      .filter((t) => t.toCenterId === center.id)
      .map((t) => ({
        ...t,
        fromCenterId: source.id,
        fromTitle: source.title,
      })),
  );

  return {
    ...center,
    totalWeight: computeTotalWeight(center.id),
    incoming,
  };
}

export function getAllCenters(
  sort: "weight" | "created" = "weight",
): CenterWithWeight[] {
  const enriched = centerRecords.map(enrichCenter);

  if (sort === "created") {
    return enriched.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  return enriched.sort((a, b) => b.totalWeight - a.totalWeight);
}

export function getCenterById(id: string): CenterWithWeight | null {
  const center = centerRecords.find((c) => c.id === id);
  return center ? enrichCenter(center) : null;
}

export function getAllCenterIds(): string[] {
  return centerRecords.map((c) => c.id);
}
