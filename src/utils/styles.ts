export const buttonStyles = {
  button: 'flex items-center justify-center w-8 h-8 rounded-lg text-gray-300 hover:bg-gray-500 transition-colors',
  menuItem: 'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors',
};

export const layoutStyles = {
  chatContainer: 'flex h-screen bg-white dark:bg-gray-900 transition-colors duration-200',
};

export const chatInputStyles = {
  container: 'w-full max-w-3xl mx-auto font-vazir',
  form: 'rounded-2xl p-1 shadow-sm transition-all duration-300 w-full bg-white text-black border-2 border-gray-300 dark:bg-[#303030] dark:text-white dark:border-transparent',
  textarea: 'flex-1 bg-transparent border-none outline-none resize-none text-sm leading-6 font-vazir placeholder-gray-500 dark:placeholder-gray-400',
  sendButton: 'p-2 rounded-full transition-colors bg-[#34c759] hover:bg-[#2ea44f] text-white disabled:opacity-50 disabled:hover:bg-[#34c759]',
  micButton: 'p-2 rounded-full transition-colors hover:bg-[#f0f0f1] dark:hover:bg-[#333]',
  plusButton: 'p-2 rounded-full transition-colors hover:bg-[#f0f0f1] dark:hover:bg-[#333]',
  dropdown: 'absolute bottom-full mb-2 w-64 bg-[#f0f0f1] dark:bg-[#333] rounded-lg shadow-lg overflow-hidden',
  dropdownItem: 'w-full px-4 py-3 flex items-center gap-3 hover:bg-[#e6e6e7] dark:hover:bg-[#444] text-black dark:text-gray-300 text-sm',
  quickButton: 'flex items-center px-4 py-2 rounded-full bg-[#f0f0f1] hover:bg-[#e6e6e7] dark:bg-[#4a4c5a] dark:hover:bg-[#555666] text-black dark:text-white text-sm transition-colors font-vazir',
};

export const sidebarStyles = {
  container: 'w-64 h-screen bg-[#171717] text-white font-vazir overflow-y-scroll scrollbar-visible fixed top-0 transition-transform duration-300 ',
  header: 'sticky top-0 z-10 bg-[#171717] p-3 flex items-center justify-between',
  navButton: 'sidebar-item flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors text-white hover:bg-[#2a2b32]',
  searchInput: 'w-full rounded-lg py-2 pl-10 pr-4 text-sm bg-[#2a2b32] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#10a37f] font-vazir',
  historySection: 'px-2 py-2',
  historyItem: 'group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer sidebar-item transition-all duration-200',
  optionsButton: 'opacity-0 group-hover:opacity-100 p-1 hover:bg-[#3a3b42] rounded transition-all duration-200 flex-shrink-0',
  dropdown: 'fixed rounded-lg shadow-lg py-1 w-48 z-50 bg-[#1a1a1a] border border-gray-700',
  dropdownItem: 'w-full text-left px-4 py-2 text-sm hover:bg-[#2a2b32] text-white transition-colors',
  footerButton: 'sidebar-item flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors bg-[#2a2b32] text-white hover:bg-[#3a3b42]',
};

export const chatAreaStyles = {
  container: 'flex flex-col flex-1 h-full bg-gray-50 dark:bg-[#212121] transition-colors duration-200',
  content: 'flex-1 overflow-y-auto',
  innerContent: 'max-w-3xl mx-auto py-10 px-4 md:px-8',
  footer: 'border-t dark:border-gray-700 border-gray-200',
  footerInner: 'max-w-3xl mx-auto px-4 md:px-8 py-4',
  disclaimer: 'text-xs text-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md p-2 mt-2',
};

export const advertiseStyles = {
  card: 'bg-gray-100 dark:bg-gray-800 rounded-xl p-5 mb-4 shadow-lg hover:shadow-xl transition-shadow duration-200',
  title: 'text-lg font-semibold text-gray-900 dark:text-gray-100',
  subtitle: 'text-sm text-gray-600 dark:text-gray-300',
  description: 'text-sm text-gray-600 dark:text-gray-300 mt-2',
  specGrid: 'mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-200',
  imageSection: 'mt-4',
  imageTitle: 'text-sm font-medium text-gray-900 dark:text-gray-100',
  imageGrid: 'grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2',
  image: 'w-full h-32 object-cover rounded-md',
  noImage: 'text-sm text-gray-500 dark:text-gray-400',
  footer: 'mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2',
  meta: 'text-xs text-gray-500 dark:text-gray-400',
  actionButton: 'p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
  mapButton: 'flex items-center text-sm text-[#10a37f] hover:text-[#0e8f6e] transition-colors',
};

export const headerStyles = {
  container: 'bg-gray-50 dark:bg-[#212121] border-b dark:border-gray-700 border-gray-200 sticky top-0 z-20 transition-all duration-300',
  button: 'flex items-center justify-center w-12 h-10 rounded-lg text-gray-300 hover:bg-gray-500 transition-colors',
  modelButton: 'flex items-center gap-2 px-3 py-1.5 rounded-lg text-white transition-colors',
  profileButton: 'flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-500 transition-colors',
  plusButton: 'flex items-center gap-2 px-2 py-1 bg-white text-gray-900 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors',
  menuItem: 'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors',
};