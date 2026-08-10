export type VisualModel = {
  label: string;
  href?: string;
};

export type UnfoldingCenter = {
  id: string;
  title: string;
  invariant: string;
  projection: string;
  /** 1–5 — насколько центр притягивает, насколько близок к результату */
  importance: number;
  /** сколько раз встречается в исходном облаке */
  frequency: number;
  visualModel?: VisualModel;
};

export const spiralMethod = {
  title: "Спираль развёртки",
  description:
    "Общение считывается пошагово — как спираль. На каждом витке виднее, что возвращается чаще всего. Частота и важность выводят главные центры; из них, где возможно, складывается модель — и в конце программа.",
  steps: [
    {
      n: 1,
      label: "Беседа",
      desc: "Поток общения с ИИ — сырой материал спирали",
    },
    {
      n: 2,
      label: "Итерации",
      desc: "Уточнения и колебания — движение по витку",
    },
    {
      n: 3,
      label: "Центры",
      desc: "Что замирает: важность и частота в тексте",
    },
    {
      n: 4,
      label: "Модель",
      desc: "Структура из центров — инвариант + проекция",
    },
    {
      n: 5,
      label: "Программа",
      desc: "Когда модель созрела — отдельное воплощение",
    },
  ],
};

export function importanceLabel(value: number): string {
  if (value >= 5) return "ядро";
  if (value >= 4) return "сильный";
  if (value >= 3) return "заметный";
  if (value >= 2) return "вторичный";
  return "зарождение";
}

export function maxFrequency(centers: UnfoldingCenter[]): number {
  return Math.max(...centers.map((c) => c.frequency), 1);
}
