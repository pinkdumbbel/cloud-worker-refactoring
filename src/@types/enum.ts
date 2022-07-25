export const ApiUrlEnum = {
  REGION: '/region',
} as const;

export type ApiUrlType = typeof ApiUrlEnum[keyof typeof ApiUrlEnum];
export const InputNameEnum = {
  NAME: 'name',
  BIRTH: 'birth',
  PHONE: 'phone',
  EMAIL: 'email',
} as const;

export type InputNameType = typeof InputNameEnum[keyof typeof InputNameEnum];

export const TitleIconEnum = {
  CLOSE: 'close',
  ARROW: 'arrow',
} as const;

export type TitleType = typeof TitleIconEnum[keyof typeof TitleIconEnum];

export const ContentTypeEnum = {
  PRIVACY: 'privacy',
  THIRDPARTY: 'thirdParty',
};

export type ContnetType = typeof ContentTypeEnum[keyof typeof ContentTypeEnum];
