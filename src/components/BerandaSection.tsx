import { BerandaData } from '../types';

interface BerandaSectionProps {
  berandaData: BerandaData | null;
  loading: boolean;
  error: string | null;
}

export default function BerandaSection({ berandaData, loading, error }: BerandaSectionProps) {
  if (loading) {
    return (
      <div className="container hero" id="berandaContent">
        <div className="loading-indicator">Memuat data Beranda...</div>
      </div>
    );
  }

  if (error || !berandaData) {
    return (
      <div className="container hero" id="berandaContent">
        <div className="loading-indicator">{error || 'Gagal memuat data Beranda'}</div>
      </div>
    );
  }

  return (
    <div className="container hero" id="berandaContent">
      <div className="hero">
        <div className="hero-text">
          <h1>{berandaData.title}</h1>
          <p>{berandaData.subtitle}</p>
          {berandaData.experience ? (
            <p style={{ marginTop: '18px', fontSize: '1rem', color: '#475569' }}>
              <i className="fas fa-code" style={{ color: '#2563eb', marginRight: '8px' }}></i> {berandaData.experience}
            </p>
          ) : null}
        </div>
        {berandaData.image_url ? (
          <div className="hero-image">
            <img src={berandaData.image_url} alt="foto profile" referrerPolicy="no-referrer" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
