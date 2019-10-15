export default [
  { label: "Item Name", name: "itemName", type: "text" },
  { label: "Storage Requirements", name: "storage", type: "select-multi", options: [{label: 'Refrigerator', value: 'Refrigerator'}, {label: 'Freezer', value: 'Freezer'}, {label: 'Pantry', value: 'Pantry'}, {label: 'Other', value: 'Other'}] },
  { label: "Category", name: "category", type: "select-multi", options: [{label: 'Produce',value: 'Produce'}, {label: 'Meat', value: 'Meat'}, {label: 'Dairy', value: 'Dairy'}, {label: 'Snacks', value: 'Snacks'}, {label: 'Seafood', value: 'Seafood'}, {label: 'Bread', value: 'Bread'}, {label: 'Spices', value: 'Spices'}, {label: 'Baking', value: 'Baking'}, {label:'Misc.', value: 'Misc.'}] }
];