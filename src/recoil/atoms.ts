import { InputNameEnum, InputNameType } from '@/@types/enum';
import { DEFAULT_SELECTED_CITY } from '@/constants';
import { atom } from 'recoil';
import { UserInputInterface, UserRegionInterface } from 'request';
export const applicantInfoState = atom<UserInputInterface>({
  key: 'applicantInfoState',
  default: {
    name: '',
    gender: '',
    birth: '',
    phone: '',
    email: '',
    transportation: [],
  },
});

export const applicantRegionState = atom<UserRegionInterface>({
  key: 'applicantRegionState',
  default: {
    city: DEFAULT_SELECTED_CITY,
    district: '',
  },
});

export const modalTriggerState = atom<boolean>({
  key: 'modalTriggerState',
  default: false,
});

interface ApplicatValidation {
  name: boolean;
  birth: boolean;
  phone: boolean;
  email: boolean;
}

export const applicantValidationState = atom<ApplicatValidation>({
  key: 'applicantValidation',
  default: {
    name: true,
    birth: true,
    phone: true,
    email: true,
  },
});
