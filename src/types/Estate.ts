export type IEstate = {
    _id: string,
    city: {
        name: {
            [key: string]: string,
            lv: string,
            ru: string,
            en: string,
        },
        _id: string
    },
    mainImage: string,
    name: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    },
    description: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    },
    price: number,
    rent: boolean,
    district: {
        name: {
            [key: string]: string,
            lv: string,
            ru: string,
            en: string,
        },
        _id: string
    },
    street: string,
    location: {
        lat: number,
        lng: number,
    },
    images: [],
    type: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    },

    rooms?: string,
    livingArea?: string,
    floor?: number,
    series?: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    },
    condition?: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    },
    landArea?: number,
    cadastralNumber?: string,
    size?: string,
    gateHeight?: number,
    assignment?: {
        [key: string]: string,
        lv: string,
        ru: string,
        en: string,
    }
}
