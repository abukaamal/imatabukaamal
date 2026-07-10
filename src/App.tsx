import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BerandaSection from './components/BerandaSection';
import TentangSection from './components/TentangSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MessageModal from './components/MessageModal';
import BackToTop from './components/BackToTop';
import { LogoData, BerandaData, TentangData, GalleryItem, ContactData, FooterData } from './types';

const API_URL = 'https://script.google.com/macros/s/AKfycbySVHcR6BW38qIl5veWTL8ADe-Is6nBaQ1gUCbDWqH138ekSY673GYIU8TkCdiJVulr2Q/exec';

export default function App() {
  const [currentPage, setCurrentPage] = useState('beranda');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data states
  const [logoData, setLogoData] = useState<LogoData | null>(null);
  const [berandaData, setBerandaData] = useState<BerandaData | null>(null);
  const [tentangData, setTentangData] = useState<TentangData | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [logoRes, allRes] = await Promise.all([
          fetch(`${API_URL}?action=logo`).then(res => res.json()).catch(() => null),
          fetch(`${API_URL}?action=all`).then(res => res.json()).catch(() => null)
        ]);

        if (!active) return;

        // Set Logo and Title
        if (logoRes && !logoRes.error) {
          setLogoData(logoRes);
          if (logoRes.title) {
            document.title = logoRes.title;
          }
        }

        // Set Main Content
        if (allRes && !allRes.error) {
          setBerandaData(allRes.beranda || null);
          setTentangData(allRes.tentang || null);
          setGalleryData(allRes.gallery || []);
          setContactData(allRes.contact || null);
          setFooterData(allRes.footer || null);

          if (!logoRes?.title && allRes.beranda?.title) {
            document.title = allRes.beranda.title;
          }
        } else {
          setError('Gagal memuat data portfolio dari server.');
        }
      } catch (err) {
        if (active) {
          setError('Koneksi bermasalah atau gagal mengambil data.');
          console.error(err);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar component */}
      <Navbar 
        logoData={logoData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Pages Sections container */}
      <main className="flex-grow">
        {/* BERANDA */}
        <section className={`page-section ${currentPage === 'beranda' ? 'active' : ''}`} id="beranda">
          <BerandaSection 
            berandaData={berandaData}
            loading={loading}
            error={error}
          />
        </section>

        {/* TENTANG */}
        <section className={`page-section ${currentPage === 'tentang' ? 'active' : ''}`} id="tentang">
          <div className="container">
            <TentangSection 
              tentangData={tentangData}
              loading={loading}
              error={error}
            />
          </div>
        </section>

        {/* GALLERY */}
        <section className={`page-section ${currentPage === 'gallery' ? 'active' : ''}`} id="gallery">
          <div className="container">
            <h2 className="section-title"><span>Gallery</span> · Keahlian</h2>
            <GallerySection 
              galleryData={galleryData}
              loading={loading}
              error={error}
            />
          </div>
        </section>

        {/* CONTACT */}
        <section className={`page-section ${currentPage === 'contact' ? 'active' : ''}`} id="contact">
          <div className="container">
            <h2 className="section-title"><span>Hubungi</span> Kami</h2>
            <ContactSection 
              contactData={contactData}
              loading={loading}
              error={error}
            />
          </div>
        </section>
      </main>

      {/* Footer component */}
      <Footer 
        footerData={footerData}
        loading={loading}
        error={error}
      />

      {/* Messaging form modal overlay */}
      <MessageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Scroll to Top helper button */}
      <BackToTop />
    </div>
  );
}
