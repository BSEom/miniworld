import React, { useState, useEffect } from "react";
import "./ItemList.css"
import axios from "axios";


const ItemList = ({ onItemClick, myItemList }) => {
    const [items, setItems] = useState({})

    useEffect (() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get('/api/minirooms/items'); 
                setItems(res.data);
                console.log(res.data)
                console.log("실행")
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
            }
        };

    fetchItems();
    }, []) 

    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
        rows.push(items.slice(i, i + 3));
    }

    const usedNames = new Set(myItemList.map(item => item.itemId));

    return (
        <div className="item_list_box">
            <table>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((item) => (
                                <td key={item.name} className={`item_cell ${usedNames.has(item.name) ? 'exists' : ''}`}>
                                    <img src={item.imagePath} alt={item.name} 
                                        onClick={() => {
                                            if (!usedNames.has(item.name)) {
                                                onItemClick(item);
                                            }
                                        }}/>   
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;