declare module 'request' {
  import { TransportationType } from '@/@types/enum';

  interface RegionDataInterface {
    [key: string]: string[];
  }

  type GenderType = 'F' | 'M' | '';

  interface UserRegionInterface {
    city: string;
    district: string;
  }

  interface UserInputInterface {
    name: string;
    gender: GenderType;
    birth: string;
    phone: string;
    email: string;
    transportation: TransportationType[];
  }

  interface UserInterface extends UserInputInterface {
    id: number;
    applyDate: string;
    isWinning: boolean;
    region: UserRegionInterface;
  }
}
