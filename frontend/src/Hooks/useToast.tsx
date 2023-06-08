import React, { useCallback, useState } from 'react'

const useToast = (): [boolean, () => void] => {
  const [isToastActive, setIsToastActive] = useState(false);

  // Fungsi untuk mengatur status aktif toast
  const setModalActive =  useCallback(() => {
    setIsToastActive(true);

    // Mengatur timeout untuk menonaktifkan toast setelah 3 detik
    const timeout = setTimeout(() => {
      setIsToastActive(false);
      clearTimeout(timeout);
    }, 3000);
  }, []);

  // Mengembalikan status aktif toast dan fungsi untuk mengatur status aktif toast
  return [isToastActive, setModalActive];
}

export default useToast;
