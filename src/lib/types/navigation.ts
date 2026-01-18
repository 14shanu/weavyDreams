export interface NavLink {
    label: string;
    href: string;
}

export interface NavColumn {
    title: string;
    links: NavLink[];
}

export interface FooterConfig {
    copyrightLabel: string;
    rightText?: string;
    columns?: NavColumn[];
}

export interface NavigationConfig {
    brand: {
        label: string;
        href: string;
    };
    links: NavLink[];
    footer?: FooterConfig;
}