"use client";
import { ArrowLeft, X } from "lucide-react";

type ListCreateProps = {
  newListName: string;
  setNewListName: (name: string) => void;
  newItems: string[];
  addItemField: () => void;
  updateItemField: (index: number, value: string) => void;
  removeItemField: (index: number) => void;
  saveList: () => void;
  currentView: "create" | "edit";
  goToList: () => void;
};

export const ListCreate = ({
  newListName,
  setNewListName,
  newItems,
  addItemField,
  updateItemField,
  removeItemField,
  saveList,
  currentView,
  goToList,
}: ListCreateProps) => {
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
};
