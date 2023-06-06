import { useRef, useEffect } from 'react';

export const useUnload = fn => {
  const cb = useRef(fn); // inisialisasi dengan fn, sehingga pengecek tipe tidak akan menganggap bahwa current mungkin tidak terdefinisi

  // Menggunakan efek untuk memperbarui cb.current ketika fn berubah
  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  useEffect(() => {
    const onUnload = cb.current;

    // Menambahkan event listener saat window akan ditutup atau dimuat ulang
    window.addEventListener("beforeunload", onUnload);
    window.addEventListener("unload", onUnload);

    // Membersihkan event listener saat komponen tidak lagi digunakan
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      window.removeEventListener("unload", onUnload);
    }
  }, []);
};
