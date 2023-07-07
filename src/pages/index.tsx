import type { NextPage } from 'next';

import DefaultLayout from '../layouts/DefaultLayout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CreateRole from '../components/role/createroles/index';
import { User, getUser } from '@api/user'
import Approved from '../components/role/Approved'
import Waiting from '../components/role/Waiting'

const Home: NextPage = () => {
  const [openCreateRole, setOpenCreateRole] = useState(false);

  const router = useRouter();
  const goToCreateRole = () => {
    try {
      //router.push('/role/create');
      setOpenCreateRole(true);
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState('');
  const fetchData = () => {
    // getUser().then((res) => {
      
    // })
  }

  const [menu, setMenu] = useState('Approved');
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    const dataValue = event.currentTarget.getAttribute('data-value') ?? '';
    setMenu(dataValue);
  };

  const [countdownAfterPressCancel, setCountdownAfterPressCancel] = useState<number>(0);
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdownAfterPressCancel > 0) {
      timer = setTimeout(() => {
        setCountdownAfterPressCancel((num) => num - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [countdownAfterPressCancel]);

  return (
    <>
      {openCreateRole && (
      <div style={{display: 'flex'}}>
          <CreateRole setOpenCreateRole={setOpenCreateRole}/>
      </div>
      )}
      {!openCreateRole && (
        <DefaultLayout>
        {countdownAfterPressCancel > 0 && (
          <>
            <div className="box-alert-wrap">
              <div className="box-alert box-alert-success box-fixed-content"><strong>Success:</strong> The request role has been cancelled.</div>
            </div>
          </>
        )}
        <div className="box-bar-level">
          <div className="box-bar-column">
            <div className="mb-10">
              {' '}
              <strong className="font-menu color-info">Level 01</strong>
            </div>
            <strong className="font-heading color-title">Name Surname</strong>
          </div>
          <div className="box-bar-column">
            <div className="mb-10">
              {' '}
              <span className="color-sub">Level</span>
            </div>
            <p className="clear-p">
              <span>01 Description</span>
              <br />
              <span className="color-sub">
                บริษัท ซีพีเอฟ (ประเทศไทย) จำกัด (มหาชน)
              </span>
              <br />
              <span className="color-sub">คลังวัตถุดิบ</span>
            </p>
          </div>
          <div className="box-bar-column">
            <div className="mb-10">
              {' '}
              <span className="color-sub">CCA</span>
            </div>
            <p className="clear-p">
              <span>1190001969</span>
              <br />
              <span className="color-sub">Tmp Cost Center Name</span>
            </p>
          </div>
        </div>
        <div className="frontend-tab-menu mt-20 mb-20">
          <a href="javascript:void(0)" className={menu === 'Approved' ? 'list-tab-menu w-reset active' : 'list-tab-menu w-reset'} onClick={handleClick} data-value="Approved">
            Approved
          </a>
          <a href="javascript:void(0)" className={menu === 'Waiting' ? 'list-tab-menu w-reset active' : 'list-tab-menu w-reset'}onClick={handleClick} data-value="Waiting">
            Waiting
          </a>
          <a href="javascript:void(0)" className={menu === 'Rejected' ? 'list-tab-menu w-reset active' : 'list-tab-menu w-reset'} onClick={handleClick} data-value="Rejected">
            Rejected
          </a>
          <a href="javascript:void(0)" className={menu === 'All' ? 'list-tab-menu w-reset active' : 'list-tab-menu w-reset'} onClick={handleClick} data-value="All">
            All
          </a>
        </div>
        <div className="frontend-top-ctrl">
          <div className="pull-left">
            <button className="btn-op-default other-action" onClick={() => goToCreateRole()}>
              <i className="icon-plus mr-10"></i>Create Role
            </button>
          </div>
          <div className="pull-right box-top-search box-top-search-res">
            <input
              placeholder="Search Role..."
              className="form-control input-search"
            />
            <button className="btn-op-primary btn-search">
              <i className="icon-search"></i>
            </button>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="frontend-items-list">
          <table className="table-default table-selfservice">
            <thead>
              <tr>
                <th className="tb-col-80">No.</th>
                <th className="tb-min-m">Role</th>
                <th className="tb-col-200">Status</th>
                <th className="tb-col-80"></th>
              </tr>
            </thead>
            {menu === 'Approved' && (<Approved/>)}
            {menu === 'Waiting' && (<Waiting setCountdownAfterPressCancel={setCountdownAfterPressCancel}/>)} 
          </table>
        </div>
      </DefaultLayout>
      )}
    </>
  );
};

export default Home;
