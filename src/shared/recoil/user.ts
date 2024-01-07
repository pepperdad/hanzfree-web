import { User } from '@shared/types';
import { uniqueId } from 'lodash';
import { atom, useSetRecoilState, AtomEffect, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v1 } from 'uuid';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

export const ssrCompletedState = atom({
  key: `SsrCompleted/${v1()}`,
  default: true,
});

// useEffect에 쓰일 함수를 정의한다.
export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

const { persistAtom } = recoilPersist({
  storage: localStorage,
});

export interface IsLoggedIn extends User {
  currentRefreshTokenExp: string;
}

// user
export const userState = atom<IsLoggedIn>({
  key: `userState`, // 각 atom의 고유한 키
  default: {
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    createdAt: '',
    currentRefreshTokenExp: '',
  },
  effects_UNSTABLE: [persistAtom], // 세션 스토리지에 상태 저장
});
