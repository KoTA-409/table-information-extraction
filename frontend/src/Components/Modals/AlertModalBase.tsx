import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function AlertModalBase(props) {
  // Fungsi untuk menutup modal
  const closeModal = () => {
    props.onHide(); // Menutup modal
  }

  return (
    <>
      <Modal
        show={props.show} // Properti untuk menampilkan atau menyembunyikan modal
        size="md"
        popup={true}
        onClose={closeModal} // Fungsi yang akan dipanggil ketika modal ditutup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {props.textConfirmation} 
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="warning"
                onClick={closeModal} // Fungsi yang akan dipanggil ketika tombol "Yes" diklik
              >
                {props.btnYes} 
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
