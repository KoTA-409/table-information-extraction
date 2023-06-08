import { useCallback, useState } from 'react';

const useModal = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>, (e: React.MouseEvent) => void, (e: React.MouseEvent) => void] => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  }, []);

  // Fungsi untuk menutup modal
  const closeModal = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  }, []);

  // Mengembalikan array yang berisi status modal, fungsi untuk mengubah status modal,
  // fungsi untuk membuka modal, dan fungsi untuk menutup modal
  return [isModalOpen, setIsModalOpen, openModal, closeModal];
};

export default useModal;
