import React, { useState } from 'react'
import { Select, Space, Input, Checkbox, Button, Form, FormInstance } from 'antd';
import CreateRolePrRequester from './pr-requester';
import CreateRolePoEditor from './po-editor';
import CreateRolePoApprover from './po-approver';
import CreateRoleVetDrugReleasePR from './vet-drug-release-pr';
import CreateAccountReleasePr from './account-release-pr';
import MasterGroupApprover from './master-group-approver';

interface Props {
  setOpenCreateRole: Function;
}

const CreateRole: React.FC<Props> = ({ setOpenCreateRole }) => {

  const rowList = [
    { value: 'PR Requester', label: 'PR Requester' },
    { value: 'PR Approver', label: 'PR Approver' },
    { value: 'PO Editor', label: 'PO Editor' },
    { value: 'PO Approver', label: 'PO Approver'},
    { value: 'Vet Drug Release PR', label: 'Vet Drug Release PR' },
    { value: 'Account Release PR', label: 'Account Release PR' },
    { value: 'Master Group Approver', label: 'Master Group Approver' },
  ]

  const cancel = () => {
    setOpenCreateRole(false);
  }

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const save = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };

  const [role, setRole] = useState('');
  const handleRoleSelect = (value: string) => {
    setRole(value);
  }

  const onSave = (values: any) => {
    console.log(values);
  };
  
  const [form] = Form.useForm<FormInstance>();

  return (
    <>
      <Form form={form} onFinish={onSave}>
        <div className="full-popup-wrap">
          <div className="full-popup-head">
            <div className="full-popup-title pull-left">Create Role</div><a href="#" className="full-popup-close pull-right"><i onClick={cancel} className="icon-cross"></i></a>
            <div className="clearfix"></div>
          </div>
          <div className="full-popup-inner">
            <div className="section-title-border mt-10 mb-20"><strong>Role Information</strong></div>
            <div className="mb-20">
              <div className="box-row">
                <div className="column-6 column-sm-12">
                  <div className="form-group">
                    <label>Role</label>
                    <Space wrap>
                      {/* <Form.Item
                        name='role'
                        rules={[{ required: true, message: 'Please select role!' }]}
                      > */}
                        <Select
                          placeholder="Select Role"
                          style={{ width: '35em' }}
                          options={rowList}
                          onChange={handleRoleSelect}
                        >
                        </Select>
                      {/* </Form.Item> */}
                    </Space>
                    <div className="mt-10"> <span className="color-sub d-align-center"><i className="icon-info"></i>&nbsp;
                      Approval for this permit is necessary for this role.</span></div>
                  </div>
                </div>
              </div>
            </div>
            {role === 'PR Requester' && <CreateRolePrRequester form={form} />}
            {role === 'PO Editor' && <CreateRolePoEditor form={form}/>}
            {role === 'PO Approver' && <CreateRolePoApprover form={form}/>}
            {role === 'Vet Drug Release PR' && <CreateRoleVetDrugReleasePR form={form}/>}
            {role === 'Account Release PR' && <CreateAccountReleasePr form={form}/>}
            {role === 'Master Group Approver' && <MasterGroupApprover form={form}/>}
          </div>
          <div className="full-popup-bottom">
            <div className="d-flex">
              <div className="ml-auto">
              <Form.Item>
                <button type="button" className="btn-op-default mr-10" onClick={cancel}>Cancel</button>
                <Button
                  className="btn-op-primary"
                  type="primary"
                  htmlType="submit"
                  loading={loadings[1]}
                  // onClick={() => save(1)}
                  disabled={role === '' ? true : false}
                >
                  Save
                </Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

export default CreateRole;