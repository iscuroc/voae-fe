import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="block md:flex justify-center mt-4">
            <button
                onClick={handlePrevious}
                className={`px-4 py-2 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'}`}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <span className="px-4 py-2 block">
                pagina {currentPage} de {totalPages}
            </span>
            <button
                onClick={handleNext}
                className={`px-4 py-2 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'}`}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
