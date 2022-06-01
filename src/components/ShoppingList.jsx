import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Select, Checkbox } from 'antd';
import { MdOutlineEdit, MdDeleteOutline, MdLastPage, } from 'react-icons/md';
import { AiFillCaretDown } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux'
import { addNewItem, deleteExistingItem, editExistingItem, selectAllItems, fetchItems } from '../features/items/itemsSlice'
import styled, { css } from 'styled-components'

const { TextArea } = Input;
const { Option } = Select;
const DeleteModal = styled(Modal)`
    .ant-modal-footer{
        border-bottom: 0 none;
    }
    .ant-modal-header{
        background-color: white;
        border-bottom: 0 none;
        padding-bottom: 0px;
    }
`;

const ShoppingList = () => {

    console.count('counter')

    const [modalType, setModalType] = useState("add");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [selected, setSelected] = useState({});

    const [itemName, setItemName] = useState("");

    const [itemDescription, setItemDescription] = useState("");
    const [descriptionCount, setDescriptionCount] = React.useState(0);

    const [itemQuantity, setItemQuantity] = useState("1");
    const [itemPurchased, setItemPurchased] = useState(false);

    const dispatch = useDispatch()
    const itemsStatus = useSelector(state => state.items.status)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [deleteRequestStatus, setDeleteRequestStatus] = useState('idle')
    const [editRequestStatus, setEditRequestStatus] = useState('idle')

    const stateItems = useSelector(selectAllItems)
    const items = stateItems.slice().sort((a, b) => a.purchased === b.purchased ? 0 : a.purchased ? 1 : -1)

    useEffect(() => {
        if (itemsStatus === 'idle') {
            dispatch(fetchItems())
        }
    }, [itemsStatus, dispatch])


    const updateName = (e) => {
        setItemName(e.target.value)
    };

    const updateDescription = (e) => {
        setItemDescription(e.target.value)
    };

    const updateQuantity = (e) => {
        setItemQuantity(e)
    };

    const updatePurchased = (e) => {
        setItemPurchased(e.target.checked)
    };

    const showModal = (type, item) => {
        setModalType(type)

        setSelected(item)

        if (type === "edit") {
            setItemName(item.name)
            setItemDescription(item.description)
            setItemQuantity(item.quantity)
            setItemPurchased(item.purchased)
        }

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        clearItem();
    };

    const clearItem = () => {
        setItemName("")
        setItemDescription("")
        setItemQuantity("")
        setItemPurchased(false)
    };


    const addItem = async () => {

        try {
            setAddRequestStatus('pending')
            await dispatch(addNewItem({ name: itemName, description: itemDescription, quantity: itemQuantity, purchased: itemPurchased })).unwrap()
        } catch (err) {
            console.error("Failed to add item: ", err)
        } finally {
            setAddRequestStatus('idle')

        }
        setIsModalVisible(false);
        clearItem();
    };

    const deleteItem = async () => {
        try {
            setDeleteRequestStatus('pending')
            await dispatch(deleteExistingItem({ _id: selected._id })).unwrap()
        } catch (err) {
            console.error("Failed to delete item: ", err)
        } finally {
            setIsModalVisible(false);
        }
        setIsModalVisible(false);
        clearItem();
    };


    const editItem = async () => {
        try {
            setEditRequestStatus('pending')
            await dispatch(editExistingItem({ _id: selected._id, name: itemName, description: itemDescription, quantity: itemQuantity, purchased: itemPurchased })).unwrap()
        } catch (err) {
            console.error("Failed to edit item: ", err)
        } finally {
            setEditRequestStatus('idle')
        }
        setIsModalVisible(false);
        clearItem();
    };

    return (
        <>
            {modalType === "add" ?
                <Modal title={<div className="flex flex-row items-center "><div className="font-heading  font-bold">SHOPPING LIST</div><MdLastPage className=" ml-auto cursor-pointer" onClick={handleCancel} size={20} /></div>} visible={isModalVisible} destroyOnClose={true} width={400} onCancel={handleCancel} closable={false} className="relative"
                    footer={[
                        <Button key="back" type="text" onClick={handleCancel} className="text-black font-bold">
                            Cancel
                        </Button>,
                        <Button key="submit" type="text" onClick={addItem} className="text-white bg-vivid-blue rounded">
                            Add Item
                            </Button>
                    ]}>
                    <div className="absolute top-0 left-0">
                    </div>
                    <div className="flex flex-col mb-[150px]">
                        <div className="text-lg">Add an Item</div>
                        <div className="text-md text-[#5C6269]">Add your new item below</div>
                        <Input placeholder="Item Name" onChange={updateName} className="mt-md" />
                        <TextArea placeholder="Description" rows={4} maxLength={100} showCount="true" onChange={updateDescription} className="mt-md" />
                        <Select suffixIcon={<AiFillCaretDown />} placeholder="How many?" onChange={updateQuantity} className="mt-md border rounded-sm" bordered={false} >
                            {["1", "2", "3", "4", "5"].map((option) =>
                                <Option key={option} value={option}>{option}</Option>
                            )}
                        </Select>
                    </div>
                </Modal>

                : modalType === "edit" ?

                    <Modal title={<div className="flex flex-row items-center"><div className="font-heading font-bold">SHOPPING LIST</div><MdLastPage className=" ml-auto cursor-pointer" onClick={handleCancel} size={20} /></div>} visible={isModalVisible} destroyOnClose={true} width={400} onCancel={handleCancel} closable={false}
                        footer={[
                            <Button key="back" type="text" onClick={handleCancel} className="text-black font-bold">
                                Cancel
                             </Button>,
                            <Button key="submit" type="text" onClick={editItem} className="text-white bg-vivid-blue rounded">
                                Save Item
                            </Button>
                        ]}>
                        <div className="flex flex-col mb-[150px]">
                            <div className="text-lg">Edit an Item</div>
                            <div className="text-md text-[#5C6269]">Edit your item below</div>
                            <Input placeholder={itemName} onChange={updateName} className="mt-md py-md" />
                            <TextArea placeholder={itemDescription} rows={4} maxLength={100} showCount="true" onChange={updateDescription} className="mt-md " />
                            <Select suffixIcon={<AiFillCaretDown />} placeholder={itemQuantity} onChange={updateQuantity} className="mt-md border rounded-sm py-[6px]" bordered={false} >
                                {["1", "2", "3", "4", "5"].map((option) =>
                                    <Option key={option} value={option}>{option}</Option>
                                )}
                            </Select>
                            <Checkbox checked={itemPurchased} onChange={updatePurchased} className="mt-md"><div className="text-[#9CA8B4]">Purchased</div></Checkbox>
                        </div>
                    </Modal>

                    :
                    <DeleteModal title={<div className="font-bold text-black">Delete Item?</div>} visible={isModalVisible} destroyOnClose={true} width={400} onCancel={handleCancel} closable={false} bodyStyle={{ "paddingTop": "10px" }}
                        footer={[
                            <Button key="back" type="text" onClick={handleCancel} className="text-black font-bold ">
                                Cancel
                             </Button>,
                            <Button key="submit" type="text" onClick={deleteItem} className="text-white bg-vivid-blue rounded">
                                Delete
                             </Button>
                        ]}>
                        <div className="text-[#5C6269] mb-xl">
                            Are you sure you want to delete this item? This can not be undone.
                        </div>
                    </DeleteModal>
            }


            {items.length === 0
                ?
                <div className="flex flex-col h-[300px] w-1/2 border-2 border-gray rounded ml-auto mr-auto m-lg items-center justify-center">
                    <div className="text-gray-500">Your shopping list is empty :(</div>
                    <button className="bg-vivid-blue rounded text-white m-md px-md py-sm"
                        onClick={() => showModal("add")}>Add your first item</button>
                </div>
                :
                <div className="w-[80%] mt-xxl ml-auto mr-auto">
                    <div className="flex items-center">
                        <div className="text-xl"><strong>Your Items</strong></div>
                        <button className="bg-vivid-blue rounded text-white px-md py-sm ml-auto"
                            onClick={() => showModal("add")}>Add item</button>
                    </div>
                    <div className="flex flex-col">
                        <ul>
                            {items.map((item) =>
                                <li key={item._id} className={"flex flex-row border border-gray rounded-md p-lg my-md items-center " + (item.purchased ? "bg-[#F8FAFC]" : "")}>
                                    <Checkbox checked={item.purchased}></Checkbox>
                                    <div className="flex flex-col ml-md ">
                                        <div className={"mr-auto " + (item.purchased ? "line-through text-muted-blue" : "font-bold")}>{item.name}</div>
                                        <div className={"text-[#7D7A7A] " + (item.purchased ? "mr-auto line-through" : "mr-auto")}>{item.description}</div>
                                    </div>
                                    <div className="flex flex-row ml-auto text-[#555F7C]" >
                                        <MdOutlineEdit className="cursor-pointer" onClick={() => { showModal("edit", item); }} size={30} />
                                        <MdDeleteOutline className="cursor-pointer ml-xl" onClick={() => { showModal("delete", item); }} size={30} />
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
