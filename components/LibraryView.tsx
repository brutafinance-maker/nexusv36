
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Search } from 'lucide-react';

interface Book {
  title: string;
  author?: string;
  link: string;
  cover?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  books: Book[];
}

const libraryData: Category[] = [
  {
    id: 'anatomia',
    name: 'Anatomia',
    icon: '🧬',
    books: [
      { title: 'Anatomia Humana Sistêmica e Segmentar (Dangelo, 2011)', link: 'https://drive.google.com/drive/folders/1ZHVIlwK8JkUSp4XHf1fvht13qqnebjSs' },
      { title: 'Atlas Fotográfico de Anatomia Humana (UFRJ, 2020)', link: 'https://drive.google.com/drive/folders/16aznf1l7Zz4NKQFbG1RgjP7vZhV1q0mO' },
      { title: 'Anatomia Orientada para Clínica (Moore, 2018)', author: 'Moore', link: 'https://drive.google.com/file/d/1jMYrdXIQQcnqWClBjpympOk50VBuWc4N/view' },
      { title: 'Anatomia Palpatoria Funcional (Souza, 2019)', author: 'Souza', link: 'https://drive.google.com/file/d/1TG7rdmcT_4fbn0l_Kmr8jPREES1LEIPS/view' },
      { title: 'Anatomia Sistemica Essencial (Netter, 2023)', author: 'Netter', link: 'https://drive.google.com/file/d/1JlIGV5zwMLWM9aFtVJJAN_bEdqpVTGVq/view' },
      { title: 'Atlas de Anatomia Humana (Netter, 2015)', author: 'Netter', link: 'https://drive.google.com/file/d/1_bNPeYc4r1IqQv50hO0gjE8Lrw7XnyeD/view' },
    ]
  },
  {
    id: 'clinica-medica',
    name: 'Clínica Médica',
    icon: '🏥',
    books: [
      { title: 'Clínica Médica (USP, 2009)', author: 'USP', link: 'https://drive.google.com/drive/folders/1aljpk0C5eOxdtcUfcmSXF9FRSSRhJw4i' },
    ]
  },
  {
    id: 'farmacologia',
    name: 'Farmacologia',
    icon: '💊',
    books: [
      { title: 'Farmacologia Básica e Clínica (Katzung, 2017)', author: 'Katzung', link: 'https://drive.google.com/drive/folders/1wFed5utBo4jFQTRWtnXpmAORE44sGzoo' },
      { title: 'Farmacologia (Rang & Dale, 2016)', author: 'Rang & Dale', link: 'https://drive.google.com/file/d/1RbwuJb8h4CuOLRYteAm6oGNtsVJGgh5i/view' },
      { title: 'Farmacologia Ilustrada (Whalen, 2016)', author: 'Whalen', link: 'https://drive.google.com/file/d/1eNbD8M438geNSqRnTDjs76HcCA7KOAzV/view' },
      { title: 'Princípios de Farmacologia (Golan, 2014)', author: 'Golan', link: 'https://drive.google.com/file/d/1OPUZp8J-_iq9NkMxlUng-8kVXIFArxQU/view' },
    ]
  },
  {
    id: 'fisiologia',
    name: 'Fisiologia',
    icon: '🫀',
    books: [
      { title: 'Fisiologia Médica (Boron, 2014)', author: 'Boron', link: 'https://drive.google.com/drive/folders/1TUu6kSSsCC7qYRQJnmsZUvsho8bcQGTL' },
      { title: 'Tratado de Fisiologia Médica (Guyton, 2011)', author: 'Guyton', link: 'https://drive.google.com/drive/folders/1tFMDWTaK7QoZCvK4Gls0AGUaV0T9znXa' },
      { title: 'Fisiologia (Berne & Levy, 2017)', author: 'Berne & Levy', link: 'https://drive.google.com/file/d/1qUC7fW2iXiC-ZIv9PkD3aisvkVZdje9-/view' },
      { title: 'Fisiologia (Aires, 2018)', author: 'Aires', link: 'https://drive.google.com/file/d/1b3d6Qd0hSt8jdq-0tSxGUv4ZJu08btio/view' },
      { title: 'Fisiologia (Costanzo, 2014)', author: 'Costanzo', link: 'https://drive.google.com/file/d/1mAmzTtT7g9_edEOAv5OotTV8TxoaHcmV/view' },
      { title: 'Fisiologia Humana (Silverthorn, 2017)', author: 'Silverthorn', link: 'https://drive.google.com/file/d/1IUj8IaozeBcpdZDRnC_y568sQWFFDqRz/view' },
    ]
  },
  {
    id: 'hematologia',
    name: 'Hematologia',
    icon: '🩸',
    books: [
      { title: 'Fundamentos em Hematologia (Hofbrand, 2018)', author: 'Hofbrand', link: 'https://drive.google.com/drive/folders/13Zk32Dp_RBRn1V1qAjalCWv4Zc-swGA1' },
      { title: 'Guia Hematologia UNIFESP SCAN.pdf', link: 'https://drive.google.com/file/d/1GnWyghXUSdUw8EDOjF1W_R7DlhPkr5NN/view' },
      { title: 'Tratado de Hematologia.pdf', link: 'https://drive.google.com/file/d/1cgzN_r29INCOf4d9sJvrhu1YeLlg8z-E/view' },
    ]
  },
  {
    id: 'infectologia',
    name: 'Infectologia',
    icon: '🦠',
    books: [
      { title: 'Guia de Antibioticoterapia das Principais Infecções (UFPI, 2017)', author: 'UFPI', link: 'https://drive.google.com/file/d/1acgnsvO7SU9E0LBWUGEQjatLKXsfQ6Eu/view' },
      { title: 'Miniguia de Antiobioticoterapia (Medcel, 2018)', author: 'Medcel', link: 'https://drive.google.com/file/d/1OfU-O9DEyv-1x5kZ4WOzxIrYGY4eJQis/view' },
    ]
  },
  {
    id: 'semiologia',
    name: 'Semiologia',
    icon: '📋',
    books: [
      { title: 'OSCE & Casos Clínicos', link: 'https://drive.google.com/drive/folders/10A9KSsG_grLAZfWGY19tMwKQmVQmDqP9' },
      { title: 'Semiologia Médica (Porto, 2019)', author: 'Porto', link: 'https://drive.google.com/drive/folders/18W9GcXmu_IDWtYWKAsObYHGtBF8v9__3' },
      { title: 'Exame Clínico (Porto, 2017)', author: 'Porto', link: 'https://drive.google.com/file/d/1m5kGVHqW0zdYIm_zgOUOLMQiIFOOXAsA/view' },
      { title: 'Habilidades Profissionais em Medicina (Martins, 2022)', author: 'Martins', link: 'https://drive.google.com/file/d/1JxV7f35okrWUD_iS2KfpZsRFz5lr5kOw/view' },
      { title: 'O Exame Neurológico (DeJong, 2014)', author: 'DeJong', link: 'https://drive.google.com/file/d/1IAiY2b4ORec3k5fh5LE0zyW9IWJiLFLy/view' },
    ]
  }
];

