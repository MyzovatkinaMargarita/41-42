import { AuthStore } from "./domains/auth/authStore";
import { StudentStore } from "./domains/student/studentStore";
import { TestsCatalogStore } from "./domains/tests/testsCatalogStore";
import { TestRunStore } from "./domains/tests/testRunStore";
import { TestResultStore } from "./domains/tests/testResultStore";
import { AdminStore } from "./domains/admin/adminStore";

import { ModalStore } from "./ui/modalStore";
import { NotificationStore } from "./ui/notificationStore";

export class RootStore {
  authStore: AuthStore;
  studentStore: StudentStore;

  testsCatalogStore: TestsCatalogStore;
  testRunStore: TestRunStore;
  testResultStore: TestResultStore;

  adminStore: AdminStore;

  modalStore: ModalStore;
  notificationStore: NotificationStore;

  constructor() {
    this.authStore = new AuthStore();
    this.studentStore = new StudentStore();

    this.testsCatalogStore = new TestsCatalogStore();
    this.testRunStore = new TestRunStore();
    this.testResultStore = new TestResultStore();

    this.adminStore = new AdminStore();

    this.modalStore = new ModalStore();
    this.notificationStore = new NotificationStore();
  }
}

export const rootStore = new RootStore();
