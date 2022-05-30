import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Select, Checkbox } from 'antd';
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md';
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

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemQuantity, setItemQuantity] = useState("1");
    const [itemPurchased, setItemPurchased] = useState(false);

    const [idCount, setIdCount] = useState(0); //temporary 


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

        setSelected(item) //needs time to update?

        if (type === "edit") {//populate fields
            setItemName(item.name)
            setItemDescription(item.description)
            setItemQuantity(item.quantity)
            setItemPurchased(item.purchased)
        }

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        //null item state variables on success and failure of all funcitons
        setIsModalVisible(false);
        clearItem();
    };

    const addItem = () => {
        items.push({
            id: idCount,
            name: itemName,
            description: itemDescription,
            quantity: itemQuantity,
            purchased: itemPurchased
        })

        setIdCount(idCount + 1)


        //update state

        setIsModalVisible(false);
        clearItem();
    };

    const editItem = () => {

        if (itemName !== selected.name)
            selected.name = itemName
        if (itemDescription !== selected.description)
            selected.description = itemDescription
        if (itemQuantity !== selected.quantity)
            selected.quantity = itemQuantity
        if (itemPurchased !== selected.purchased)
            selected.purchased = itemPurchased

        //update state

        setIsModalVisible(false);
        clearItem();
    };

    const deleteItem = () => {
        console.log(selected)
        setItems(items.filter(el => el.id !== selected.id))
        setIsModalVisible(false);
        clearItem();
    };

    const clearItem = () => {
        setItemName("")
        setItemDescription("")
        setItemQuantity("")
        setItemPurchased(false)
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
                        <h1>Edit your item below</h1>
                        <Input placeholder="Item Name" value={itemName} onChange={updateName} />
                        <TextArea placeholder="Description" rows={4} maxLength={100} showCount="true" value={itemDescription} onChange={updateDescription} />
                        <Select placeholder="How many?" onChange={updateQuantity}>
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
                            <Input placeholder={itemName} onChange={updateName} />
                            <TextArea rows={4} maxLength={100} showCount="true" placeholder={itemDescription} onChange={updateDescription} />
                            <Select placeholder={itemQuantity} onChange={updateQuantity}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                            <Checkbox checked={itemPurchased} onChange={updatePurchased}>Purchased</Checkbox>
                        </div>
                    </Modal>

                    :

                    <Modal title="Delete Item?" visible={isModalVisible} destroyOnClose="true" closable="true"
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
                                <li key={item.id} className="flex flex-row border-2 border-black p-md my-md items-center">
                                    <Checkbox checked={item.purchased}></Checkbox>
                                    {item.purchased ?
                                        <div className="flex flex-col ml-md ">
                                            <strong className="mr-auto line-through text-muted-blue">{item.name}</strong>
                                            <div className="mr-auto line-through">{item.description}</div>
                                        </div>
                                        :
                                        <div className="flex flex-col ml-md ">
                                            <strong className="mr-auto ">{item.name}</strong>
                                            <div className="mr-auto">{item.description}</div>
                                        </div>
                                    }

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
