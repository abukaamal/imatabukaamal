import { FooterData } from '../types';

interface FooterProps {
  footerData: FooterData | null;
  loading: boolean;
  error: string | null;
}

const iconMap: Record<string, string> = {
  github: 'fab fa-github',
  linkedin: 'fab fa-linkedin-in',
  twitter: 'fab fa-twitter',
  instagram: 'fab fa-instagram',
  facebook: 'fab fa-facebook',
  youtube: 'fab fa-youtube'
};

export default function Footer({ footerData, loading, error }: FooterProps) {
  if (loading) {
    return (
      <footer>
        <div className="container" id="footerContent">
          <div className="loading-indicator">Memuat data Footer...</div>
        </div>
      </footer>
    );
  }

  if (error || !footerData) {
    return (
      <footer>
        <div className="container" id="footerContent">
          <div className="loading-indicator">{error || 'Gagal memuat data Footer'}</div>
        </div>
      </footer>
    );
  }

  const socialLinks: Array<{ key: string; url: string }> = [];
  const socialKeys = ['github', 'linkedin', 'twitter', 'instagram', 'facebook', 'youtube'] as const;

  for (const key of socialKeys) {
    const val = footerData[key];
    if (val && val.trim() !== '') {
      socialLinks.push({
        key,
        url: val
      });
    }
  }

  return (
    <footer>
      <div className="container" id="footerContent">
        <div className="footer-content">
          {footerData.copyright ? (
            <div>&copy; {footerData.copyright}</div>
          ) : null}
          {socialLinks.length > 0 ? (
            <div className="footer-social">
              {socialLinks.map((link) => {
                const iconClass = iconMap[link.key] || 'fas fa-link';
                return (
                  <a 
                    key={link.key} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className={iconClass}></i>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
