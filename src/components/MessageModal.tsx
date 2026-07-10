import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REGEX = {
  nama: /^[a-zA-Z\s]{2,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  alamat: /^.{3,100}$/,
  pesan: /^.{5,500}$/
};

const API_URL = 'https://script.google.com/macros/s/AKfycbySVHcR6BW38qIl5veWTL8ADe-Is6nBaQ1gUCbDWqH138ekSY673GYIU8TkCdiJVulr2Q/exec';

export default function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telpon: '',
    alamat: '',
    pesan: ''
  });

  const [errors, setErrors] = useState({
    nama: false,
    email: false,
    telpon: false,
    telponMessage: 'Nomor telepon harus diawali dengan 0 dan terdiri dari angka (min 8 digit).',
    alamat: false,
    pesan: false
  });

  // Touch/blur states to prevent premature validation warnings
  const [touched, setTouched] = useState({
    nama: false,
    email: false,
    telpon: false,
    alamat: false,
    pesan: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      resetForm();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      nama: '',
      email: '',
      telpon: '',
      alamat: '',
      pesan: ''
    });
    setErrors({
      nama: false,
      email: false,
      telpon: false,
      telponMessage: 'Nomor telepon harus diawali dengan 0 dan terdiri dari angka (min 8 digit).',
      alamat: false,
      pesan: false
    });
    setTouched({
      nama: false,
      email: false,
      telpon: false,
      alamat: false,
      pesan: false
    });
    setIsSubmitting(false);
    setProgressWidth(0);
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/[\s\-+]/g, '');
    if (!/^\d+$/.test(cleanPhone)) {
      return {
        valid: false,
        message: 'Nomor telepon hanya boleh berisi angka'
      };
    }
    if (cleanPhone.length < 8) {
      return {
        valid: false,
        message: 'Nomor telepon minimal 8 digit'
      };
    }
    if (!cleanPhone.startsWith('0')) {
      return {
        valid: false,
        message: 'Nomor telepon harus diawali dengan 0'
      };
    }
    return {
      valid: true,
      message: '',
      cleanPhone: cleanPhone
    };
  };

  const validateField = (name: string, value: string) => {
    if (name === 'telpon') {
      const result = validatePhone(value);
      setErrors(prev => ({
        ...prev,
        telpon: !result.valid,
        telponMessage: result.message || prev.telponMessage
      }));
      return result.valid;
    }

    const key = name as keyof typeof REGEX;
    const regex = REGEX[key];
    if (!regex) return true;

    const isValid = regex.test(value.trim());
    setErrors(prev => ({
      ...prev,
      [name]: !isValid
    }));
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const simulateProgressAndSubmit = () => {
    const startTime = Date.now();
    let speedFactor = 1;

    // Simulate speed check by creating a silent network request
    const speedTest = new Image();
    speedTest.src = 'https://www.google.com/images/phd/px.gif?cache=' + Date.now();
    
    speedTest.onload = () => {
      const loadTime = (Date.now() - startTime) / 1000;
      if (loadTime > 1.5) speedFactor = 0.5;
      else if (loadTime < 0.3) speedFactor = 2;
      else speedFactor = 1;
    };

    let intervalId = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const calculated = Math.min(elapsed * 25 * speedFactor, 95);
      
      if (calculated >= 95) {
        clearInterval(intervalId);
        setProgressWidth(100);
        setTimeout(() => {
          submitPayload();
        }, 300);
      } else {
        setProgressWidth(calculated);
      }
    }, 100);
  };

  const submitPayload = () => {
    const cleanPhone = formData.telpon.trim().replace(/[\s\-+]/g, '');
    const bodyFormData = new FormData();
    bodyFormData.append('nama', formData.nama.trim());
    bodyFormData.append('email', formData.email.trim());
    bodyFormData.append('telpon', cleanPhone);
    bodyFormData.append('alamat', formData.alamat.trim());
    bodyFormData.append('pesan', formData.pesan.trim());

    fetch(API_URL, {
      method: 'POST',
      body: bodyFormData
    })
      .then(response => {
        if (!response.ok) throw new Error('Network error: ' + response.status);
        return response.json();
      })
      .then(result => {
        if (result && result.success === true) {
          Swal.fire({
            icon: 'success',
            title: 'Pesan terkirim!',
            text: 'Data berhasil disimpan ke Google Sheet.',
            confirmButtonColor: '#2563eb',
            timer: 3000,
            timerProgressBar: true
          });
          onClose();
        } else {
          const errorMessage = result && result.message ? result.message : 'Gagal mengirim pesan';
          Swal.fire({
            icon: 'error',
            title: 'Gagal mengirim',
            text: errorMessage,
            confirmButtonColor: '#2563eb'
          });
        }
      })
      .catch(err => {
        let errorMessage = 'Terjadi kesalahan, data tidak tersimpan. Coba lagi.';
        if (err.message && err.message.indexOf('Network') !== -1) {
          errorMessage = 'Koneksi bermasalah. Periksa koneksi internet Anda.';
        }
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengirim',
          text: errorMessage,
          confirmButtonColor: '#2563eb'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        setProgressWidth(0);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all fields
    const isNamaValid = validateField('nama', formData.nama);
    const isEmailValid = validateField('email', formData.email);
    const isTelponValid = validateField('telpon', formData.telpon);
    const isAlamatValid = validateField('alamat', formData.alamat);
    const isPesanValid = validateField('pesan', formData.pesan);

    setTouched({
      nama: true,
      email: true,
      telpon: true,
      alamat: true,
      pesan: true
    });

    if (!isNamaValid || !isEmailValid || !isTelponValid || !isAlamatValid || !isPesanValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Form tidak lengkap',
        text: 'Mohon periksa kembali semua kolom yang ditandai.',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    setIsSubmitting(true);
    setProgressWidth(0);
    simulateProgressAndSubmit();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'active' : ''}`} 
      id="modalForm"
      ref={modalRef}
      onClick={handleOverlayClick}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fas fa-paper-plane"></i> Kirim Pesan</h2>
          <button className="close-modal" id="closeModalBtn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form id="contactForm" onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <label>Nama Lengkap <span className="required">*</span></label>
            <input 
              type="text" 
              id="nama" 
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Masukkan nama lengkap" 
              required 
              disabled={isSubmitting}
            />
            <div className={`error-msg ${errors.nama && touched.nama ? 'show' : ''}`} id="namaError">
              Nama harus diisi (min 2 huruf).
            </div>

            <label>Email <span className="required">*</span></label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="email@contoh.com" 
              required 
              disabled={isSubmitting}
            />
            <div className={`error-msg ${errors.email && touched.email ? 'show' : ''}`} id="emailError">
              Email tidak valid.
            </div>

            <label>Telepon <span className="required">*</span></label>
            <input 
              type="tel" 
              id="telpon" 
              name="telpon"
              value={formData.telpon}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="082199992754" 
              required 
              disabled={isSubmitting}
            />
            <div className={`error-msg ${errors.telpon && touched.telpon ? 'show' : ''}`} id="telponError">
              {errors.telponMessage}
            </div>

            <label>Alamat <span className="required">*</span></label>
            <input 
              type="text" 
              id="alamat" 
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jl. Contoh No. 1" 
              required 
              disabled={isSubmitting}
            />
            <div className={`error-msg ${errors.alamat && touched.alamat ? 'show' : ''}`} id="alamatError">
              Alamat harus diisi (min 3 karakter).
            </div>

            <label>Pesan <span className="required">*</span></label>
            <textarea 
              id="pesan" 
              name="pesan"
              value={formData.pesan}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tulis pesan Anda di sini..." 
              required 
              disabled={isSubmitting}
            ></textarea>
            <div className={`error-msg ${errors.pesan && touched.pesan ? 'show' : ''}`} id="pesanError">
              Pesan minimal 5 karakter.
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button 
            type="submit" 
            className="btn-submit" 
            id="submitBtn"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={isSubmitting ? { background: '#3b82f6' } : {}}
          >
            {!isSubmitting ? (
              <span id="btnText"><i className="fas fa-check-circle"></i> Kirim Pesan</span>
            ) : (
              <span id="btnLoading">
                <span className="spinner"></span> Mengirim...
              </span>
            )}
            {isSubmitting && (
              <span 
                className="loading-progress" 
                id="loadingProgress" 
                style={{ width: `${progressWidth}%` }}
              ></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
