import React, { useState } from 'react';

const initialFormState = { id: null, name: '' };

function CRUDComponent() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = item => {
    item.id = items.length + 1;
    setItems([...items, item]);
    setCurrentItem(initialFormState);
  };

  const deleteItem = id => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = updatedItem => {
    setEditing(false);
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const editItem = item => {
    setEditing(true);
    setCurrentItem({ id: item.id, name: item.name });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">CRUD with Tailwind CSS</h2>
      
      {editing ? (
        <div>
          <h3 className="font-semibold mb-3">Edit Item</h3>
          <form
            onSubmit={event => {
              event.preventDefault();
              updateItem(currentItem);
            }}
          >
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={currentItem.name}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            <button onClick={() => setEditing(false)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold mb-3">Add Item</h3>
          <form
            onSubmit={event => {
              event.preventDefault();
              if (!currentItem.name) return;
              addItem(currentItem);
            }}
          >
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={currentItem.name}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
          </form>
        </div>
      )}

      <h3 className="font-semibold my-4">View Items</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">
                <button onClick={() => editItem(item)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CRUDComponent;
