"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItems, updateItem, deleteItem } from "@/lib/item";
import { Item } from "@/types/item";
import styles from "./page.module.css";
import Header from "@/components/Header";

export default function Page({
  params,
}: {
  params: Promise<{ tenantId: string; itemId: string }>;
}) {
  const router = useRouter();

  const { tenantId, itemId } = use(params);
  const id = Number(itemId);

  const [item, setItem] = useState<Item | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const found = getItems(tenantId).find((i) => i.id === id);

    if (!found) {
      router.replace(`/${tenantId}/items`);
      return;
    }

    setItem(found);
    setName(found.name);
    setMemo(found.memo || "");
    setImage(found.imageUrl || "");
  }, [id, tenantId, router]);

  if (!item) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^[a-zA-Z0-9_-]+\.[a-zA-Z]+$/.test(file.name)) {
      alert("파일 이름은 영어/숫자, -, _만 사용 가능합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하만 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const nextItem: Partial<Item> = {
      tenantId,
      name,
      memo,
      imageUrl: image,
    };

    updateItem(tenantId, item.id, nextItem);
    setItem({ ...item, ...nextItem });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteItem(tenantId, item.id);
    router.push(`/${tenantId}/items`);
  };

  const previewSrc = image || item.imageUrl || "";
  const hasPreview = !!previewSrc && previewSrc.trim() !== "";
  const hasMemo = !!memo && memo.trim() !== "";

  return (
    <main className={styles.container}>
      <Header />

      {/* 제목 */}
      <header className={styles.header}>
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.titleInput}
          />
        ) : (
          <p className={styles.title}>{item.name}</p>
        )}
      </header>

      {/* 이미지 + 메모 */}
      <section className={styles.contentSection}>
        {/* 이미지 영역 */}
        <div className={styles.imageArea}>
          <div className={styles.imageButtonWrapper}>
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
                document.getElementById("imageInput")?.click();
              }}
              className={styles.imageButton}
              aria-label="이미지 추가"
            />
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          
          <div className={styles.imageContent}>
            {hasPreview ? (
              <img
                src={previewSrc}
                alt="Item image"
                className={styles.image}
              />
            ) : (
              <img
                src="/no-img.png"
                alt="기본 이미지"
                className={styles.noImage}
              />
            )}
          </div>
        </div>

        {/* 메모 영역 */}
        <div className={styles.memoArea}>
          <h3 className={styles.memoTitle}>memo</h3>

          {isEditing ? (
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요"
              className={styles.memoInput}
            />
          ) : (
            <p className={styles.memoText}>{hasMemo ? memo : "메모가 없습니다"}</p>
          )}
        </div>
      </section>

      {/* 버튼 영역 */}
      <div className={styles.buttonRow}>
        {isEditing ? (
          <button onClick={handleSave} className={styles.saveButton}>
            수정완료
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            수정하기
          </button>
        )}

        <button onClick={handleDelete} className={styles.deleteButton}>
          삭제하기
        </button>
      </div>
    </main>
  );
}
