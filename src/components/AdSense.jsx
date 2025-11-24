import React, { useEffect } from 'react';

const AdSense = ({ client = "ca-pub-XXXXXXXXXXXXXXXX", slot = "1234567890", format = "auto", responsive = "true", style = {} }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className="ad-container">
            <p className="ad-label">Advertisement</p>
            <ins className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-ad-full-width-responsive={responsive}>
            </ins>
        </div>
    );
};

export default AdSense;
