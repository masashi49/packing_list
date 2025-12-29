"use client";
import { ArrowLeft, Check, Edit2, Trash2 } from "lucide-react";
import { Checklist } from "../typs";

type ListDetailProps = {
  list: Checklist;
  selectedListIndex: number;
  goToList: () => void;
  startEdit: () => void;
  deleteList: (index: number) => void;
  toggleItem: (index: number) => void;
  clearAllChecks: () => void;
};

export const ListDetail = ({
  list,
  selectedListIndex,
  goToList,
  startEdit,
  deleteList,
  toggleItem,
  clearAllChecks,
}: ListDetailProps) => {
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
                {item.checked && <Check size={20} className="text-green-500" />}
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
};
