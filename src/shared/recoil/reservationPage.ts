import { atom } from 'recoil';

import { PageState } from '@shared/types';
import { uniqueId } from 'lodash';

export const reservationPageState = atom<PageState>({
  key: `reservationPageState/${uniqueId}`, // 각 atom의 고유한 키
  default: {
    page: 1,
  },
});
