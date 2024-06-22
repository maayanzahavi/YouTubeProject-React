import React from 'react';
import './ShareWindow.css';
import whatsappLogo from '../../../../assets/logos/whatsapp.png';
import instaLogo from '../../../../assets/logos/instagram.png';
import mailboxLogo from '../../../../assets/logos/mailbox.png';

const ShareWindow = ({ onClose }) => {
  return (
    <div className="share-window-overlay">
      <div className="share-window">
        <button className="close-button" onClick={onClose}>x</button>
        <h3>Share this video</h3>
        <div className="share-options">
          <img src={whatsappLogo} alt="Share on WhatsApp" className="share-icon" />
          <img src={instaLogo} alt="Share on Instagram" className="share-icon" />
          <img src={mailboxLogo} alt="Share via Email" className="share-icon" />
        </div>
        <input type="text" readOnly value={window.location.href} className="share-link" />
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy Link</button>
      </div>
    </div>
  );
};

export default ShareWindow;
