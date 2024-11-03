"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-lg mb-4">
        These are the listed products you can find:
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-blue-200 border-0 rounded md:my-4 dark:bg-gray-700" />

      <h2 className="text-2xl text-center mb-6">Products</h2>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="mt-2">Price: Rs{product.price}</p>
            <p>Stock: {product.stock}</p>
            <p className="text-sm text-gray-500">
              Created at: {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md mx-auto">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
          min="0"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
          min="0"
        />
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded transition-colors"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
