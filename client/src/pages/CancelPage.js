import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
        <p className="text-xl font-bold">Ödeme İptal Edildi</p>
        <p>Hesabınızdan para çekilmedi.</p>
      </div>
      
      <div className="card max-w-md mx-auto mb-8 p-6">
        <h3 className="text-xl font-bold mb-4 text-primary">Ne oldu?</h3>
        <p className="mb-4">
          Ödeme işlemi iptal edildi ve para çekilmedi.
        </p>
        <p className="mb-4">
          Hala destek istiyorsanız, farklı bir ödeme yöntemiyle tekrar deneyebilirsiniz.
        </p>
      </div>
      
      <Link to="/" className="btn btn-primary">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default CancelPage; 