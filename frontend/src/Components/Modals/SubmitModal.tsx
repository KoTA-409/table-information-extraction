import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function SubmitModal(props) {
  const confirmAction = () => {
    props.confirm();
    props.onHide();
  };

  const closeModal = () => {
    props.onHide();
  };

  return (
    <>
      <Modal
        show={props.show}
        size="md"
        popup={true}
        onClose={closeModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apakah Anda yakin akan {props.textConfirmation}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={confirmAction}
              >
                {props.btnYes}
              </Button>
              <Button
                color="dark"
                onClick={closeModal}
              >
                Tidak, batalkan
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
