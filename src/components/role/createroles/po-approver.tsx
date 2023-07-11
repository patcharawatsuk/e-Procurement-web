import React, { useState, useEffect } from 'react';
import ParentPurchasingGroup from '@/src/components/role/subcomponents/ParentPurchasingGroup';
import { FormInstance, Form } from 'antd';

interface Props {
  form: FormInstance;
}

const CreateRolePoApprover: React.FC<Props> = ({form}) => {
  return (
    <>
      <Form.Item name="parentPurchasingGroup">
        <ParentPurchasingGroup form={form}/>
      </Form.Item>
    </>
  )
}

export default CreateRolePoApprover;