import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-6">
      <div className="container mx-auto px-4">
        {/* Footer üst kısmı: Proje sahipleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-bold text-emerald-500 mb-2">
              Proje Sahipleri
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-slate-100">Muhammed Taha Bayraktar</span> <br />
                <span className="text-sm text-slate-400">Computer Engineer</span>
              </li>
              <li>
                <span className="font-medium text-slate-100">Halil Yuşa Ağca</span> <br />
                <span className="text-sm text-slate-400">Computer Engineer</span>
              </li>
            </ul>
          </div>
          {/* Footer alt kısmı: Ek bilgiler */}
          <div>
            <h3 className="text-xl font-bold text-emerald-500 mb-2">
              Bize Ulaşın
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-slate-100">Muhammed Taha Bayraktar:</span> thbayraktar782@gmail.comx  
              </li>
              <li>
                <span className="font-medium text-slate-100">Halil Yuşa Ağca:</span> hyagca@hotmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Footer alt kısmı */}
        <div className="border-t border-slate-700 pt-4 text-center">
          <p className="text-sm text-slate-500">
            © 2025 TahminPro. Tüm Hakları Saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
