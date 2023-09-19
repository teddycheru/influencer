import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../redux/actions/userActions';

const PasswordUpdatePage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
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
        <div>
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
    );
};

export default PasswordUpdatePage;