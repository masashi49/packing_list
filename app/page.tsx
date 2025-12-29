"use client";

import { Plus, List } from "lucide-react";
import { usePickingList } from "./hooks/usePickingList";

import { ListDetail } from "./src/components/listDetail";
import { ListCreate } from "./src/components/listCreate";

export default function ChecklistApp() {
  const {
    lists,
    currentView,
    selectedListIndex,
    newListName,
    newItems,
    setNewListName,
    setCurrentView,
    openDetail,
    goToList,
    startEdit,
    deleteList,
    toggleItem,
    clearAllChecks,
    addItemField,
    updateItemField,
    removeItemField,
    saveList,
  } = usePickingList();

  // リスト一覧画面
  if (currentView === "list") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8 pt-6">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              忘れ物防止チェックリスト
            </h1>
            <p className="text-indigo-600">持ち物を管理して、忘れ物をゼロに!</p>
          </header>

          <button
            onClick={() => setCurrentView("create")}
            className="w-full mb-6 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            新しいリストを作成
          </button>

          <div className="space-y-3">
            {lists.map((list, index) => (
              <div
                key={list.id}
                onClick={() => openDetail(index)}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {list.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {list.items.filter((item) => item.checked).length} /{" "}
                      {list.items.length} 完了
                    </p>
                  </div>
                  <div className="text-indigo-600">
                    <List size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {lists.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">まだリストがありません</p>
              <p className="text-sm">
                上のボタンから新しいリストを作成しましょう
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // リスト詳細画面
  if (currentView === "detail" && selectedListIndex !== null) {
    const list = lists[selectedListIndex];
    return (
      <ListDetail
        list={list}
        selectedListIndex={selectedListIndex}
        goToList={goToList}
        startEdit={startEdit}
        deleteList={deleteList}
        toggleItem={toggleItem}
        clearAllChecks={clearAllChecks}
      />
    );
  }

  // リスト作成・編集画面
  if (currentView === "create" || currentView === "edit") {
    return (
      <ListCreate
        newListName={newListName}
        setNewListName={setNewListName}
        newItems={newItems}
        addItemField={addItemField}
        updateItemField={updateItemField}
        removeItemField={removeItemField}
        saveList={saveList}
        currentView={currentView}
        goToList={goToList}
      />
    );
  }

  return null;
}
