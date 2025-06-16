import { useState } from 'react';
import { getAirlineInfo } from '@/config/airlineLogos';
import './AirlineLogo.css';

interface AirlineLogoProps {
  airline: string;
  size?: 'small' | 'medium' | 'large';
}

const AirlineLogo = ({ airline, size = 'medium' }: AirlineLogoProps) => {
  const [imageError, setImageError] = useState(false);
  const airlineInfo = getAirlineInfo(airline);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderFallback = () => (
    <div className={`airline-logo-fallback airline-logo-fallback--${size}`}>
      <span className="airline-code">{airlineInfo.fallback}</span>
    </div>
  );

  const renderLogo = () => {
    if (!airlineInfo.logo || imageError) {
      return renderFallback();
    }

    return (
      <img
        src={airlineInfo.logo}
        alt={`${airlineInfo.name} logo`}
        className={`airline-logo-img airline-logo-img--${size}`}
        onError={handleImageError}
        loading="lazy"
      />
    );
  };

  return (
    <div className={`airline-logo airline-logo--${size}`} title={airlineInfo.name}>
      {renderLogo()}
    </div>
  );
};

export default AirlineLogo;