const BookCard: React.FC<{ book: Book; onClick: (link: string) => void }> = ({ book, onClick }) => (
  <div 
    onClick={() => onClick(book.link)}
    className="bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-none dark:hover:border-nexus-blue/50 transition-all duration-300 group cursor-pointer flex flex-col"
  >
    <div className="aspect-[3/4] bg-neutral-100 dark:bg-nexus-surface flex items-center justify-center relative overflow-hidden">
      {book.cover ? (
        <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="flex flex-col items-center gap-3 text-neutral-300 dark:text-nexus-text-label">
          <BookOpen size={48} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Nexus Library</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="bg-white dark:bg-nexus-blue text-nexus-blue dark:text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
          <ExternalLink size={20} />
        </div>
      </div>
    </div>
    <div className="p-4 flex-grow flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-nexus-text-main line-clamp-2 group-hover:text-nexus-blue transition-colors mb-1">
          {book.title}
        </h3>
        {book.author && (
          <p className="text-xs text-neutral-500 dark:text-nexus-text-sec">
            {book.author}
          </p>
        )}
      </div>
    </div>
  </div>
);

const CategoryPage: React.FC<{ category: Category; onBack: () => void }> = ({ category, onBack }) => {
  const handleBookClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-neutral-500 dark:text-nexus-text-sec hover:text-nexus-blue transition-colors mb-6 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Voltar para Categorias</span>
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-nexus-blue/10 flex items-center justify-center text-2xl">
          {category.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-nexus-text-title tracking-tight">
            {category.name}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-nexus-text-sec">
            {category.books.length} materiais disponíveis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {category.books.map((book, index) => (
          <BookCard key={index} book={book} onClick={handleBookClick} />
        ))}
      </div>
    </div>
  );
};

const LibraryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = libraryData.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.books.some(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedCategory) {
    return <CategoryPage category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div className="animate-in fade-in duration-700 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-nexus-text-title tracking-tight">
            Biblioteca <span className="text-nexus-blue">Digital</span>
          </h1>
          <p className="text-sm text-neutral-500 dark:text-nexus-text-sec mt-1">
            Acesse livros e materiais de referência diretamente do Google Drive.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-nexus-text-label" size={18} />
          <input 
            type="text"
            placeholder="Buscar livros ou categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-nexus-surface border border-neutral-200 dark:border-nexus-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nexus-blue/20 focus:border-nexus-blue transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map(category => (
          <button 
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className="flex items-center gap-4 p-5 bg-white dark:bg-nexus-card border border-neutral-200 dark:border-nexus-border rounded-2xl hover:bg-neutral-50 dark:hover:bg-nexus-surface hover:shadow-md dark:hover:shadow-none dark:hover:border-nexus-blue/30 transition-all duration-300 group text-left"
          >
            <div className="w-14 h-14 rounded-2xl bg-nexus-blue/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {category.icon}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-nexus-text-main group-hover:text-nexus-blue transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-nexus-text-sec mt-0.5">
                {category.books.length} materiais
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-300 dark:text-nexus-text-label group-hover:text-nexus-blue group-hover:bg-nexus-blue/10 transition-all">
              <ArrowLeft size={18} className="rotate-180" />
            </div>
          </button>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-20 h-20 bg-neutral-100 dark:bg-nexus-surface rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300 dark:text-nexus-text-label">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-nexus-text-title">Nenhum resultado encontrado</h3>
          <p className="text-sm text-neutral-500 dark:text-nexus-text-sec mt-1">Tente buscar por outro termo ou categoria.</p>
        </div>
      )}
    </div>
  );
};

export default LibraryView;
