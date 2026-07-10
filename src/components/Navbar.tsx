import { useState } from 'react';
import { LogoData } from '../types';

interface NavbarProps {
  logoData: LogoData | null;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenModal: () => void;
}

export default function Navbar({ logoData, currentPage, setCurrentPage, onOpenModal }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const logoName = logoData?.logo_name || '⚡ dev<span style="-webkit-text-fill-color:#1e293b;">folio</span>';
  const logoImage = logoData?.image_url || '';

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Kontak' },
  ];

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobileMenu = () => {
    const nextState = !isMobileOpen;
    setIsMobileOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const handleCloseMobileMenu = () => {
    setIsMobileOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav>
        <div className="container nav-wrapper">
          <div className="logo" id="logoContainer" onClick={() => handleNavigate('beranda')}>
            {logoImage ? (
              <img src={logoImage} alt="Logo" className="logo-img" referrerPolicy="no-referrer" />
            ) : null}
            <span 
              className="logo-text"
              dangerouslySetInnerHTML={{ __html: logoName }}
            />
          </div>

          <div className="nav-links" id="navLinks">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={currentPage === item.id ? 'active' : ''}
                data-page={item.id}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </a>
            ))}
            <a href="#" className="btn-nav" id="openModalBtn" onClick={(e) => {
              e.preventDefault();
              onOpenModal();
            }}>
              <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Pesan
            </a>
          </div>

          <button 
            className={`hamburger ${isMobileOpen ? 'active' : ''}`} 
            id="hamburgerBtn" 
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileOpen ? 'active' : ''}`} 
        id="mobileOverlay"
        onClick={handleCloseMobileMenu}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`} id="mobileMenu">
        <div id="mobileNavContainer">
          <div className="nav-links-mobile" id="mobileNavLinks">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={currentPage === item.id ? 'active' : ''}
                data-page={item.id}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#" 
              className="btn-nav-mobile" 
              id="openModalBtnMobile"
              onClick={(e) => {
                e.preventDefault();
                handleCloseMobileMenu();
                onOpenModal();
              }}
            >
              <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i> Kirim Pesan
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
