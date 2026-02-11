import { Item } from "@/types/item";

const STORAGE_KEY = "items";

function loadItems(): Item[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data) as Item[];
  } catch {
    return [];
  }
}

function saveItems(items: Item[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ✅ tenant별 목록 조회
export function getItems(tenantId: string): Item[] {
  return loadItems().filter((i) => i.tenantId === tenantId);
}

// ✅ 단건 조회
export function getItemById(
  tenantId: string,
  id: number
): Item | undefined {
  return loadItems().find(
    (i) => i.tenantId === tenantId && i.id === id
  );
}

// ✅ 생성 (tenantId 필수 + 생성 객체 리턴)
export function addItem(
  tenantId: string,
  name: string,
  imageUrl: string = ""
): Item {
  const items = loadItems();

  const newItem: Item = {
    id: Date.now(),
    tenantId,
    name,
    memo: "",
    imageUrl,
    isCompleted: false,
  };

  saveItems([...items, newItem]);
  return newItem;
}

// ✅ 수정 (tenant 검증 포함)
export function updateItem(
  tenantId: string,
  id: number,
  data: Partial<Item>
) {
  const items = loadItems();

  const updated = items.map((item) =>
    item.id === id && item.tenantId === tenantId
      ? { ...item, ...data }
      : item
  );

  saveItems(updated);
}

// ✅ 삭제 (tenant 검증 포함)
export function deleteItem(
  tenantId: string,
  id: number
) {
  const filtered = loadItems().filter(
    (i) => !(i.id === id && i.tenantId === tenantId)
  );

  saveItems(filtered);
}
