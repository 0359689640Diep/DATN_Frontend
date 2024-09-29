import { useEffect, useRef } from 'react';

const useModal = (modalId) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const modalElement = document.querySelector(modalId);
        if (modalElement) {
            // modalRef.current = new bootstrap.Modal(modalElement);
        }
    }, [modalId]);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.show();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.hide();
        }
    };

    return {
        openModal,
        closeModal,
    };
};

export default useModal;
