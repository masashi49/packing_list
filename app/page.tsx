"use client";

import { Plus, Trash2, Edit2, Check, X, ArrowLeft, List } from "lucide-react";
import { usePickingList } from "./hooks/pickingList";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={goToList}
            className="mb-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
          >
            <ArrowLeft size={20} />
            リスト一覧に戻る
          </button>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{list.name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={startEdit}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title="編集"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => deleteList(selectedListIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="削除"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {list.items.map((item, itemIndex) => (
                <label
                  key={itemIndex}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(itemIndex)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <span
                    className={`flex-1 ${
                      item.checked
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {item.text}
                  </span>
                  {item.checked && (
                    <Check size={20} className="text-green-500" />
                  )}
                </label>
              ))}
            </div>

            <button
              onClick={clearAllChecks}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              すべてのチェックをクリア
            </button>
          </div>
        </div>
      </div>
    );
  }

  // リスト作成・編集画面
  if (currentView === "create" || currentView === "edit") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={goToList}
            className="mb-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
          >
            <ArrowLeft size={20} />
            リスト一覧に戻る
          </button>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentView === "edit" ? "リストを編集" : "新しいリストを作成"}
            </h2>

            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="リスト名 (例: 旅行の持ち物)"
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-indigo-500 focus:outline-none"
            />

            <div className="space-y-2 mb-4">
              {newItems.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItemField(index, e.target.value)}
                    placeholder={`項目 ${index + 1}`}
                    className="flex-1 p-2 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none"
                  />
                  {newItems.length > 1 && (
                    <button
                      onClick={() => removeItemField(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {newItems.length < 30 && (
              <button
                onClick={addItemField}
                className="w-full mb-6 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition"
              >
                + 項目を追加 ({newItems.length}/30)
              </button>
            )}

            <div className="flex gap-3">
              <button
                onClick={saveList}
                className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                保存
              </button>
              <button
                onClick={goToList}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
