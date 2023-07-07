import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Form, FormInstance } from 'antd';;
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Image from 'next/image';
import { AccountAssignment, getAccountAssignment } from '@api/accountAssignment';
import { setLoading } from '@store/loadingSlice';
import { useDispatch } from 'react-redux';

interface Props {
  form: FormInstance;
}

const AccountAssignment: React.FC<Props> = ({form}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [accountAssignmentList, setAccountAssignmentList] = useState<AccountAssignment[]>([]);

  const fetchData = async () => {
    dispatch(setLoading(true));
    await getAccountAssignment().then((res) => {
      setAccountAssignmentList(res)
    })
    dispatch(setLoading(false));
  }


  useEffect(() => {
    fetchData();
    return () => {
      console.log('Component exited');
    };
  }, []);

  const filteredList = accountAssignmentList.filter((item) =>
    item.value.toLowerCase().includes(searchText.toLowerCase())
  );

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    const id = e.target.id ?? '';
    const value = e.target.value;
    const checked = e.target.checked;
    const checkboxList = accountAssignmentList.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          checked: checked
        };
      } else {  
        return {
          ...e
        };
      }
    });
    setAccountAssignmentList(checkboxList);
  };

  function updateAccountAssignmentFieldValues(checkboxList: AccountAssignment[]) {
    form.setFieldsValue({...form.getFieldsValue(), 'accountAssignment': checkboxList.filter((e) => e.checked === true) });
  }

  useEffect(() => {
    updateAccountAssignmentFieldValues(accountAssignmentList);
  }, [accountAssignmentList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText(e.target.value);
  };

  const removeItem = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.id;
    const updateSelectedCheckBox = accountAssignmentList.map((e) => {
      if (id === e.id) {
        return {
          ...e,
          checked: false
        };
      } else {
        return {
          ...e
        };
      }
    });
    setAccountAssignmentList(updateSelectedCheckBox);
  };

  return (
    <>
      <div className='section-title-border mt-10 mb-20'><strong>Account Assignement</strong></div>
      <div className='mb-20'>
        <div className='box-item-select'>
          {accountAssignmentList.filter((e) => e.checked === true).length == 0
            ? <span className='color-placeholder'>Select Account Assignement below</span>
            :
              <div className='badge-wrap'>
                {accountAssignmentList.filter((e) => e.checked === true).map((e) => (
                  <div key={e.id} id={e.id} onClick={removeItem} className='badge light-blue'><span className='mr-10'>{e.value}</span><i className='icon-cross'></i></div>
                ))}
              </div>
          }

        </div>
        <div className='box-item-list'>
          <div className='box-item-search'>
            <div className='box-input-btn-search'>
              <Input placeholder='Search' onChange={handleInputChange} value={searchText} />
              <button className='btn-op-default btn-transparent'>
                <div onClick={() => { setSearchText('') }} className='icon-cross'></div>
              </button>
            </div>
          </div>

          {searchText === ''
            ?
            accountAssignmentList.length > 0 && (
              <>
                <div className='box-sc-list opn-scrollbar'>
                  {accountAssignmentList.map(v => (
                    <>
                      <Checkbox key={v.id} checked={v.checked ?? undefined} id={v.id} onChange={onChangeCheckbox} value={v.value} style={{ margin: '0.4em' }}>{v.value}</Checkbox>
                      <br />
                    </>
                  ))}
                </div>
              </>
            ) ||
            accountAssignmentList.length === 0 && (

              <>
                <div className="empty-items-list text-center">
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      src='/images/frontend/search_empty2x.png'
                      alt='Search Empty'
                      className='thumbnail-empty list-empty'
                      width={600}
                      height={600}
                    />
                  </div>
                  <div className="font-empty-list"> <strong>No Results Found</strong></div>
                  <div className="mt-5 font-sub-title color-sub">Try rephrasing your search or removing filters.</div>
                </div>
              </>
            )
            :
            filteredList.length > 0 && (
              <>
                <div className='box-sc-list opn-scrollbar'>
                  {filteredList.map(v => (
                    <>
                      <Checkbox key={v.id} checked={v.checked ?? undefined} id={v.id} onChange={onChangeCheckbox} value={v.value} style={{ margin: '0.4em' }}>{v.value}</Checkbox>
                      <br />
                    </>
                  ))}
                </div>
              </>
            )
            ||
            filteredList.length === 0 && (
              <>
                <div className="empty-items-list text-center">
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      src='/images/frontend/search_empty2x.png'
                      alt='Search Empty'
                      className='thumbnail-empty list-empty'
                      width={600}
                      height={600}
                    />
                  </div>
                  <div className="font-empty-list"> <strong>No Results Found</strong></div>
                  <div className="mt-5 font-sub-title color-sub">Try rephrasing your search or removing filters.</div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default AccountAssignment;