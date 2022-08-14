import { ApiUrlEnum } from '@/@types/enum';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { UserInterface } from 'request';
import { apiRequest } from '../instance';

const useApplyUserModel = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  const getUserData = async () => {
    try {
      const userResponse: AxiosResponse<UserInterface[]> = await apiRequest.get<
        UserInterface[]
      >(ApiUrlEnum.APPLYUSER);

      if (userResponse) {
        setUsers(userResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchUser = async <T>(id: number, data: T) => {
    return await apiRequest.patch<T>(ApiUrlEnum.APPLYUSER, id, data);
  };

  const postUser = async <T>(data: T) => {
    try {
      await apiRequest.post<T>(ApiUrlEnum.APPLYUSER, data);

      alert('성공적으로 등록 되었습니다.');
    } catch (error) {
      alert('오류가 발생하였습니다. 관리자에게 문의 하세요.');
    }
  };

  return {
    users,
    getUserData,
    patchUser,
    postUser,
  };
};

export default useApplyUserModel;
