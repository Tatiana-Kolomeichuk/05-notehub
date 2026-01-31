import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";

interface ModalProps{
    onClose: () => void;
}


export default function Modal({ onClose }: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.code === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [onClose]);
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
        return createPortal(<div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                {<NoteForm onClose={onClose} />}
            </div>
        </div>, document.body);
    }