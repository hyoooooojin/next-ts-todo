"use client";

import Link from "next/link";
import { Item } from "@/types/item";
import styles from "./TodoList.module.css";

type Props = {
  items: Item[];
  onToggle: (id: number) => void;
};

export default function TodoList({ items = [], onToggle }: Props) {
  const completed = items.filter((t) => t.isCompleted);
  const incomplete = items.filter((t) => !t.isCompleted);

  return (
    <div className={styles.todoListWrapper}>
      <section className={styles.todoListSection}>
        <div><img src="/todo.png" alt="todo" width="101" height="36" className="todoImage" /></div>
        {incomplete.length === 0 ? (
          <div className={styles.emptyState}>
            <img
              src="/empty.png"
              alt="할 일이 없습니다"
              className={styles.emptyImage}
            />
            <p className={styles.emptyText}>할 일이 없어요</p>
          </div>
        ) : (
          <ul className={styles.todoList}>
            {incomplete.map((item) => (
              <li key={item.id} className={styles.todoItem}>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => onToggle(item.id)}
                  className={styles.checkbox}
                />
                <Link
                  href={`/${item.tenantId}/items/${item.id}`}
                  className={styles.todoLink}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.todoListSection}>
        <div><img src="/done.png" alt="done" width="101" height="36" className="doneImage" /></div>
        {completed.length === 0 ? (
          <div className={styles.emptyState}>
            <img
              src="/empty-done.png"
              alt="완료된 일이 없습니다"
              className={styles.emptyImage}
            />
            <p className={styles.emptyText}>완료된 일이 아직 없어요</p>
          </div>
        ) : (
          <ul className={styles.todoList}>
            {completed.map((item) => (
              <li key={item.id} className={`${styles.todoItem} ${styles.completed}`}>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => onToggle(item.id)}
                  className={styles.checkbox}
                />
                <Link
                  href={`/${item.tenantId}/items/${item.id}`}
                  className={`${styles.todoLink} ${styles.completedText}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
