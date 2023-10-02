import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import Layout from '../../layout/Layout';

const PasswordUpdatePage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const handlePasswordUpdate = async (values) => {
        try {
            await dispatch(updatePassword(values.currentPassword, values.newPassword));

        } catch (error) {
            // Handle any error that occurred during the password update
            console.error('Error updating password:', error);
            message.error('An error occurred. Please try again.');
            console.log('currentPassword', values.currentPassword)
        }
    };

    return (
        <Layout>

            <div>
                <div style={{ marginTop: '50px', marginLeft: '220px', cursor: "pointer" }} className='home-from' onClick={() => navigate('/account-details')}>
                    <BsArrowLeft style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Change Password</h2>
                    {/* Password update form */}
                    <Form form={form} onFinish={handlePasswordUpdate}>
                        <Form.Item
                            name="currentPassword"
                            label="Current Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your current password',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a new password',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default PasswordUpdatePage;