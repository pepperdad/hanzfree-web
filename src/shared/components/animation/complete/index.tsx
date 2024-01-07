import React, { useEffect, useState } from 'react';

import Lottie from 'react-lottie-player';

import completeJson from './complete.json';

const index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 애니메이션 재생
    setIsPlaying(true);
  }, []);

  return <Lottie animationData={completeJson} play={isPlaying} loop={false} />;
};

export default index;
