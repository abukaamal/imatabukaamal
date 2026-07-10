import { ContactData } from '../types';

interface ContactSectionProps {
  contactData: ContactData | null;
  loading: boolean;
  error: string | null;
}

export default function ContactSection({ contactData, loading, error }: ContactSectionProps) {
  if (loading) {
    return (
      <div id="contactContent">
        <div className="loading-indicator">Memuat data Contact...</div>
      </div>
    );
  }

  if (error || !contactData) {
    return (
      <div id="contactContent">
        <div className="loading-indicator">{error || 'Gagal memuat data Contact'}</div>
      </div>
    );
  }

  const { email, phone, address, map_url } = contactData;

  return (
    <div id="contactContent">
      <div className="contact-wrap">
        <div className="contact-left">
          {email ? (
            <div className="contact-item" onClick={() => window.location.href = `mailto:${email}`}>
              <i className="fas fa-envelope"></i>
              <span className="contact-text">{email}</span>
            </div>
          ) : null}
          {phone ? (
            <div className="contact-item" onClick={() => window.location.href = `tel:${phone}`}>
              <i className="fas fa-phone-alt"></i>
              <span className="contact-text">{phone}</span>
            </div>
          ) : null}
          {address ? (
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span className="contact-text">{address}</span>
            </div>
          ) : null}
        </div>
        {map_url ? (
          <div className="contact-right">
            <iframe 
              src={map_url} 
              allowFullScreen={true} 
              loading="lazy"
              title="Lokasi Kantor"
              referrerPolicy="no-referrer"
            ></iframe>
          </div>
        ) : null}
      </div>
    </div>
  );
}
