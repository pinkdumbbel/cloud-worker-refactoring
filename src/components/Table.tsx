import React, { MouseEventHandler, useEffect, useState } from 'react';
import { UserInterface } from 'request';
import styled from 'styled-components';
import Checkbox from './Checkbox';

interface TableProps {
  users: UserInterface[];
}

//상수는 나중에 따로 빼기
const tableHeads = [
  'Nums.',
  '지원날짜',
  '지원자명',
  '성별',
  '생년월일',
  '연락처',
  '이메일',
  '이용수단',
  '거주지',
  '당첨여부',
];

const Table = ({ users }: TableProps) => {
  const [tab, setTab] = useState<number>(1);

  const changeTab = (tabNumber: number) => {
    setTab(tabNumber);
  };

  //참가유무 버튼 onClick method
  const isWinningHandler = (isWinningValue: boolean) => {
    const [checked, setChecked] = useState(isWinningValue);
    setChecked((prevState) => !prevState);
    // isWinningValue = checked;
    console.log(`checked: ${checked}, isWinning: ${isWinningValue}`);
  };

  useEffect(() => {
    console.log(users, tab); //각 탭의 users 데이터로 필터되도록
  }, [tab]);

  return (
    <Article>
      {/* [ ] 2021, 2022로 필터링 */}
      <ul>
        <li onClick={() => changeTab(1)}>1차 모집</li>
        <li onClick={() => changeTab(2)}>2차 모집</li>
      </ul>
      <table>
        <thead>
          <tr>
            {tableHeads.map((tableHead, index) => (
              <th key={index}>{tableHead}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.applyDate}</td>
                <td>{user.name}</td>
                <td>{user.gender === 'M' ? '남' : '여'}</td>
                <td>{user.birth}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.transportation}</td>
                {/* [ ] hover 시에 목록이 나오도록! */}
                <td>{user.region.city + ' ' + user.region.district}</td>

                <td>
                  {user.isWinning ? 'Y' : 'N'}
                  {/* [ ] 체크박스로 가능하도록. state hook 사용 */}
                  <input
                    type="Checkbox"
                    id={(index + 1).toString()}
                    checked={user.isWinning}
                    onClick={() => isWinningHandler(user.isWinning)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Article>
  );
};

export default Table;

const Article = styled.article`
  width: 100%;
  ul {
    display: flex;
    margin-bottom: 20px;
  }
  ul li {
    ${({ theme }) => theme.mixins.flexBox('center', 'center')};
    width: 50%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.color.border.black};
  }
  table {
    width: 100%;
  }
  th {
    font-weight: 700;
    line-height: 1.5rem;
  }
  td {
    font-size: 1rem;
    line-height: 1.2rem;
    text-align: center;
  }
`;
