import { MdAdd } from 'react-icons/md';

export function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
      title="Report Issue"
    >
      <MdAdd size={28} />
    </button>
  );
}

