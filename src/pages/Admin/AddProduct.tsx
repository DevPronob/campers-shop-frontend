import React from 'react';
import ProductForm from '@/components/ui/ProductForm';
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // After successful creation, go back to products listing
    navigate('/products');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Add New Product</h1>
      <ProductForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AddProduct;
