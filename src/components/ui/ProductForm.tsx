import React, { useState } from 'react';
import { useCreateProductsMutation } from '@/redux/api/features/products/productApi';

interface ProductFormProps {
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const [createProducts] = useCreateProductsMutation();
  const [formState, setFormState] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    rating: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formState.name,
      price: Number(formState.price),
      category: formState.category,
      stock: Number(formState.stock),
      ratings: Number(formState.rating),
      description: formState.description,
      // For simplicity, no image upload handling here.
    };
    try {
      await createProducts(productData).unwrap();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to create product', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white/10 backdrop-blur-lg rounded-xl">
      <input
        name="name"
        type="text"
        placeholder="Product Name"
        className="input w-full input-bordered"
        value={formState.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Product Price"
        className="input w-full input-bordered"
        value={formState.price}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        type="text"
        placeholder="Category"
        className="input w-full input-bordered"
        value={formState.category}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        className="input w-full input-bordered"
        value={formState.stock}
        onChange={handleChange}
        required
      />
      <input
        name="rating"
        type="number"
        placeholder="Rating"
        className="input w-full input-bordered"
        value={formState.rating}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        className="glass-input w-full input-bordered"
        value={formState.description}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn !bg-[var(--accent-primary-bg)] text-white w-full transform hover:scale-105">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
