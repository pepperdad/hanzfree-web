import React, { useEffect, useState } from 'react';

import Lottie from 'react-lottie-player';

import lottieJson from './lottie.json';

export default function Animation() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 재생
    setIsPlaying(true);
  }, []);

  return <Lottie animationData={lottieJson} play={isPlaying} loop={false} />;
}
