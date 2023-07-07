import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import type { LottiePlayer } from 'lottie-web';


import { selectIsLoading } from '../store/loadingSlice';

const Loading = () => {
  const isLoading = useSelector(selectIsLoading);
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: '/loading.json',
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <div ref={ref} style={{height: '20rem', width: '20rem'}} />
    </Backdrop>
  );
};

export default Loading;
