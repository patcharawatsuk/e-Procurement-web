import React, { useState, useEffect } from 'react';
import Plant from '@/src/components/role/subcomponents/Plant';
import { FormInstance, Form } from 'antd';

interface Props {
  form: FormInstance;
}

const CreateRoleVetDrugReleasePR: React.FC<Props> = ({form}) => {
  return (
    <>
      <Form.Item name="plant">
        <Plant form={form}/>
      </Form.Item>
    </>
  )
}

export default CreateRoleVetDrugReleasePR;