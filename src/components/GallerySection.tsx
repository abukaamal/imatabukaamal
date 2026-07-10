import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryData: GalleryItem[] | null;
  loading: boolean;
  error: string | null;
}

export default function GallerySection({ galleryData, loading, error }: GallerySectionProps) {
  if (loading) {
    return (
      <div id="galleryContent">
        <div className="loading-indicator">Memuat data Gallery...</div>
      </div>
    );
  }

  if (error || !galleryData || !Array.isArray(galleryData) || galleryData.length === 0) {
    return (
      <div id="galleryContent">
        <div className="loading-indicator">{error || 'Gagal memuat data Gallery'}</div>
      </div>
    );
  }

  const handleCardClick = (link: string | undefined) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div id="galleryContent">
      <div className="gallery-grid">
        {galleryData.map((item, idx) => {
          const iconClass = item.icon || 'fas fa-code';
          const iconColor = item.color || '#2563eb';
          const name = item.name || '';
          const desc = item.desc || '';

          return (
            <div
              key={idx}
              className="skill-card"
              onClick={() => handleCardClick(item.link)}
            >
              <i className={iconClass} style={{ color: iconColor }}></i>
              {name ? <h4>{name}</h4> : null}
              {desc ? <p>{desc}</p> : null}
              <span className="card-link">
                <i className="fas fa-arrow-right" style={{ marginRight: '6px' }}></i> Pelajari
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
