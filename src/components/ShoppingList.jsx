import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Select, Checkbox } from 'antd';
import { MdOutlineEdit, MdDeleteOutline, MdEdit } from 'react-icons/md';
const { TextArea } = Input;
const { Option } = Select;




const ShoppingList = () => {

    let mockData = [
        {
            "id": 0,
            "name": "Tomatoes",
            "description": "Green cherry tomatoes",
            "quantity": "3",
            "purchased": false
        }, {
            "id": 1,
            "name": "Tomatoes",
            "description": "Green cherry tomatoes",
            "quantity": "3",
            "purchased": true
        }, {
            "id": 2,
            "name": "Tomatoes",
            "description": "Green cherry tomatoes",
            "quantity": "3",
            "purchased": false
        }]

    const [items, setItems] = useState(mockData);
    const [modalType, setModalType] = useState("add");


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selected, setSelected] = useState({});

    const showModal = (type) => {
        setModalType(type)
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const addItem = () => {
        setIsModalVisible(false);
    };

    const editItem = () => {
        setIsModalVisible(false);
    };

    const deleteItem = () => {
        setItems(items.filter(el => el.id !== selected.id))
        setIsModalVisible(false);
    };

    return (
        <>

            {modalType === "add" ?
                <Modal title="Add an Item" visible={isModalVisible} destroyOnClose="true"
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                </Button>,
                        <Button key="submit" type="primary" onClick={addItem} className="text-black hover:bg-vivid-blue">
                            Add Item
                </Button>
                    ]}>
                    <div className="flex flex-col space-y-lg">
                        <h1>Add your new item below</h1>
                        <Input placeholder="Item Name" />
                        <TextArea rows={4} placeholder="Description" maxLength={100} showCount="true" />
                        <Select placeholder="How many?">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </div>
                </Modal>

                : modalType === "edit" ?

                    <Modal title="Edit an Item" visible={isModalVisible} destroyOnClose="true"
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                </Button>,
                            <Button key="submit" type="primary" onClick={editItem} className="text-black hover:bg-vivid-blue">
                                Save Item
                </Button>
                        ]}>
                        <div className="flex flex-col space-y-lg">
                            <h1>Edit your item below</h1>
                            <Input placeholder={selected.name} />
                            <TextArea rows={4} placeholder={selected.description} maxLength={100} showCount="true" />
                            <Select placeholder={selected.quantity}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                            <Checkbox selected={selected.purchased}>Purchased</Checkbox>
                        </div>
                    </Modal>

                    :

                    <Modal title="Delete Item?" visible={isModalVisible} destroyOnClose="true"
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                </Button>,
                            <Button key="submit" type="primary" onClick={deleteItem} className="text-black hover:bg-vivid-blue">
                                Delete
                </Button>
                        ]}>
                        <div className="flex flex-col space-y-lg">
                            <h1>Are you sure you want to delete this item? This can not be undone.</h1>                            
                        </div>
                    </Modal>

            }


            {items.length === 0
                ?
                <div className="flex flex-col h-[300px] w-1/2 border-2 border-black rounded ml-auto mr-auto m-lg items-center justify-center">

                    Your shopping list is empty :(
                        <button className="bg-vivid-blue rounded text-white m-md px-md py-sm"
                        onClick={() => showModal("add")}>Add your first item</button>
                </div>
                :
                <div className="w-[80%] mt-xl ml-auto mr-auto">
                    <div className="flex items-center">
                        <h1><strong>Your Items</strong></h1>
                        <button className="bg-vivid-blue rounded text-white px-md py-sm ml-auto"
                            onClick={() => showModal("add")}>Add item</button>
                    </div>
                    <div className="flex flex-col">
                        <ul>
                            {items.map((item) =>
                                <li className="flex flex-row border-2 border-black p-md my-md items-center">
                                    <Checkbox checked={item.purchased}></Checkbox>
                                    <div className="flex flex-col ml-md ">
                                        <strong className="mr-auto">{item.name}</strong>
                                        <body className="mr-auto">{item.description}</body>
                                    </div>
                                    <div className="flex flex-row ml-auto" >
                                        <MdOutlineEdit className="cursor-pointer" onClick={() => {showModal("edit"); setSelected(item)}} size={30} />
                                        <MdDeleteOutline className="cursor-pointer ml-xl" onClick={() => {showModal("delete"); setSelected(item)}} size={30} />
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            }

        </>
    );
};

export default ShoppingList
