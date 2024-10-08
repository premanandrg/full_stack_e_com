import React from 'react';

const TopDeals = () => {
    return (<section className="product-listing container mt-20">
          <h2>Featured Products</h2>
        <div className="product-item">
            <img src="https://m.media-amazon.com/images/I/41VASL85n-L._AC_SY220_.jpg" alt="Simmtronics 8 GB Flash Drive USB 2.0 Pendrive " />
            <p>Simmtronics 8 GB Flash Drive USB 2.0 Pendrive </p>
            <p className="price">₹349 <span className="old-price">₹1999</span></p>
        </div>
        <div className="product-item">
            <img src="https://m.media-amazon.com/images/I/51vPRWbDX5L._SL1100_.jpg" alt="Steelbird SBA-7 7Wings ISI Certified Flip-Up Helmet" />
            <p>Steelbird SBA-7 7Wings ISI Certified Flip-Up Helmet</p>
            <p className="price">₹1,519 <span className="old-price">₹1,899</span></p>
        </div>

        <div className="product-item">
            <img src="https://m.media-amazon.com/images/I/71gfGhGGHQL._AC_AA360_.jpg" alt="LG UltraWide 29 inch (73 cm) IPS FHD, 2560x1080 Pixels, Color Calibrated, 100Hz, 7W x 2 Inbuilt Speaker, USB-C, Display Port, HDMI, White Color-29WQ600LG UltraWide 29 inch (73 cm) IPS FHD, 2560x1080 Pixels, Color Calibrated" />
            <p>LG UltraWide 29 inch (73 cm) IPS FHD Monitor</p>
            <p className="price">₹35,519 <span className="old-price">₹42,899</span></p>
        </div>


        <div className="product-item">
            <img src="https://m.media-amazon.com/images/I/61xvxRAu55L._SL1000_.jpg" alt="Fevicryl Acrylic Colours Lilac Kit | 6 Colours x 10 ml " />
            <p>Fevicryl Acrylic Colours Lilac Kit | 6 Colours x 10 ml </p>
            <p className="price">₹95 <span className="old-price">₹100</span></p>
        </div>


        {/* Add more products */}
    </section>);
}

export default TopDeals;