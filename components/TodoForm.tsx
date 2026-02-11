"use client";

import { useState } from "react";
import styles from "./TodoForm.module.css";

type Props = {
  onAdd: (name: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name);
        setName("");
      }}
      className={styles.todoForm}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="할 일 입력"
        className={styles.input}
      />
      <button className={styles.button} type="submit">추가하기</button>
    </form>
  );
}