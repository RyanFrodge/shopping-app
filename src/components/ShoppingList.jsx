import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Select, Checkbox } from 'antd';
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux'
import { addNewItem, deleteExistingItem, editExistingItem, selectAllItems, fetchItems } from '../features/items/itemsSlice'
const { TextArea } = Input;
const { Option } = Select;


const ShoppingList = () => {

    const [modalType, setModalType] = useState("add");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [selected, setSelected] = useState({});

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemQuantity, setItemQuantity] = useState("1");
    const [itemPurchased, setItemPurchased] = useState(false);

    const dispatch = useDispatch()
    const itemsStatus = useSelector(state => state.items.status)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [deleteRequestStatus, setDeleteRequestStatus] = useState('idle')
    const [editRequestStatus, setEditRequestStatus] = useState('idle')

    const stateItems = useSelector(selectAllItems)
    const items = stateItems.slice().sort((a, b) => a.purchased === b.purchased ? 0 : a.purchased ? 1 : -1)
    console.log(items)

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
                <Modal title="SHOPPING LIST" visible={isModalVisible} destroyOnClose="true" width={400}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                </Button>,
                        <Button key="submit" type="primary" onClick={addItem} className="text-white bg-vivid-blue">
                            Add Item
                </Button>
                    ]}>
                    <div className="flex flex-col mb-[150px]">
                        <div className="text-lg">Add an item</div>
                        <div className="text-md">Add your new item below</div>
                        <Input placeholder="Item Name" value={itemName} onChange={updateName} className="mt-md" />
                        <TextArea placeholder="Description" rows={4} maxLength={100} showCount="true" value={itemDescription} onChange={updateDescription} className="mt-md" />
                        <Select placeholder="How many?" onChange={updateQuantity} className="mt-md">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </div>
                </Modal>

                : modalType === "edit" ?

                    <Modal title="SHOPPING LIST" visible={isModalVisible} destroyOnClose="true" width={400}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                </Button>,
                            <Button key="submit" type="primary" onClick={editItem} className="text-white bg-vivid-blue">
                                Save Item
                </Button>
                        ]}>
                        <div className="flex flex-col mb-[150px]">
                            <div className="text-lg">Edit an item</div>
                            <div className="text-md">Edit your item below</div>
                            <Input placeholder={itemName} onChange={updateName} className="mt-md" />
                            <TextArea rows={4} maxLength={100} showCount="true" placeholder={itemDescription} onChange={updateDescription} className="mt-md" />
                            <Select placeholder={itemQuantity} onChange={updateQuantity} className="mt-md">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                            <Checkbox checked={itemPurchased} onChange={updatePurchased} className="mt-md"><div className="text-[#9CA8B4]">Purchased</div></Checkbox>
                        </div>
                    </Modal>

                    :

                    <Modal title="Delete Item?" visible={isModalVisible} destroyOnClose="true" closable="true" width={400}
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
                                <li key={item.id} className={item.purchased ? "flex flex-row border border-gray rounded-md p-lg my-md items-center bg-[#F8FAFC]" : "flex flex-row border border-gray rounded-md p-lg my-md items-center"}>
                                    <Checkbox checked={item.purchased}></Checkbox>
                                    <div className="flex flex-col ml-md ">
                                        <strong className={item.purchased ? "mr-auto line-through text-muted-blue" : "mr-auto"}>{item.name}</strong>
                                        <div className={item.purchased ? "mr-auto line-through" : "mr-auto"}>{item.description}</div>
                                    </div>
                                    <div className="flex flex-row ml-auto" >
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
