import React, { useState, useEffect } from 'react';
import AccountAssignment from '@/src/components/role/subcomponents/AccountAssignment';
import { FormInstance, Form } from 'antd';

interface Props {
  form: FormInstance;
}

const CreateAccountReleasePr: React.FC<Props> = ({form}) => {
  return (
    <>
      <Form.Item name="accountAssignment">
        <AccountAssignment form={form}/>
      </Form.Item>
    </>
  )
}

export default CreateAccountReleasePr;