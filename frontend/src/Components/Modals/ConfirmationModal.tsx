import React from 'react'
import ConfirmationModalBase from './ConfimationModalBase'

interface Props {
  state: any,
  handleConfirm: any,
  textConfirmation: any,
  btnYes: any,
  isIdx?: boolean,
  idx?: number
}

const ConfirmationModal = ({ state: { setter, getter }, handleConfirm, textConfirmation, btnYes, isIdx, idx }:Props) => {
  // Fungsi untuk menyembunyikan modal
  const handleHide = () => {
    if (isIdx) {
      setter(idx); // Menyimpan nilai `idx` ke state menggunakan setter
    } else {
      setter(false); // Menyimpan nilai `false` ke state menggunakan setter
    }
  }

  return (
    <ConfirmationModalBase
      confirm={handleConfirm} // Mengirimkan fungsi `handleConfirm` sebagai prop `confirm`
      onHide={handleHide} // Mengirimkan fungsi `handleHide` sebagai prop `onHide`
      show={getter} // Mengirimkan nilai `getter` sebagai prop `show`
      textConfirmation={textConfirmation} // Mengirimkan nilai `textConfirmation` sebagai prop `textConfirmation`
      btnYes={btnYes} // Mengirimkan nilai `btnYes` sebagai prop `btnYes`
    />
  )
}

export default ConfirmationModal
