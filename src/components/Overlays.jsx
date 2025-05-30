import { useContext } from "react";
import { createPortal } from 'react-dom';
import { DoctorContext, ModalContext } from '../contexts/DoctorContext';
import DoctorModal from "./DoctorModal";

const modalRoot = document.getElementById('overlays');

export default function Overlays() {
    const doctors = useContext(DoctorContext);
    const modal = useContext(ModalContext);

    return createPortal(
        <>
            {
                modal.isOpen && (
                    <DoctorModal 
                        doctors={doctors} 
                        openModal={modal.openModal} 
                        closeModal={modal.closeModal} 
                    />
                )
            }
        </>, modalRoot
    );
};