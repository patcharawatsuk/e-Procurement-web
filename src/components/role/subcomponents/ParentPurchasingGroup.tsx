import React, { useState, useEffect } from 'react';
import { ParentPurchasingGroup, getParentPurchasingGroup, SubParentType } from '@api/parentPurchasingGroup';
import { setLoading } from '@store/loadingSlice';
import { useDispatch } from 'react-redux';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Checkbox, FormInstance, Form } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface Props {
  form: FormInstance;
}

const ParentPurchasingGroup: React.FC<Props> = ({form}) => {
  const dispatch = useDispatch();
  const [parentPurchasingGroup, setParentPurchasingGroup] = useState<ParentPurchasingGroup[]>([]);
  const fetchData = async () => {
    dispatch(setLoading(true));
    await getParentPurchasingGroup().then((res: ParentPurchasingGroup[]) => {
      setParentPurchasingGroup(res)
    })
    dispatch(setLoading(false));
  }

  const [value, setValue] = useState<string>('');

  const onChangeRadio = (e: RadioChangeEvent) => {
    const id = e.target.id;
    const value = e.target.value;
    setValue(value);

    const updateValue = parentPurchasingGroup.map((e) => {
      const subParents = e.value.subParents;
      const updateSubParent: SubParentType[] = subParents.map((sub) => {
        const ele_checked = sub.checked;
        return {
          ...sub,
          checked: e.id !== id ? false : ele_checked
        };
      });

      return {
        ...e,
        value: {
          parent: e.id,
          subParents: updateSubParent
        }
      };
    });

    setThisForm(updateValue, id)
  };

  const setThisForm = (updateValue: ParentPurchasingGroup[], id: string | undefined) => {
    setParentPurchasingGroup(updateValue);
    let radioSelected = updateValue.filter((e) => e.id === id)[0];
    radioSelected = {
      ...radioSelected,
      value: {
        ...radioSelected.value,
        subParents: radioSelected.value.subParents.filter((s) => s.checked === true)
      }
    };
    form.setFieldsValue({...form.getFieldsValue(), 'parentPurchasingGroup': radioSelected});
  }

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    const id = e.target.id ?? '';
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) setValue(id);
    const updateValue = parentPurchasingGroup.map((e) => {
      const subParents = e.value.subParents;
      const updateSubParent: SubParentType[] = subParents.map((sub) => {
        const ele_checked = sub.checked;
        return {
          ...sub,
          checked: e.id === id && sub.subParentName === value ? checked : ele_checked
        };
      });

      return {
        ...e,
        value: {
          parent: e.id,
          subParents: updateSubParent
        }
      };
    });
    setThisForm(updateValue, id);
  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Component exited');
    };
  }, []);

  useEffect(() => {
    if (parentPurchasingGroup.length === 1) {
      setValue(parentPurchasingGroup[0].value.parent);
      if (parentPurchasingGroup[0].value.subParents.length <= 1) {
        form.setFieldsValue({...form.getFieldsValue(), 'parentPurchasingGroup': parentPurchasingGroup});
      }
    }
  }, [parentPurchasingGroup]);
  

  return (
    <>
    <div className='section-title-border mt-10 mb-20'><strong>Parent Purchasing Group</strong></div>
    <div className="mb-10">
      <div> 
        {parentPurchasingGroup.length > 0 && (
          <Radio.Group disabled={parentPurchasingGroup.length === 1 ? true : false} onChange={onChangeRadio} value={value}>
          <Space direction="vertical">
          {parentPurchasingGroup.map((item: ParentPurchasingGroup) => {
            let fixCheckbox: boolean | undefined;
            if (parentPurchasingGroup.length === 1 && parentPurchasingGroup[0].value.subParents.length === 1) fixCheckbox = true;
            const parent = <Radio id={item.id} value={item.value.parent}>{item.value.parent}</Radio>;
            const subParent = item.value.subParents.map((e) => {
              return (
                <> 
                  <Checkbox disabled={fixCheckbox} checked={fixCheckbox !== undefined ? fixCheckbox : e.checked} onChange={onChangeCheckbox} id={item.id} value={e.subParentName} style={{ marginLeft: '1.8em' }}>{e.subParentName}</Checkbox>)
                </>
              )
            })
            return (
              <>
                {parent}
                {subParent.length > 0 ? subParent : <></>}
              </>
            )
          })}
          </Space>
        </Radio.Group>
        )} 
      </div>
    </div>
    </>
  )
}

export default ParentPurchasingGroup;