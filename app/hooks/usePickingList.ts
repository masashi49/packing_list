// ここにカスタムフック
import { useCallback, useState } from "react";
import { Checklist, ViewType } from "../typs";
import { useLocalStorageState } from "./useLocalStorageState";

export function usePickingList() {
  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [selectedListIndex, setSelectedListIndex] = useState<number | null>(
    null
  );
  const [newListName, setNewListName] = useState<string>("");
  const [newItems, setNewItems] = useState<string[]>([""]);

  const [lists, setLists] = useLocalStorageState<Checklist[]>("checklists", []);

  const addItemField = () => {
    if (newItems.length < 30) {
      setNewItems([...newItems, ""]);
    }
  };

  const updateItemField = useCallback(
    (index: number, value: string) => {
      const updated = [...newItems];
      updated[index] = value;
      setNewItems(updated);
    },
    [newItems]
  );

  const removeItemField = useCallback(
    (index: number) => {
      setNewItems(newItems.filter((_, i) => i !== index));
    },
    [newItems]
  );

  const resetForm = useCallback(() => {
    setNewListName("");
    setNewItems([""]);
    setSelectedListIndex(null);
  }, []);

  const saveList = () => {
    const items = newItems.filter((item) => item.trim() !== "");
    if (newListName.trim() === "" || items.length === 0) {
      alert("リスト名と少なくとも1つの項目を入力してください");
      return;
    }

    if (currentView === "edit" && selectedListIndex !== null) {
      const updated = [...lists];
      updated[selectedListIndex] = {
        ...updated[selectedListIndex],
        name: newListName,
        items: items.map((text) => ({ text, checked: false })),
      };
      setLists(updated);
    } else {
      setLists((prevLists) => [
        ...prevLists,
        {
          id: crypto.randomUUID(),
          name: newListName,
          items: items.map((text) => ({ text, checked: false })),
        },
      ]);
    }

    resetForm();
    setCurrentView("list");
  };

  const deleteList = (index: number) => {
    if (confirm("このリストを削除しますか?")) {
      setLists(lists.filter((_, i) => i !== index));
      setCurrentView("list");
    }
  };

  const toggleItem = (itemIndex: number) => {
    if (selectedListIndex === null) return;

    const updated = [...lists];
    updated[selectedListIndex].items[itemIndex].checked =
      !updated[selectedListIndex].items[itemIndex].checked;
    setLists(updated);
  };

  const clearAllChecks = () => {
    if (selectedListIndex === null) return;

    const updated = [...lists];
    updated[selectedListIndex].items = updated[selectedListIndex].items.map(
      (item) => ({ ...item, checked: false })
    );
    setLists(updated);
  };

  const startEdit = useCallback(() => {
    if (selectedListIndex === null) return;

    const list = lists[selectedListIndex];
    setNewListName(list.name);
    setNewItems(list.items.map((item) => item.text));
    setCurrentView("edit");
  }, [lists, selectedListIndex]);

  const goToList = useCallback(() => {
    resetForm();
    setCurrentView("list");
  }, [resetForm, setCurrentView]);

  const openDetail = useCallback(
    (index: number) => {
      setSelectedListIndex(index);
      setCurrentView("detail");
    },
    [setCurrentView]
  );

  return {
    lists,
    currentView,
    selectedListIndex,
    newListName,
    newItems,
    addItemField,
    updateItemField,
    removeItemField,
    saveList,
    deleteList,
    toggleItem,
    clearAllChecks,
    startEdit,
    goToList,
    openDetail,
    setNewListName,
    setCurrentView,
  };
}
