// SSR 상태의 recoil state를 사용하기 위한 hook

import { useEffect, useState } from 'react';

import { RecoilState, useRecoilState } from 'recoil';

export function useSsrState<T>(state: RecoilState<T>, defaultValue: any) {
  const [isSSR, setIsSSR] = useState(true);
  const [value, setValue] = useRecoilState(state);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return [isSSR ? defaultValue : value, setValue] as const;
}
