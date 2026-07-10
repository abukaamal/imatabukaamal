import { TentangData } from '../types';

interface TentangSectionProps {
  tentangData: TentangData | null;
  loading: boolean;
  error: string | null;
}

export default function TentangSection({ tentangData, loading, error }: TentangSectionProps) {
  if (loading) {
    return (
      <div id="tentangContent">
        <div className="loading-indicator">Memuat data Tentang...</div>
      </div>
    );
  }

  if (error || !tentangData) {
    return (
      <div id="tentangContent">
        <div className="loading-indicator">{error || 'Gagal memuat data Tentang'}</div>
      </div>
    );
  }

  return (
    <div id="tentangContent">
      <h2 className="section-title"><span>Tentang</span> Saya</h2>
      <div className="about-grid">
        {tentangData.image_url ? (
          <div className="about-img">
            <img src={tentangData.image_url} alt="foto owner" referrerPolicy="no-referrer" />
          </div>
        ) : null}
        <div className="about-desc">
          {tentangData.name ? <h3>{tentangData.name}</h3> : null}
          {tentangData.location ? (
            <p>
              <i className="fas fa-map-pin" style={{ color: '#2563eb', marginRight: '8px' }}></i> {tentangData.location}
            </p>
          ) : null}
          {tentangData.description ? <p>{tentangData.description}</p> : null}
          {tentangData.skills ? (
            <p>
              <strong>Keahlian:</strong> {tentangData.skills}
            </p>
          ) : null}
          {tentangData.achievement ? (
            <p>
              <i className="fas fa-award" style={{ color: '#2563eb', marginRight: '8px' }}></i> {tentangData.achievement}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
