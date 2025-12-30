export const Footer = () => {
  return (
    <footer className="fixed bottom-0 inset-x-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="max-w-2xl mx-auto">
        <div className="">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">PR</p>
            {/* Google AdSenseやその他の広告コードをここに挿入 */}
          </div>
        </div>

        {/* フッター情報 */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2025 忘れ物防止チェックリスト. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
