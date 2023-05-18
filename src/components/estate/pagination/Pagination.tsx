import React from 'react'
import style from './pagination.module.scss';
import { useTranslation } from "next-i18next";

interface PaginationProps {
    totalPages: number,
    activePage: number,
    onPageChange: (page: number) => void
}

export default  function Pagination ({ totalPages, activePage, onPageChange }: PaginationProps) {

    const { t } = useTranslation();

    const pagesToShow = 5

    const handleClick = (page: number) => {
        onPageChange(page)
    }

    const renderPageNumbers = () => {
        const pageNumbers = []

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }

        const middleIndex = Math.ceil(pagesToShow / 2) - 1
        const startPage = Math.max(1, activePage - middleIndex)
        const endPage = Math.min(totalPages, activePage + middleIndex)

        return pageNumbers.slice(startPage - 1, endPage).map((page) => (
            <button
                key={page}
                className={`${style.page} ${
                    activePage === page ? style.active : 'hover:bg-gray-100'
                }`}
                onClick={() => handleClick(page)}
            >
                {page}
            </button>
        ))
    }

    if (!totalPages) {
        return null
    }

    return (
        <div className="flex flex-col wrapper">
            <div className={style.hr}/>
            <div className={`flex items-center ${style.pages}`}>
                <div>
                    {renderPageNumbers()}
                </div>
                <div className={style.buttons}>
                    {activePage !== 1 &&
                        <button
                            className={`${style.back} ${
                                activePage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-100'
                            }`}
                            disabled={activePage === 1}
                            onClick={() => handleClick(activePage - 1)}
                        >
                            {t("estatePage:pagination.back")}
                        </button>
                    }
                    {activePage !== totalPages &&
                        <button
                            className={`${style.next} ${
                                activePage === totalPages ? 'cursor-not-allowed hidden' : style.hover
                            }`}
                            disabled={activePage === totalPages}
                            onClick={() => handleClick(activePage + 1)}
                        >
                            {t("estatePage:pagination.next")}
                        </button>
                    }
                    <div className="ml-2 text-gray-500">
                        {t("estatePage:pagination.page")}{activePage}{t("estatePage:pagination.of")}{totalPages}
                    </div>
                </div>

            </div>
        </div>
    )
}
