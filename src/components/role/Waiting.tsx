import React , { useMemo, useState, useEffect } from 'react';
import {Tooltip } from 'antd';

interface Props {
  setCountdownAfterPressCancel: Function;
}

const Waiting: React.FC<Props> = ({setCountdownAfterPressCancel}) => {

  type Role = {
    id: number,
    name: string
  };

  const roleData: Role[] = [
    {id: 1, name: 'Requester'},
    {id: 2, name: 'Requester2'},
    {id: 3, name: 'Requester3'}
  ]
  const [roleList, setRoleList] = useState(roleData);
  
  useEffect(() => {
    setRoleList(roleData)
  }, []);
  
  const remove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id ?? '';
    const roleFilter = roleList.filter((e) => e.id.toString() !== id);
    setRoleList(roleFilter);
    console.log('Clicked role with ID:', id);
    setCountdownAfterPressCancel(3);
  };

  return (
    <>
    <tbody>
      {roleList.map((role, index) => {
        return (<>
        <tr>
            <td>{role.id}</td>
            <td>{role.name}</td>
            <td>
              <div className="text-status-color yellow"><i className="icon-dot"></i><span>Waiting</span></div>
            </td>
            <td>
            <Tooltip placement="top" title={'Cancel'} arrow={true}>
              <a onClick={remove} id={role.id.toString() ?? undefined} href="#" className="color-normal"><i className="icon-cross-circle"></i></a>
            </Tooltip>
            </td>
        </tr>
        </>)
      })}
    </tbody>
    </>
  );
};

export default Waiting;
