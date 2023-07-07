import React, { useState, useEffect } from 'react';
import Plant from '@/components/role/subcomponents/Plant';
import { FormInstance, Form } from 'antd';

interface Props {
  form: FormInstance;
}

const CreateRolePrRequester: React.FC<Props> = ({form}) => {
  return (
    <>
    <Form.Item name="plant">
      <Plant form={form}/>
    </Form.Item>
    </>
  )
}

export default CreateRolePrRequester;