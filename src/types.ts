export interface LogoData {
  logo_name?: string;
  image_url?: string;
  title?: string;
  subtitle?: string;
}

export interface BerandaData {
  title?: string;
  subtitle?: string;
  experience?: string;
  image_url?: string;
}

export interface TentangData {
  name?: string;
  location?: string;
  description?: string;
  skills?: string;
  achievement?: string;
  image_url?: string;
}

export interface GalleryItem {
  name?: string;
  desc?: string;
  icon?: string;
  color?: string;
  link?: string;
}

export interface ContactData {
  email?: string;
  phone?: string;
  address?: string;
  map_url?: string;
}

export interface FooterData {
  copyright?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface PortfolioData {
  logo?: LogoData;
  beranda?: BerandaData;
  tentang?: TentangData;
  gallery?: GalleryItem[];
  contact?: ContactData;
  footer?: FooterData;
}
