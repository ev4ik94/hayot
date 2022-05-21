import {ICategories} from "../../ts-types/main";

export const Categories:ICategories[] = [
    {
        title: {
            ru: 'Помочь приюту',
            uz: 'Помочь приюту',
            en: 'Помочь приюту'
        },
        link: '/shelter-help',
        children: []
    },
    {
        title: {
            ru: 'Волонтёры',
            uz: 'Волонтёры',
            en: 'Volunteers'
        },
        link: '/volunteers',
        children: []
    },
    {
        title: {
            ru: 'Полезно знать',
            uz: 'Волонтёры',
            en: 'Useful to know'
        },
        link: '/info',
        children: []
    },
    {
        title: {
            ru: 'О приюте',
            uz: 'О приюте',
            en: 'About Us'
        },
        link: '/about-us',
        children: [
            {
                title: {
                    ru: 'История',
                    uz: 'История',
                    en: 'History'
                },
                link: '/history'
            },
            {
                title: {
                    ru: 'Что мы делаем',
                    uz: 'Что мы делаем',
                    en: 'What we do'
                },
                link: '/what-we-do'
            },
            {
                title: {
                    ru: 'Пресса',
                    uz: 'Пресса',
                    en: 'Press'
                },
                link: '/media'
            },
            {
                title: {
                    ru: 'Нам помогают',
                    uz: 'Нам помогают',
                    en: 'They help us'
                },
                link: '/helping-us'
            },
            {
                title: {
                    ru: 'Будущее Хаёта',
                    uz: 'Нам помогают',
                    en: 'The future of Haeta'
                },
                link: '/our-future'
            },
            {
                title: {
                    ru: 'Реквизиты',
                    uz: 'Реквизиты',
                    en: 'Requisites'
                },
                link: '/requisites'
            },
            {
                title: {
                    ru: 'Документы и отчеты',
                    uz: 'Документы и отчеты',
                    en: 'Documents and reports'
                },
                link: '/documents'
            },
            {
                title: {
                    ru: 'Адрес',
                    uz: 'Адрес',
                    en: 'Address'
                },
                link: '/address'
            }
        ]
    }
]
