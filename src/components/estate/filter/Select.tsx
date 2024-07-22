import React, { useState, useEffect, useRef } from "react";
import style from './select.module.scss'
import { useTranslation } from "next-i18next";

interface Option {
    option: string,
    value: string
}

interface SelectProps {
    options: Option[],
    placeHolder: string,
    onSelect: (value: string) => void,
    disabled?: boolean
    valueActual: string,
    ignoreActual?: boolean,
}

const Select = ({ options, placeHolder, onSelect, disabled, valueActual, ignoreActual }: SelectProps) => {

    const [ value, setValue ] = useState<Option>(options.find(option => option.value === valueActual) || {value: '', option: placeHolder})
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null);

    const { i18n } = useTranslation()

    useEffect(() => {
        if (valueActual === "price:desc" || valueActual === "price:asc" || valueActual === "createdAt:desc" || valueActual === "createdAt:asc") {
            setValue({
                option: sort[valueActual][i18n.language],
                value: valueActual
            })
            return;
        }
        if (valueActual === "buy" || valueActual === "rent") {
            setValue({
                option: rent[valueActual][i18n.language],
                value: valueActual
            })
            return;
        }
        setValue(options.find(option => option.value === valueActual) || {value: '', option: placeHolder})
    }, [i18n.language])

    useEffect(() => {
        if (!ignoreActual && value) {
            setValue(options.find(option => option.value === valueActual) || {value: '', option: placeHolder});
        }
    }, [valueActual, options])

    const selectOption = (opt: Option) => {
        setValue(opt);
        onSelect(opt.value);
    }

    const openOptions = () => {
        if (!disabled)
            setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className={style.select + " " + (disabled ? style.disabled : "")} onClick={() => openOptions()}>
            <div className={style.visiblePart}>
                <div className={style.placeholder}>{value.option}</div>
                <svg className={style.selectSVG + " " + (isOpen ? style.rotate : "")} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.50781 0.25L0.75 1.05859L7 7.75L13.25 1.05859L12.4961 0.25L7 6.12891L1.50781 0.25Z" fill="#3C3C3C"/>
                </svg>
            </div>
            {isOpen &&
                <div className={style.options}>
                    {placeHolder &&
                        <div className={style.option} onClick={() => selectOption({option: placeHolder, value: ''})}>{placeHolder}</div>
                    }
                    {options.map((option, i) => (
                        <div onClick={() => selectOption(option)} className={style.option} key={i}>{option.option}</div>
                    ))

                    }
                </div>
            }
        </div>
    )
}

export default Select;

interface ISup {
    [key: string]: {
        [key: string]: string,
        lv: string,
        en: string,
        ru: string
    }
}

const sort: ISup = {
    "createdAt:asc": {
        lv: "Datums augstošā",
        en: "Date asc",
        ru: "Дата по возрастанию"
    },
    "createdAt:desc": {
        lv: "Datums dilstošā",
        en: "Date desc",
        ru: "Дата по убыванию"
    },
    "price:asc": {
        lv: "Cēna augstošā",
        en: "Price asc",
        ru: "Цена по возрастанию"
    },
    "price:desc": {
        lv: "Cēna dilstošā",
        en: "Price desc",
        ru: "Цена по убыванию"
    },
}

const rent: ISup = {
    "buy": {
        lv: "Pirkt uzreiz",
        en: "Buy",
        ru: "Купить"
    },
    "rent": {
        lv: "Izīrē",
        en: "Rent",
        ru: "Арендовать"
    }
}
