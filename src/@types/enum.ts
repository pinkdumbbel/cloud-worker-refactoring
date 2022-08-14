export const ApiUrlEnum = {
  REGION: '/region',
  APPLYUSER: '/applyUser',
  ADMIN: '/admin',
} as const;

export const InputNameEnum = {
  NAME: 'name',
  GENDER: 'gender',
  BIRTH: 'birth',
  REGION: 'region',
  PHONE: 'phone',
  EMAIL: 'email',
  TRANSPORTATION: 'transportation',
  AGREEMENT: 'agreement',
} as const;

export const Transportations = [
  '버스',
  '지하철',
  '택시',
  'KTX/기차',
  '도보',
  '자전거',
  '전동킥보드',
  '자가용',
] as const;

export const AdminColumns = {
  name: '지원자명',
  gender: '성별',
  applyDate: '지원날짜',
  phone: '전화번호',
  birth: '생년월일',
  transportation: '이용수단',
  region: '거주지',
} as const;

export const TitleIconEnum = {
  CLOSE: 'close',
  ARROW: 'arrow',
} as const;

export const ContentTypeEnum = {
  PRIVACY: 'privacy',
  THIRDPARTY: 'thirdParty',
} as const;

export const ButtonTypeEnum = {
  MULTIPLE: 'multiple',
  SINGLE: 'single',
} as const;

export type TransportationType = typeof Transportations[number];

export type ApiUrlType = typeof ApiUrlEnum[keyof typeof ApiUrlEnum];
export type InputNameType = typeof InputNameEnum[keyof typeof InputNameEnum];
export type InputNameOmitKeyType = keyof Omit<
  typeof InputNameEnum,
  'REGION' | 'GENDER' | 'TRANSPORTATION' | 'AGREEMENT'
>;

export type TitleType = typeof TitleIconEnum[keyof typeof TitleIconEnum];
export type ButtonType = typeof ButtonTypeEnum[keyof typeof ButtonTypeEnum];
export type ContentType = typeof ContentTypeEnum[keyof typeof ContentTypeEnum];

export type AdminColumnsKeyType = keyof typeof AdminColumns;
export type AdminColumnsValueType = typeof AdminColumns[AdminColumnsKeyType];
