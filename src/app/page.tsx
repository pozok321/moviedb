"use client";

import { useState } from "react";

// --- 1. DEFINISI TIPE DATA (TypeScript) ---
// Ini memberitahu TypeScript apa saja "Props" yang dibutuhkan komponen anak
interface ItemTugasProps {
  teks: string;
  index: number;
  onHapus: (id: number) => void;
}

// --- 2. KOMPONEN ANAK (Item Tunggal) ---
function ItemTugas({ teks, index, onHapus }: ItemTugasProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-3 animate-in fade-in duration-300">
      <span className="text-gray-700 font-medium">{teks}</span>
      <button
        onClick={() => onHapus(index)}
        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors"
        aria-label="Hapus tugas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

// --- 3. KOMPONEN UTAMA (Halaman) ---
export default function TodoPage() {
  // Kita beri tahu useState bahwa isinya adalah array of strings <string[]>
  const [daftarTugas, setDaftarTugas] = useState<string[]>([]);
  const [inputTeks, setInputTeks] = useState<string>("");

  const handleTambahTugas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTeks.trim()) return;

    setDaftarTugas([...daftarTugas, inputTeks]);
    setInputTeks(""); // Reset input
  };

  const handleHapusTugas = (indexTarget: number) => {
    setDaftarTugas(daftarTugas.filter((_, index) => index !== indexTarget));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Rencana Hari Ini</h1>
          <p className="text-slate-500 mt-2">Kelola tugas harian Anda dengan mudah</p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleTambahTugas} className="flex gap-2 mb-8">
          <input
            type="text"
            value={inputTeks}
            onChange={(e) => setInputTeks(e.target.value)}
            placeholder="Apa yang ingin dikerjakan?"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all active:scale-95"
          >
            Tambah
          </button>
        </form>

        {/* List Render */}
        <div className="space-y-1">
          {daftarTugas.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
              <p className="text-slate-400">Belum ada tugas. Waktunya bersantai! ☕</p>
            </div>
          ) : (
            daftarTugas.map((tugas, idx) => (
              <ItemTugas 
                key={idx} 
                teks={tugas} 
                index={idx} 
                onHapus={handleHapusTugas} 
              />
            ))
          )}
        </div>

        {/* Info Tambahan */}
        {daftarTugas.length > 0 && (
          <p className="text-center text-sm text-slate-400 mt-6">
            Total: {daftarTugas.length} tugas
          </p>
        )}
      </div>
    </div>
  );
}