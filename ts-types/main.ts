

export interface ICategories {
    "title": {[index: string]:any},
    "link": string,
    "children": {
        "title": {[index: string]:any},
        "link": string
    }[]
}

export interface IPromotion {
    "title": {[index: string]:any},
    "description": {[index: string]:any},
    "image": {
        "original": string,
        "thumbnail": string
    }
}

export interface INews {
    id: number,
    title: {[index: string]:any},
    description: {[index: string]:any},
    text: {[index: string]:any},
    images: {
        src: string
    }[],
    createdAt: string

}

export interface IDogs {
    slug: string,
    name: {[index: string]:any},
    castrate: boolean,
    sex: string,
    size: string,
    title: {[index: string]:any},
    age: number,
    weight: number,
    height: number,
    adopted: boolean,
    disposition: {[index: string]:any},
    description: {[index: string]:any},
    gallery: {
        original: string,
        thumbnail: string
    }[],
    video: string[]
}

export interface INewsMedia {
    website: {
        name: string,
        link: string
    },
    title: {[index: string]:any},
    img: {
        src: string
    },
    color: string,
    createdAt: string
}
