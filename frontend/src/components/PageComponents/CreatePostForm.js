import React, { useEffect, useState } from 'react'
import { Form, Upload, Input, Button, Select, Checkbox, Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BsArrowLeft } from 'react-icons/bs'
import { FaAsterisk } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { createPost } from '../../redux/actions/postsAction'
import { countryDetailFn } from '../../redux/actions/countryAction'

const CreatePostForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [form] = Form.useForm()

  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [checked, setChecked] = useState(null)
  const [postTitle, setPostTitle] = useState('')
  const [postDesc, setPostDesc] = useState('')
  const [linkState, setLinkState] = useState('')
  const [typeCheck, setTypeCheck] = useState(null)
  const [typeCash, setTypeCash] = useState(false)
  const [typeReward, setTypeReward] = useState(false)
  const [commissionValueState, setCommissionValueState] = useState('')
  const [countryList, setCountryList] = useState([])
  const [updatedCountries, setUpdatedCountries] = useState([])
  const [isoState, setIsoState] = useState()
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [priceInput, setPriceInput] = useState('')
  const [freeState, setFreeState] = useState(false)
  const [tagsArr, setTagsArr] = useState([])
  // const [demoTagsArr, setDemoTagsArr] = useState([])
  const [tagsSearchValue, setTagsSearchValue] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')

  useEffect(() => {
    if (countryList.length > 0) {
      let tempCountries = [{ id: 'global', iso2: 'global', name: 'Global' }, ...countryList]
      setUpdatedCountries(tempCountries)
    }
  }, [countryList])

  useEffect(() => console.log(tagsArr), [tagsArr])

  const formData = new FormData()

  const uploadHandleChange = ({ fileList: newFileList, file }) => {
    console.log(newFileList)
    if (file.status === 'removed') {
      setFileList([])
    } else {
      setFileList([
        {
          ...file,
          status: 'done',
        },
      ])
    }
  }

  useEffect(() => {
    ; (async () => {
      await countryDetailFn(setCountryList)
    })()
  }, [])

  const onFinish = async (values) => {
    setLoading(true)
    let data = {}
    // console.log('values', values)
    // console.log(checked)
    if (fileList.length > 0) {
      formData.append('pictures', values.image.file.originFileObj)
      formData.append('title', values.title)
      formData.append('description', values.description)
      formData.append('tags', JSON.stringify(tagsArr))
      formData.append('category', JSON.stringify(values.category))
      formData.append('plan', JSON.stringify(new Date(values.plan)))
      if (values.country) {
        formData.append('country', selectedCountry)
        formData.append('countryCode', isoState)
      }
      formData.append('price', freeState ? 0 : values.price)
      formData.append(
        'comission',
        typeCash && !typeReward
          ? JSON.stringify(['cash'])
          : !typeCash && typeReward
            ? JSON.stringify(['reward'])
            : JSON.stringify(['cash', 'reward']),
      )
      // formData.append('comission', values.comission || 'cash')
      if (values.comissionAmount) {
        formData.append('comissionValue', values.comissionAmount ? values.comissionAmount : null)
      }
      formData.append('link', values.link)
      formData.append('purchaseFirst', checked == 'yes' ? true : false)
      formData.append('type', typeCheck !== null ? typeCheck : 'digital')
      dispatch(createPost({ data: formData, navigate }))
    } else {
      data = {
        title: values.title,
        description: values.description,
        tags: JSON.stringify(tagsArr),
        category: JSON.stringify(values.category),
        plan: JSON.stringify(new Date(values.plan)),
        country: selectedCountry,
        countryCode: isoState,
        price: freeState ? 0 : values.price,
        comission:
          typeCash && !typeReward
            ? JSON.stringify(['cash'])
            : !typeCash && typeReward
              ? JSON.stringify(['reward'])
              : JSON.stringify(['cash', 'reward']),
        // comission: values.comission || ['cash'],
        comissionValue: values.comissionAmount ? values.comissionAmount : null,
        link: values.link,
        // purchaseFirst: values.purchaseFirst,
        purchaseFirst: checked == 'yes' ? true : false,
        type: typeCheck !== null ? typeCheck : 'digital',
      }
      // console.log(data)
      dispatch(createPost({ data: data, navigate }))
    }
    setLoading(false)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <div className='post-form-container'>
      <div className='back-to-home' onClick={() => navigate('/home')}>
        <BsArrowLeft />
      </div>
      <Form name='post' className='post-form' layout='vertical' onFinish={onFinish}>
        <div className='heading-container'>
          <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', }}>
            <h2>Enlist a Program</h2>
            <p style={{ width: '600px', textAlign: 'center' }}>You may enlist multiple programs if you have different types of offers or items within your business. But beware that intentionally abusing our service will lead to an IP ban. Please follow our terms and conditions.
            </p>
          </div>
        </div>

        <div className='form-item-container-one'>
          <Form.Item name='image' label='Image'>
            <Upload
              customRequest={() => { }}
              listType='picture-circle'
              fileList={fileList}
              onChange={uploadHandleChange}
            >
              {fileList?.length > 0 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name='title'
            rules={[
              {
                // required: true,
                message: 'Enter Title',
              },
              {
                max: 40,
                message: 'Title cannot be over 40 characters.',
              },
            ]}
            label={
              <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
                <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
                Title
              </div>
            }
            style={{ width: '100%' }}
          >
            <Input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              style={{ width: '100%' }}
              placeholder='Name of the product or service'
            />
          </Form.Item>
        </div>

        <Form.Item
          name='description'
          rules={[
            {
              // required: true,
              message: 'Enter Description',
            },
          ]}
          label={
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
              Description
            </div>
          }
        >
          <Input.TextArea
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
            className='custom-text-area'
            placeholder='Briefly describe it first and explain how your affiliate/referral process may work.'
          />
        </Form.Item>

        <Form.Item label='Tags'>
          <Select
            // value={demoTagsArr}
            value={tagsArr}
            // defaultValue={tagsArr}
            searchValue={tagsSearchValue}
            mode='tags'
            allowClear
            ma
            style={{
              width: '100%',
            }}
            placeholder='Enter up to 3 keywords'
            options={[]}
            onSearch={(e) => setTagsSearchValue(e)}
            onDeselect={(e) => {
              let tempArr = tagsArr.filter((item) => item !== e)
              setTagsArr(tempArr)
            }}
            onInputKeyDown={(e) => {
              if (e.keyCode == 13 || e.keyCode == 32) {
                if (tagsArr.length > 2) {
                  tagsArr.splice(2, 1, e.target.value)
                  setTagsArr([...tagsArr])
                } else {
                  setTagsArr([...tagsArr, e.target.value])
                }
                setTagsSearchValue('')
              }
            }}
          // onChange={(e) => {
          //   console.log('e', e)
          //   if (e.length > 2) {
          //     tagsArr.splice(2, 1, e[e.length - 1])
          //     setTagsArr([...tagsArr])
          //   } else {
          //     setTagsArr(e)
          //   }
          // }}
          ></Select>
        </Form.Item>

        <Form.Item
          name='category'
          label={
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
              Category
            </div>
          }
        >
          <Select
            mode='multiple'
            allowClear
            style={{
              width: '100%',
            }}
            placeholder='Select up to 2 categories'
            onChange={(e) => setSelectedCategories(e)}
            options={[
              {
                value: 'Adult',
                label: 'Adult',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'AI',
                label: 'AI',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Automotive',
                label: 'Automotive',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Books',
                label: 'Books',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Course',
                label: 'Course',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Electronics',
                label: 'Electronics',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Entertainment',
                label: 'Entertainment',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Fashion & Beauty',
                label: 'Fashion & Beauty',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Financial',
                label: 'Financial',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Health',
                label: 'Health',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Insurance',
                label: 'Insurance',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Kids',
                label: 'Kids',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: `Men's`,
                label: `Men's`,
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Miscellaneous',
                label: 'Miscellaneous',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Productivity',
                label: 'Productivity',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Security',
                label: 'Security',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Software',
                label: 'Software',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Sports',
                label: 'Sports',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Tools & Accessories',
                label: 'Tools & Accessories',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Travel',
                label: 'Travel',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: 'Video Games',
                label: 'Video Games',
                disabled: selectedCategories.length > 1 ? true : false,
              },
              {
                value: `Women's`,
                label: `Women's`,
                disabled: selectedCategories.length > 1 ? true : false,
              },
            ]}
          ></Select>
        </Form.Item>

        <Form.Item
          name='country'
          label='Country'
          tooltip='Choose a country if the consumer base is heavily targeted within that country. Otherwise, leave it to default.'
        >
          <Select
            defaultValue={'global'}
            allowClear
            style={{
              width: '100%',
            }}
            placeholder='Select Country '
            onSelect={(e, key) => {
              setIsoState(e)
              setSelectedCountry(key?.children)
            }}
          >
            {/* {countryList?.map((country) => ( */}
            {updatedCountries?.map((country) => (
              <Select.Option key={JSON.stringify(country)} value={country?.iso2}>
                {country?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className='form-item-container'>
          <Form.Item
            name='price'
            label={
              <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
                <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
                Price
              </div>
            }
            rules={[
              {
                // required: true,
                // validator: (_, values) => {
                //   console.log(_, values)
                //   if (!freeState && priceInput?.length == 0) {
                //     return Promise.reject(new Error('Either enter amount or select free'))
                //   }
                // },
              },
            ]}
          >
            <Input
              // placeholder='Remeber If no value is enter, it will be consider free'
              // placeholder='$'
              value={priceInput}
              disabled={freeState}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              onChange={(e) => setPriceInput(e.target.value)}
              suffix={<>$</>}
            />
          </Form.Item>

          <Form.Item
            name='free'
            valuePropName='checked'
            className='free-price-check'
            style={{ alignSelf: 'center', marginBottom: 0 }}
          >
            <Checkbox
              disabled={priceInput?.length > 0 ? true : false}
              onChange={(e) => setFreeState(e.target.checked)}
            >
              Free
            </Checkbox>
          </Form.Item>
        </div>

        {/* <Form.Item name='comission' label='Commission' valuePropName='checked'> */}
        <Form.Item
          rules={[
            {
              // required: true,
              // validator: async (_, check) => {
              //   console.log(_, check)
              //   if (!typeCash && !typeReward) {
              //     return Promise.reject(new Error('Select either yes or no'))
              //   }
              // },
            },
          ]}
          name='comission'
          label={
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
              Commission
            </div>
          }
          tooltip={`Select the Reward option if the influencer doesn't get any cash commission. Or select both if both are included in the commission.`}
        // rules={[
        //   {
        //     required: true,
        //     type:'boolean',
        //     message: 'Select Commission Type',
        //   },
        // ]}
        >
          <Checkbox onChange={(e) => setTypeCash(e.target.checked)}>Cash</Checkbox>
          <Checkbox onChange={(e) => setTypeReward(e.target.checked)}>Reward</Checkbox>
          {/* <Select
            defaultValue={'cash'}
            style={{
              width: '100%',
            }}
          >
            <Select.Option value={'cash'}>Cash</Select.Option>
            <Select.Option value={'reward'}>Reward</Select.Option>
          </Select> */}
        </Form.Item>

        {typeCash && (
          <Form.Item
            name='comissionAmount'
            label={
              <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
                <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
                Commission Amount
              </div>
            }
            rules={[
              {
                // required: typeCash,
                message: 'Enter Cash Amount',
              },
            ]}
          >
            <Input
              style={{ maxWidth: '200px' }}
              value={commissionValueState}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault()
                }
              }}
              onChange={(e) => setCommissionValueState(e.target.value)}
              suffix={<>$</>}
            />
          </Form.Item>
        )}

        <Form.Item
          rules={[
            {
              // required: true,
              // validator: async (_, checked) => {
              //   console.log(_, checked)
              //   if (!typeCheck) {
              //     return Promise.reject(
              //       new Error('you must accept to deposit 10% of the sale price'),
              //     )
              //   }
              // },
            },
          ]}
          name='type'
          label={
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
              Type
            </div>
          }
          valuePropName='checked'
          tooltip={`Select if it's consumed virtually or physically.`}
        >
          <Checkbox
            checked={typeCheck == 'digital' ? true : false}
            onChange={() => {
              if (typeCheck == null || typeCheck == 'physical') {
                setTypeCheck('digital')
              } else {
                setTypeCheck(null)
              }
            }}
          >
            Digital
          </Checkbox>
          <Checkbox
            checked={typeCheck == 'physical' ? true : false}
            onChange={() => {
              if (typeCheck == null || typeCheck == 'digital') {
                setTypeCheck('physical')
              } else {
                setTypeCheck(null)
              }
            }}
          >
            Physical
          </Checkbox>
          {/* <Select
            defaultValue={'digital'}
            style={{
              width: '100%',
            }}
          >
            <Select.Option value={'digital'}>Digital</Select.Option>
            <Select.Option value={'physical'}>Physical</Select.Option>
          </Select> */}
        </Form.Item>
        <Form.Item
          rules={[
            {
              // required: true,
            },
          ]}
          name='link'
          label={
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
              Link
            </div>
          }
          tooltip={`Enter the direct link to your affiliate/referral program. Please do not use any link shortener.`}
        >
          <Input
            value={linkState}
            onChange={(e) => setLinkState(e.target.value)}
            placeholder='Direct Link to the Program'
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              // required: true,
              // validator: async (_, check) => {
              //   console.log(_, check)
              //   if (!checked) {
              //     return Promise.reject(new Error('Select either yes or no'))
              //   }
              // },
            },
          ]}
          name='purchaseFirst'
          valuePropName='checked'
          label={
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
              Does someone need to purchase it first to refer it?
            </div>
          }
        >
          <Checkbox
            checked={checked == 'yes' ? true : false}
            onChange={() => {
              if (checked == null || checked == 'no') {
                setChecked('yes')
              } else {
                setChecked(null)
              }
            }}
          >
            Yes
          </Checkbox>
          <Checkbox
            checked={checked == 'no' ? true : false}
            onChange={() => {
              if (checked == null || checked == 'yes') {
                setChecked('no')
              } else {
                setChecked(null)
              }
            }}
          >
            No
          </Checkbox>
        </Form.Item>
        <Form.Item
          name='plan'
          label={
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
              <FaAsterisk style={{ width: '5px', height: '5px', fill: 'red' }} />
              How long do you want this post to actively show up on our feed?
            </div>
          }
          tooltip={`After the selected period, the post will expire. This means people won't find it here anymore, as it will be deleted from our site. You can always come back and enlist it again.`}
        >
          <Radio.Group
            onChange={(e) => setSelectedPlan(e.target.value)}
            value={selectedPlan}
          >
            <Radio style={{ border: '1px solid #d9d9d9', borderRadius: '20px', padding: '8px' }} value={moment(new Date().setDate(new Date().getDate() + 7)).format('MMMM DD, YYYY')} >
              7 Days/Free
            </Radio>
            <Radio style={{ border: '1px solid #d9d9d9', borderRadius: '20px', padding: '8px' }} value={moment(new Date().setMonth(new Date().getMonth() + 1)).format('MMMM DD, YYYY')} >
              1 Month/Free
            </Radio>
            <Radio style={{ border: '1px solid #d9d9d9', borderRadius: '20px', padding: '8px' }} value={moment(new Date().setMonth(new Date().getMonth() + 3)).format('MMMM DD, YYYY')} >
              3 Months/$9.33
            </Radio>
            <Radio style={{ border: '1px solid #d9d9d9', borderRadius: '20px', padding: '8px' }} value={moment(new Date().setMonth(new Date().getMonth() + 6)).format('MMMM DD, YYYY')} >
              6 Months/$16.66
            </Radio>
            <Radio style={{ border: '1px solid #d9d9d9', borderRadius: '20px', padding: '8px' }} value={moment(new Date().setMonth(new Date().getMonth() + 12)).format('MMMM DD, YYYY')} >
              1 Year/$24
            </Radio>
            <Radio style={{ border: '1px solid #d9d9d9', borderRadius: '20px', padding: '8px' }} value={moment(new Date().setMonth(new Date().getMonth() + 24)).format('MMMM DD, YYYY')} >
              2 Years/$38
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type='primary'
            htmlType='submit'
            disabled={
              postTitle.length !== 0 &&
                postDesc.length !== 0 &&
                checked !== null &&
                selectedCategories.length !== 0 &&
                (priceInput.length !== 0 || freeState !== false) &&
                linkState.length !== 0 &&
                typeCheck !== null &&
                (typeReward || (typeCash && commissionValueState.length !== 0 ? true : false)) &&
                selectedPlan !== "" ? false : true
            }
          >
            {selectedPlan !== null && (
              moment(new Date().setDate(new Date().getDate() + 7)).format('MMMM DD, YYYY') === selectedPlan ||
                moment(new Date().setMonth(new Date().getMonth() + 1)).format('MMMM DD, YYYY') === selectedPlan
                ? 'Enlist'
                : selectedPlan === moment(new Date().setMonth(new Date().getMonth() + 3)).format('MMMM DD, YYYY')
                  ? 'Enlist for $9.33'
                  : selectedPlan === moment(new Date().setMonth(new Date().getMonth() + 6)).format('MMMM DD, YYYY')
                    ? 'Enlist for $16.66'
                    : selectedPlan === moment(new Date().setFullYear(new Date().getFullYear() + 1)).format('MMMM DD, YYYY')
                      ? 'Enlist for $24'
                      : selectedPlan === moment(new Date().setFullYear(new Date().getFullYear() + 2)).format('MMMM DD, YYYY')
                        ? 'Enlist for $38'
                        : 'Enlist'
            )}
          </Button>
        </Form.Item>
        <div className='warning'>
          You cannot edit anything after enlisting. Please review everything beforehand.
        </div>
      </Form>
    </div >
  )
}

export default CreatePostForm
