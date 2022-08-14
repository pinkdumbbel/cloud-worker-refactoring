import { InputNameType, TransportationType } from './enum';
export interface InputDataInterface {
  title?: string;
  name?: InputNameType;
  placeholder?: string;
  value?: string;
  validation?: boolean;
  type?: 'checkbox';
  readOnly?: boolean;
  labels?: string[];
  values?: string[];
  maxLength?: number;
  transportationList?: TransportationType[];
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickTransportation?: (
    event: React.MouseEvent<HTMLButtonElement>,
    transportation: TransportationType
  ) => void;
}
