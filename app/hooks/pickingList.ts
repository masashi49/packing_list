// ここにカスタムフック
import { useState, useEffect, useCallback } from "react";
import { Checklist, ViewType } from "../typs";

export function usePickingList() {
  const [lists, setLists] = useState<Checklist[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("checklists");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [];
  });
  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [selectedListIndex, setSelectedListIndex] = useState<number | null>(
    null
  );
  const [newListName, setNewListName] = useState<string>("");
  const [newItems, setNewItems] = useState<string[]>([""]);

  useEffect(() => {
    localStorage.setItem("checklists", JSON.stringify(lists));
  }, [lists]);

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

  const saveList = useCallback(() => {
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
  }, [
    resetForm,
    setCurrentView,
    newListName,
    newItems,
    currentView,
    selectedListIndex,
    lists,
  ]);

  const deleteList = useCallback(
    (index: number) => {
      if (confirm("このリストを削除しますか?")) {
        setLists(lists.filter((_, i) => i !== index));
        setCurrentView("list");
      }
    },
    [lists, setCurrentView]
  );

  const toggleItem = useCallback(
    (itemIndex: number) => {
      if (selectedListIndex === null) return;

      const updated = [...lists];
      updated[selectedListIndex].items[itemIndex].checked =
        !updated[selectedListIndex].items[itemIndex].checked;
      setLists(updated);
    },
    [lists, selectedListIndex]
  );

  const clearAllChecks = useCallback(() => {
    if (selectedListIndex === null) return;

    const updated = [...lists];
    updated[selectedListIndex].items = updated[selectedListIndex].items.map(
      (item) => ({ ...item, checked: false })
    );
    setLists(updated);
  }, [lists, selectedListIndex]);

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
