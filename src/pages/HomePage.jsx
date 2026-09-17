import React, { useRef, useState } from 'react';
import { Upload, FileCheck, X, FileText, CheckCircle2 } from 'lucide-react';

export const HomePage = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const openModal = (type) => {
    setModalType(type);
    setSelectedFile(null);
    setIsSuccess(false);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedFile(null);
    setIsSuccess(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) return;
    
    setIsSuccess(true);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <div>
      {/* Верхние блоки со статистикой */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Жалпы китепканалар', val: '1,145' },
          { label: 'Тапшырылган отчеттор', val: '1,098' },
          { label: 'Кабыл алынган отчеттор', val: '567' },
          { label: 'Жаңы катталган китепканалар', val: '5' },
          { label: 'Кечигип жаткан отчеттор', val: '9' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-500 uppercase font-semibold">{stat.label}</p>
            <div className="text-xl font-bold mt-1">{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Кнопки открытия модальных окон */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <button 
          onClick={() => openModal('quarter')}
          className="bg-[#4a82c4] text-white p-6 rounded-xl flex items-center gap-4 shadow-sm hover:opacity-90 transition text-left cursor-pointer w-full"
        >
          <Upload size={32} className="shrink-0"/>
          <div>
            <p className="font-bold">Кварталдык отчетту тапшыруу</p>
            <p className="text-xs opacity-80">2026 жылдын ноябрь айы үчүн</p>
          </div>
        </button>

        <button 
          onClick={() => openModal('annual')}
          className="bg-[#56a77d] text-white p-6 rounded-xl flex items-center gap-4 shadow-sm hover:opacity-90 transition text-left cursor-pointer w-full"
        >
          <FileCheck size={32} className="shrink-0"/>
          <div>
            <p className="font-bold">Жылдык отчетту тапшыруу</p>
            <p className="text-xs opacity-80">2026 жыл</p>
          </div>
        </button>
      </div>

      {/* МОДАЛЬНОЕ ОКНО С ПЛАВНОЙ АНИМАЦИЕЙ */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn">
          
          {/* Белый блок с эффектом мягкого приближения (scale) */}
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6 relative transform transition-all duration-300 scale-100 animate-scaleUp">
            
            {/* Кнопка закрытия */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Заголовок */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {modalType === 'quarter' ? 'Кварталдык отчетту тапшыруу' : 'Жылдык отчетту тапшыруу'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {modalType === 'quarter' ? '2026 жылдын ноябрь айы үчүн документти жүктөңүз' : '2026 жыл үчүн жылдык отчетту жүктөңүз'}
              </p>
            </div>

            {/* Статус или форма */}
            {isSuccess ? (
              <div className="py-10 text-center flex flex-col items-center justify-center animate-fadeIn">
                <CheckCircle2 size={50} className="text-emerald-500 mb-3 animate-bounce" />
                <p className="font-bold text-slate-800 text-lg">Отчет ийгиликтүү жөнөтүлдү!</p>
                <p className="text-xs text-gray-500 mt-1">Маалыматтар базага катталды</p>
              </div>
            ) : (
              <div>
                {/* Зона загрузки */}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-[#4a82c4] bg-gray-50/50 hover:bg-blue-50/20 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center mb-6"
                >
                  <div className="w-12 h-12 bg-blue-50 text-[#4a82c4] rounded-full flex items-center justify-center mb-3 shadow-xs">
                    <Upload size={22} />
                  </div>
                  
                  {selectedFile ? (
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-xs animate-fadeIn">
                      <FileText size={18} className="text-blue-600" />
                      <span className="text-sm font-semibold text-slate-700 truncate max-w-[250px]">
                        {selectedFile.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-slate-700">
                        Файлды бул жерге сүйрөп келиңиз же <span className="text-[#4a82c4] underline">тандаңыз</span>
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        PDF, DOC, DOCX, XLS, XLSX или ZIP (макс. 20MB)
                      </p>
                    </>
                  )}

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                  />
                </div>

                {/* Кнопки */}
                <div className="flex items-center justify-end gap-3">
                  <button 
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition cursor-pointer"
                  >
                    Жокко чыгаруу
                  </button>
                  <button 
                    onClick={handleUploadSubmit}
                    disabled={!selectedFile}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                      selectedFile 
                        ? 'bg-[#4a82c4] hover:bg-[#3d6ea7] text-white shadow-sm' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Жүктөө жана тапшыруу
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};