"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { getItems, addItem, updateItem } from "@/lib/item";
import { Item } from "@/types/item";

const TENANT_ID = "test"; // 임시 고정 값

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(getItems(TENANT_ID));
  }, []);

  const handleAdd = (name: string) => {
    addItem(TENANT_ID, name);
    setItems(getItems(TENANT_ID));
  };

  const handleToggle = (id: number) => {
    // ✅ 현재 상태 찾고
    const current = getItems(TENANT_ID).find((t) => t.id === id);
    if (!current) return;

    // ✅ 완료 상태 토글 저장
    updateItem(TENANT_ID, id, { isCompleted: !current.isCompleted });

    // ✅ 다시 불러와서 완료 전/후 자동 이동
    setItems(getItems(TENANT_ID));
  };

  return (
    <main className="w-full">
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,3vw,360px)]">
        <Header />
        
        <section className="">
          <TodoForm onAdd={handleAdd} />
        </section>

        <section className="">
          <TodoList items={items} onToggle={handleToggle} />
        </section>
      </div>
  </main>
  );
}
