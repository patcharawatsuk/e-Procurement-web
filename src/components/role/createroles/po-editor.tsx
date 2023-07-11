import React, { useState, useEffect } from 'react'
import Plant from '@/src/components/role/subcomponents/Plant';
import PurchasingGroup from '@/src/components/role/subcomponents/PurchasingGroup';
import ParentPurchasingGroup from '@/src/components/role/subcomponents/ParentPurchasingGroup';
import { FormInstance, Form } from 'antd';

interface Props {
  form: FormInstance;
}


const CreateRolePoEditor: React.FC<Props> = ({form}) => {
  return (
    <>
      <Form.Item name="parentPurchasingGroup">
        <ParentPurchasingGroup form={form}/>
      </Form.Item>
      <Form.Item name="purchasingGroup">
        <PurchasingGroup form={form}/>
      </Form.Item>
      <Form.Item name="plant">
        <Plant form={form}/>
      </Form.Item>
    </>
  )
}

export default CreateRolePoEditor;