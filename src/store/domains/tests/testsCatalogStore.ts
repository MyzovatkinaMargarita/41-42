import { makeAutoObservable, runInAction } from "mobx";
import type { Attempt, FiltersState, TestItem } from "../../types";

export class TestsCatalogStore {
  tests: TestItem[] = [];
  attempts: Attempt[] = [];

  loading = true;
  error = "";

  currentUserId = 1;
  filters: FiltersState | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

setFilters(f: FiltersState) {
  this.filters = f;
}

async load() {
  this.loading = true;
  this.error = "";

  try {
    const [r1, r2] = await Promise.all([
      fetch("/data/tests.json"),
      fetch("/data/attempts.json"),
    ]);

   if (!r1.ok) throw new Error("Не удалось загрузить tests.json");
    if (!r2.ok) throw new Error("Не удалось загрузить attempts.json");

    const t = (await r1.json()) as TestItem[];
    const a = (await r2.json()) as Attempt[];

    if (!Array.isArray(t) || !Array.isArray(a)) {
      throw new Error("Неверный формат данных");
    }
    runInAction(() => {
      this.tests = t;
      this.attempts = a;
      this.loading = false;
    });


     } catch (e) {
    runInAction(() => {
      this.error = e instanceof Error ? e.message : "Ошибка загрузки";
      this.loading = false;
    });
  }
}


get visibleTests(): TestItem[] {
  return this.tests.filter((t) => t.isPublished);
}

get lastAttemptByTest(): Map<number, Attempt> {
  const byTest = new Map<number, Attempt>();
  const mine = this.attempts.filter((a) => a.userId === this.currentUserId);
  for (const a of mine) byTest.set(a.testId, a);
  return byTest;
}

